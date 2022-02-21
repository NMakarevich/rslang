/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import {
  getWord, createUserWord, updateUserWord, getUserWord, getUserStatistics, updateUserStatistics,
} from '../api';
import { ICards } from '../interfaces';
import { localStorageUtil } from './localStorageUtil';
import { chapterDifficult } from '../consts';
import { cards } from './textbook';

let isPlay = false;

class Card {
  data: ICards;

  wordCard: HTMLElement;

  userID: string;

  constructor(data: ICards) {
    this.data = data;
    this.wordCard = document.createElement('div');
    this.userID = localStorageUtil.getUserInfo().userId;
  }

  render(): HTMLElement {
    this.wordCard.classList.add('word-card');
    let hideDifficultBtn = '';
    let hideStudiedBtn = '';
    let difficultClass = '';
    let difficultButtonText = 'Добавить в сложные';
    let studiedClass = '';
    let studiedButtonText = 'Добавить в изученные';

    if (this.data.userWord?.difficulty === 'hard') {
      if (localStorageUtil.getChapter() === 6) {
        difficultClass = 'difficult';
        difficultButtonText = 'Удалить из сложных';
        hideStudiedBtn = 'hidden';
      } else {
        difficultClass = 'difficult restrict-events';
        difficultButtonText = 'Сложное слово';
        hideStudiedBtn = 'hidden';
      }
    }

    if (this.data.userWord?.difficulty === 'learned') {
      studiedClass = 'studied restrict-events';
      studiedButtonText = 'Изученное слово';
      hideDifficultBtn = 'hidden';
    }

    let answers = '';
    if (localStorageUtil.checkAuthorization()) {
      const array = this.data.userWord?.optional.answers.split('');
      if (this.data.userWord) {
        answers = `Ответы: правильные - ${array?.filter((x) => x === '1').length},
         неправильные - ${array?.filter((x) => x === '0').length}`;
      } else {
        answers = 'Ответы: правильные - 0, неправильные - 0';
      }
    }

    this.wordCard.innerHTML = `
    <div class="card-wrapper">
        <div class="word-wrapper">
            <button type="button" class="sound" id="${this.data.id}"></button>
            <span class="word">${this.data.word}</span>
            <span class="word-transcription">${this.data.transcription}</span>
            <span class="word-translate">${this.data.wordTranslate}</span>
        </div>
        <p class="word-title">Значение:</p>
        <p>${this.data.textMeaning}</p>
        <p>${this.data.textMeaningTranslate}</p>
        <p class="word-title">Пример:</p>
        <p>${this.data.textExample}</p>
        <p>${this.data.textExampleTranslate}</p>
        <div class="answers">${answers}</div>
        <div class="button-wrapper">
        <button type="button" class="add-to-difficult  ${difficultClass} ${hideDifficultBtn}" id="${this.data.id}">${difficultButtonText}</button>
        <button type="button" class="add-to-studied ${studiedClass} ${hideStudiedBtn}" id="${this.data.id}">${studiedButtonText}</button>
        </div>
    </div>
    <img class="word-image" src="https://rslang-team32.herokuapp.com/${this.data.image}" alt="">`;
    this.eventListeners();
    return this.wordCard;
  }

  get soundButton(): HTMLButtonElement {
    return this.wordCard.querySelector('.sound') as HTMLButtonElement;
  }

  get difficultButton(): HTMLButtonElement {
    return this.wordCard.querySelector('.add-to-difficult') as HTMLButtonElement;
  }

  get studiedButton(): HTMLButtonElement {
    return this.wordCard.querySelector('.add-to-studied') as HTMLButtonElement;
  }

  eventListeners() {
    this.soundButton.addEventListener('click', this.playAudio);
    this.difficultButton.addEventListener('click', () => {
      this.addToDifficult(this.difficultButton);
    });
    this.studiedButton.addEventListener('click', () => {
      this.addToStudied(this.studiedButton);
    });
  }

  addToDifficult = async (btn: HTMLButtonElement) => {
    const button = btn;
    if (localStorageUtil.checkAuthorization()) {
      const optionalData = await getUserWord(this.userID, `${this.data.id}`);
      if (!optionalData) {
        await createUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data.id}`,
          word: { difficulty: 'hard', optional: { answers: ' ' } },
        });
        button.classList.add('difficult');
        button.classList.add('restrict-events');
        button.nextElementSibling?.classList.add('hidden');
        button.innerText = 'Сложное слово';
        await cards.checkPageIsLearned();
      }
      if (optionalData) {
        if (localStorageUtil.getChapter() === chapterDifficult) {
          this.wordCard.classList.add('hidden');
          await updateUserWord({
            userId: `${this.userID}`,
            wordId: `${this.data.id}`,
            word: { difficulty: 'inProgress', optional: optionalData.optional },
          });
          await cards.checkPageIsLearned();
        } else {
          await updateUserWord({
            userId: `${this.userID}`,
            wordId: `${this.data.id}`,
            word: { difficulty: 'hard', optional: optionalData.optional },
          });
          button.classList.add('difficult');
          button.classList.add('restrict-events');
          button.nextElementSibling?.classList.add('hidden');
          button.innerText = 'Сложное слово';
          await cards.checkPageIsLearned();
        }
      }
    } else {
      this.showModalWindow();
    }
  };

  addToStudied = async (btn: HTMLButtonElement) => {
    const button = btn;
    if (localStorageUtil.checkAuthorization()) {
      const optionalData = await getUserWord(this.userID, `${this.data.id}`);
      if (!optionalData) {
        await createUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data.id}`,
          word: { difficulty: 'learned', optional: { answers: ' ' } },
        });
        await cards.checkPageIsLearned();
      } else {
        await updateUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data.id}`,
          word: { difficulty: 'learned', optional: optionalData.optional },
        });
        await cards.checkPageIsLearned();
      }
      const statistics = await getUserStatistics();
      if (statistics != null) {
        delete statistics.id;
        statistics.learnedWords += 1;
        console.log(statistics);
        await updateUserStatistics(statistics);
      }
      button.classList.add('studied');
      button.classList.add('restrict-events');
      button.previousElementSibling?.classList.add('hidden');
      button.innerText = 'Изученное слово';
      await cards.checkPageIsLearned();
    } else {
      this.showModalWindow();
    }
  };

  playAudio = async () => {
    await getWord(`${this.soundButton.id}`).then((data) => {
      const audio = new Audio();
      const playlist = [
        `https://rslang-team32.herokuapp.com/${data.audio}`,
        `https://rslang-team32.herokuapp.com/${data.audioMeaning}`,
        `https://rslang-team32.herokuapp.com/${data.audioExample}`,
      ];
      let current = 0;
      audio.src = `${playlist[0]}`;
      if (isPlay === false) {
        audio.play();
        isPlay = true;
        this.soundButton.classList.add('active');
      } else {
        return;
      }

      audio.onended = () => {
        current += 1;
        if (current >= playlist.length) {
          current = 0;
          audio.pause();
          this.soundButton.classList.remove('active');
          isPlay = false;
        } else {
          audio.src = `${playlist[current]}`;
          audio.play();
        }
      };
    });
  };

  showModalWindow() {
    const div = document.createElement('div');
    div.innerText = 'Это действие доступно только после регистрации';
    div.className = 'modal-window';
    document.body.appendChild(div);
    setTimeout(() => {
      document.body.removeChild(div);
    }, 2000);
  }
}

export default Card;
