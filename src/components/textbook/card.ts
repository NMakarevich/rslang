/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import {
  getWord, createUserWord, deleteUserWord, updateUserWord, getUserWord,
} from '../api';
import { ICards } from '../interfaces';
import { localStorageUtil } from './localStorageUtil';
import { cards } from './textbook';
import { chapterDifficult } from '../consts';

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
    this.checkScrollPosition();
    this.wordCard.classList.add('word-card');

    let typeOfWord = '';
    let typeOfWordСolor = '';
    let difficultClass = '';
    let difficultButtonText = 'Добавить в сложные';
    let studiedClass = '';
    let studiedButtonText = 'Добавить в изученные';

    if (this.data.userWord?.difficulty === 'hard') {
      difficultClass = 'difficult';
      difficultButtonText = 'Удалить из сложных';
      typeOfWord = 'Сложное слово';
      typeOfWordСolor = '#6c7afc';
    }

    if (this.data.userWord?.difficulty === 'easy') {
      studiedClass = 'studied';
      studiedButtonText = 'Удалить из изученных';
      typeOfWord = 'Изученное слово';
      typeOfWordСolor = '#d373f3';
    }

    let identificator = this.data.id;
    let options = '';
    if (localStorageUtil.checkAuthorization()) {
      identificator = this.data._id;
      if (this.data.userWord) {
        // исправить когда определимся, каким способом записываем в базу ответы пользователя
        options = `Ответы: правильные - ${this.data.userWord.optional.answers.split('').filter((x: string) => x === '1').length}, неправильные - ${this.data.userWord.optional.answers.split('').filter((x: string) => x === '0').length}`;
      } else {
        options = 'Ответы: правильные - 0, неправильные - 0';
      }
    }

    this.wordCard.innerHTML = `
    <div class="card-wrapper">
       <div style="color: ${typeOfWordСolor}" class=${typeOfWordСolor}>${typeOfWord}</div>
        <div class="word-wrapper">
            <button type="button" class="sound" id="${identificator}"></button>
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
        <div class="button-wrapper">
        <button type="button" class="add-to-difficult ${difficultClass}" id="${identificator}">${difficultButtonText}</button>
        <button type="button" class="add-to-studied ${studiedClass}" id="${identificator}">${studiedButtonText}</button>
        </div>
        ${options}
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
      localStorage.setItem('scroll', `${window.pageYOffset}`);
    });
    this.studiedButton.addEventListener('click', () => {
      localStorage.setItem('scroll', `${window.pageYOffset}`);
      this.addToStudied(this.studiedButton);
    });
  }

  addToDifficult = async (button: HTMLButtonElement) => {
    if (localStorageUtil.checkAuthorization()) {
      const btn = button;
      if (!btn.classList.contains('difficult')) {
        if (btn.nextElementSibling?.classList.contains('studied')) {
          const optionalData = await getUserWord(this.userID, `${this.data._id}`);
          await updateUserWord({
            userId: `${this.userID}`,
            wordId: `${this.data._id}`,
            word: { difficulty: 'hard', optional: optionalData },
          });
        } else {
          await createUserWord({
            userId: `${this.userID}`,
            wordId: `${this.data._id}`,
            word: { difficulty: 'hard', optional: { answers: ' ' } },
          });
        }
        btn.classList.add('difficult');
        btn.innerText = 'Удалить из сложных';
        await this.updatePage();
      } else {
        btn.classList.remove('difficult');
        btn.innerText = 'Добавить в сложные';
        await deleteUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data._id}`,
        });
        await this.updatePage();
      }
    } else {
      this.showModalWindow();
    }
  };

  addToStudied = async (button: HTMLButtonElement) => {
    if (localStorageUtil.checkAuthorization()) {
      const btn = button;
      if (!btn.classList.contains('studied')) {
        if (btn.previousElementSibling?.classList.contains('difficult')) {
          const optionalData = await getUserWord(this.userID, `${this.data._id}`);
          await updateUserWord({
            userId: `${this.userID}`,
            wordId: `${this.data._id}`,
            word: { difficulty: 'easy', optional: optionalData },
          });
        } else {
          await createUserWord({
            userId: `${this.userID}`,
            wordId: `${this.data._id}`,
            word: { difficulty: 'easy', optional: { answers: ' ' } },
          });
        }
        btn.classList.add('studied');
        btn.innerText = 'Удалить из изученных';
        await this.updatePage();
      } else {
        btn.classList.remove('studied');
        btn.innerText = 'Добавить в изученные';
        await deleteUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data._id}`,
        });
        await this.updatePage();
      }
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

  updatePage() {
    if (localStorageUtil.getChapter() === chapterDifficult) {
      cards.render('difficult');
    } else {
      cards.render('usual');
    }
  }

  checkScrollPosition() {
    const scrollPosition = localStorage.getItem('scroll');
    if (scrollPosition) {
      window.scrollTo(0, +scrollPosition);
    }
  }
}

export default Card;
