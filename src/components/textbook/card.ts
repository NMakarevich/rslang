/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { getWord, createUserWord, deleteUserWord } from '../api-requests';
import { authorization, ICards } from './consts';
import { localStorageUtil } from './localStorageUtil';
import { cards } from './textbook';

let isPlay = false;

class Card {
  data: ICards;

  wordCard: HTMLElement;

  constructor(data: ICards) {
    this.data = data;
    this.wordCard = document.createElement('div');
  }

  render(): HTMLElement {
    this.wordCard.classList.add('word-card');
    let ident = this.data.id;
    if (authorization.authorized) {
      ident = this.data._id;
    }
    let difficultClass = '';
    let buttonLabel = 'Добавить в сложные';
    if (this.data.userWord !== undefined) {
      difficultClass = 'difficult';
      buttonLabel = 'Удалить из сложных';
    }
    this.wordCard.innerHTML = `
    <div class="card-wrapper">
        <div class="word-wrapper">
            <button type="button" class="sound" id="${ident}"></button>
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
        <button type="button" class="add-to-difficult ${difficultClass}" id="${ident}">${buttonLabel}</button>
        <button type="button" class="add-to-studied" id="${ident}">Добавить в изученные</button>
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
    this.studiedButton.addEventListener('click', this.addToStudied);
  }

  addToDifficult = (button: HTMLButtonElement) => {
    const id = localStorageUtil.getUserInfo().userId;
    if (authorization.authorized) {
      const btn = button;
      if (!btn.classList.contains('difficult')) {
        btn.classList.add('difficult');
        btn.innerText = 'Добавлено в сложные';
        createUserWord({
          userId: `${id}`,
          wordId: `${this.data._id}`,
          word: { difficulty: 'hard', optional: { testFieldString: 'test', testFieldBoolean: true } },
        });
      } else {
        btn.classList.remove('difficult');
        btn.innerText = 'Добавить в сложные';
        deleteUserWord({
          userId: `${id}`,
          wordId: `${this.data._id}`,
        });
        cards.render('difficult');
      }
    } else {
      this.showModalWindow();
    }
  };

  addToStudied = () => {
    if (authorization.authorized) {
      /// console.log('Добавить в изученные');
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
