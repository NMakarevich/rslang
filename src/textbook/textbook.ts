/* eslint-disable no-loop-func */
/* eslint-disable class-methods-use-this */
import './textbook.scss';
import { textbookWrapper, ICards } from './consts';
import { getWords, getWord } from './api-requests';

let authorized = false;
let isPlay = false;

export class Cards {
  page: number;

  group: number;

  constructor() {
    this.page = 0;
    this.group = 0;
  }

  render() {
    let html = '';
    let data: ICards[];
    (async () => {
      data = (await getWords(this.page, this.group));
    })().then(() => {
      data.forEach((card: ICards) => {
        html += `<li class="word-card">
                  <div class="card-wrapper">
                      <div class="word-wrapper">
                          <button type="button" class="sound" id="${card.id}"></button>
                          <span class="word">${card.word}</span>
                          <span class="word-transcription">${card.transcription}</span>
                          <span class="word-translate">${card.wordTranslate}</span>
                      </div>
                      <h2 class="word-title">Значение:</h2>
                      <p>${card.textMeaning}</p>
                      <p>${card.textMeaningTranslate}</p>
                      <p class="word-title">Пример:</p>
                      <p>${card.textExample}</p>
                      <p>${card.textExampleTranslate}</p>
                      ${this.checkAuthorization()}
                  </div>
                  <img class="word-image" src="https://rslang-team32.herokuapp.com/${card.image}" alt="">
                </li>`;
      });
    })
      .then(() => {
        if (!textbookWrapper) return;
        textbookWrapper.innerHTML = `<ul class = "words-list">${html}</ul>`;
        this.play();
      });
  }

  checkAuthorization() {
    if (authorized) {
      return `<button type="button">Добавить в сложные</button>
              <button type="button">Удалить слово</button>`;
    }
    return '';
  }

  play() {
    const btns = document.querySelectorAll('.sound');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i]?.addEventListener('click', () => {
        let data: ICards;
        (async () => {
          data = await getWord(btns[i]?.id);
        })().then(() => {
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
            btns[i]?.classList.add('active');
          } else {
            return;
          }

          audio.onended = () => {
            current += 1;
            if (current >= playlist.length) {
              current = 0;
              audio.pause();
              btns[i]?.classList.remove('active');
              isPlay = false;
            } else {
              audio.src = `${playlist[current]}`;
              audio.play();
            }
          };
        });
      });
    }
  }
}

export const cards = new Cards();
cards.render();
