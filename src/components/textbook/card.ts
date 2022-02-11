/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { getWord, createUserWord, deleteUserWord } from '../api-requests';
import { authorization, ICards } from './consts';
import { localStorageUtil } from './localStorageUtil';
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
    let identificator = this.data.id;
    if (authorization.authorized) {
      identificator = this.data._id;
    }

    let difficultClass = '';
    let difficultButtonText = 'Добавить в сложные';
    let studiedClass = '';
    let studiedButtonText = 'Добавить в изученные';

    if (this.data.userWord?.difficulty === 'hard') {
      difficultClass = 'difficult';
      difficultButtonText = 'Добавлено в сложные';
    }

    if (this.data.userWord?.difficulty === 'easy') {
      studiedClass = 'studied';
      studiedButtonText = 'Добавлено в изученные';
    }

    this.wordCard.innerHTML = `
    <div class="card-wrapper">
        <div class="word-wrapper">
            <button type="button" class="sound" id="${identificator}"></button>
            <span class="word">${this.data.word}</span>
            <span class="word-transcription">${this.data.transcription}</span>
            <span class="word-translate">${this.data.wordTranslate}</span>
        </div>
        <h2 class="word-title">Значение:</h2>
        <p>${this.data.textMeaning}</p>
        <p>${this.data.textMeaningTranslate}</p>
        <p class="word-title">Пример:</p>
        <p>${this.data.textExample}</p>
        <p>${this.data.textExampleTranslate}</p>
        <div class="button-wrapper">
        <button type="button" class="add-to-difficult ${difficultClass}" id="${identificator}">${difficultButtonText}</button>
        <button type="button" class="add-to-studied ${studiedClass}" id="${identificator}">${studiedButtonText}</button>
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

  addToDifficult = async (button: HTMLButtonElement) => {
    if (authorization.authorized) {
      const btn = button;
      if (!btn.classList.contains('difficult')) {
        btn.classList.add('difficult');
        btn.innerText = 'Добавлено в сложные';
        createUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data._id}`,
          word: { difficulty: 'hard', optional: {} },
        });
      } else {
        btn.classList.remove('difficult');
        btn.innerText = 'Добавить в сложные';
        await deleteUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data._id}`,
        });
        if (localStorageUtil.getChapter() === 6) {
          cards.render('difficult');
        }
      }
    } else {
      this.showModalWindow();
    }
  };

  addToStudied = (button: HTMLButtonElement) => {
    if (authorization.authorized) {
      const btn = button;
      if (!btn.classList.contains('studied')) {
        btn.classList.add('studied');
        btn.innerText = 'Добавлено в изученные';
        createUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data._id}`,
          word: { difficulty: 'easy', optional: {} },
        });
      } else {
        btn.classList.remove('studied');
        btn.innerText = 'Добавить в изученные';
        deleteUserWord({
          userId: `${this.userID}`,
          wordId: `${this.data._id}`,
        });
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
}

export default Card;