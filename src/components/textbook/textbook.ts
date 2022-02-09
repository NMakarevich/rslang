/* eslint-disable no-loop-func */
/* eslint-disable class-methods-use-this */
import '../../sass/textbook.scss';
import { ICards, authorization } from './consts';
import { getWords, getWord } from '../api-requests';
import { localStorageUtil } from './localStorageUtil';

const textbook = document.createElement('div');
textbook.className = 'textbook';
textbook.innerHTML = `<div id="textbook-header"></div>
                 <div id="textbook-wrapper"></div>`;
// document.body.appendChild(textbook);

let isPlay = false;

export class Cards {
  page: number;

  group: number;

  constructor() {
    this.page = localStorageUtil.getPage();
    this.group = localStorageUtil.getChapter();
  }

  render(): void {
    let html = '';
    let data: ICards[];
    (async () => {
      data = await getWords(this.page, this.group);
    })()
      .then(() => {
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
                      <button type="button" class = "add-to-difficult" id="${card.id}">Добавить в сложные</button>
                      <button type="button" class = "add-to-studied" id="${card.id}">Добавить в изученные</button>
                  </div>
                  <img class="word-image" src="https://rslang-team32.herokuapp.com/${card.image}" alt="">
                </li>`;
        });
      })
      .then(() => {
        const textbookWrapper = document.getElementById('textbook-wrapper');
        if (!textbookWrapper) return;
        textbookWrapper.innerHTML = `<ul class = "words-list">${html}</ul>`;
        this.playAudio();
        this.addToDifficult();
        this.addToStudied();
        const selectPage = document.getElementById('select-page') as HTMLSelectElement;
        const selectChapter = document.getElementById('select-chapter') as HTMLSelectElement;
        selectPage.value = `${this.page + 1}`;
        selectChapter.value = `${this.group + 1}`;
      });
  }

  addToDifficult() {
    const addbtns = document.querySelectorAll('.add-to-difficult');
    addbtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (authorization.authorized) {
          // console.log('Добавить в сложные');
        } else {
          this.showModalWindow();
        }
      });
    });
  }

  addToStudied() {
    const deletebtns = document.querySelectorAll('.add-to-studied');
    deletebtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (authorization.authorized) {
          /// console.log('Добавить в изученные');
        } else {
          this.showModalWindow();
        }
      });
    });
  }

  playAudio() {
    const btns = document.querySelectorAll('.sound');
    for (let i = 0; i < btns.length; i += 1) {
      btns[i]?.addEventListener('click', () => {
        let data: ICards;
        (async () => {
          data = await getWord(`${btns[i]?.id}`);
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

export const cards = new Cards();
// cards.render();
