/* eslint-disable class-methods-use-this */
import { pagesAmount, authorization } from '../consts';
import { cards } from './textbook';
import { localStorageUtil } from './localStorageUtil';

class TextbookNavigation {
  render(): void {
    const html = `<div class="textbook-header">
                    <div class="controls">
                      <select id="select-chapter">
                        <option value="1"selected>Раздел 1</option>
                        <option value="2">Раздел 2</option>
                        <option value="3">Раздел 3</option>
                        <option value="4">Раздел 4</option>
                        <option value="5">Раздел 5</option>
                        <option value="6">Раздел 6</option>
                        <option value="7">Сложные слова</option>
                      </select>
                      <div class="navigation">
                        <button id="back-btn">Назад</button>
                        ${this.renderSelectPage()}
                        <button id="next-btn">Вперед</button>
                      </div>
                    </div>
                  </div>
                  <div class="game">
                      <a class="game__link" href="#/games/audio">Игра "Аудиовызов"</a>
                      <a class="game__link" href="#/games/sprint">Игра "Спринт"</a>
                  </div>`;
    const textbookHeader = document.getElementById('textbook-header');
    if (!textbookHeader) return;
    textbookHeader.innerHTML = html;
    this.eventListeners();
  }

  renderSelectPage(): string {
    let optionList = '';
    for (let i = 1; i <= pagesAmount; i += 1) {
      optionList += `<option value="${i}">стр. ${i}</option>`;
    }
    return `<select id="select-page">
              ${optionList}
            </select>`;
  }

  get selectPage(): HTMLSelectElement {
    return document.querySelector('#select-page') as HTMLSelectElement;
  }

  get selectChapter(): HTMLSelectElement {
    return document.querySelector('#select-chapter') as HTMLSelectElement;
  }

  get backBTN(): HTMLButtonElement {
    return document.querySelector('#back-btn') as HTMLButtonElement;
  }

  get nextBTN(): HTMLButtonElement {
    return document.querySelector('#next-btn') as HTMLButtonElement;
  }

  eventListeners() {
    this.selectPage.addEventListener('change', () => {
      cards.page = +this.selectPage.value - 1;
      cards.render('usual');
      localStorageUtil.putPage(`${cards.page}`);
    });

    this.selectChapter.addEventListener('change', () => {
      if (+this.selectChapter.value === 7 && authorization.authorized) {
        cards.render('difficult');
      }
      cards.group = +this.selectChapter.value - 1;
      cards.page = 0;
      this.selectPage.value = '1';
      cards.render('usual');
      localStorageUtil.putChapter(`${cards.group}`);
      localStorageUtil.putPage('0');
    });

    this.backBTN.addEventListener('click', () => {
      if (+this.selectPage.value > 1) {
        this.selectPage.value = `${+this.selectPage.value - 1}`;
        cards.page -= 1;
        cards.render('usual');
        localStorageUtil.putPage(`${cards.page}`);
      }
    });

    this.nextBTN.addEventListener('click', () => {
      if (+this.selectPage.value < pagesAmount) {
        this.selectPage.value = `${+this.selectPage.value + 1}`;
        cards.page += 1;
        cards.render('usual');
        localStorageUtil.putPage(`${cards.page}`);
      }
    });
  }
}

const textbookNavigation = new TextbookNavigation();
export default textbookNavigation;
