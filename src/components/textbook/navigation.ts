/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { pagesAmount, chapterDifficult } from '../consts';
import { cards } from './textbook';
import { localStorageUtil } from './localStorageUtil';
import { getWords } from '../api';
import { ICards } from '../interfaces';

class TextbookNavigation {
  render = async () => {
    const html = `<div class="textbook-header">
                    <div class="controls">
                      <select id="select-chapter">
                        <option value="1">Раздел 1</option>
                        <option value="2">Раздел 2</option>
                        <option value="3">Раздел 3</option>
                        <option value="4">Раздел 4</option>
                        <option value="5">Раздел 5</option>
                        <option value="6">Раздел 6</option>
                        ${this.checkIsAuthorised()}
                      </select>
                      <div class="navigation ${this.isHidden()}">
                        <button id="back-btn"></button>
                        ${await this.renderSelectPage()}
                        <button id="next-btn"></button>
                      </div>
                    </div>
                  </div>
                  <div class="game">
                      <a class="game__link" href="#games/audio">Игра "Аудиовызов"</a>
                      <a class="game__link" href="#games/sprint">Игра "Спринт"</a>
                  </div>`;
    const textbookHeader = document.getElementById('textbook-header');
    if (!textbookHeader) return;
    textbookHeader.innerHTML = html;
    this.eventListeners();
  };

  renderSelectPage = async () => {
    const options = await this.checkPageIsLearned();
    return `<select id="select-page">
              ${options}
            </select>`;
  };

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

  get chapterNavigation(): HTMLElement {
    return document.querySelector('.navigation') as HTMLElement;
  }

  get pageNotification(): HTMLElement {
    return document.querySelector('#page-notification') as HTMLElement;
  }

  get gameButtons(): HTMLElement {
    return document.querySelector('.game') as HTMLElement;
  }

  get textbook(): HTMLElement {
    return document.querySelector('.textbook') as HTMLElement;
  }

  eventListeners() {
    this.selectChapter.addEventListener('change', async () => {
      if (+this.selectChapter.value - 1 === chapterDifficult && localStorageUtil.checkAuthorization()) {
        this.chapterNavigation.classList.add('hidden');
        cards.render('difficult');
      } else if (this.chapterNavigation.classList.contains('hidden')) {
        this.chapterNavigation.classList.remove('hidden');
      }
      cards.group = +this.selectChapter.value - 1;
      cards.page = 0;
      this.selectPage.value = '1';

      cards.render('usual');
      localStorageUtil.putChapter(`${cards.group}`);
      localStorageUtil.putPage('0');
      this.checkPage();
      this.selectPage.innerHTML = await this.checkPageIsLearned();
    });

    this.selectPage.addEventListener('change', () => {
      cards.page = +this.selectPage.value - 1;
      cards.render('usual');
      localStorageUtil.putPage(`${cards.page}`);
      this.checkPage();
    });

    this.backBTN.addEventListener('click', () => {
      if (+this.selectPage.value > 1) {
        this.selectPage.value = `${+this.selectPage.value - 1}`;
        cards.page -= 1;
        cards.render('usual');
        localStorageUtil.putPage(`${cards.page}`);
        this.checkPage();
      }
    });

    this.nextBTN.addEventListener('click', () => {
      if (+this.selectPage.value < pagesAmount) {
        this.selectPage.value = `${+this.selectPage.value + 1}`;
        cards.page += 1;
        cards.render('usual');
        localStorageUtil.putPage(`${cards.page}`);
        this.checkPage();
      }
    });
  }

  checkPage = async () => {
    const data = await getWords(cards.page, cards.group);
    const hard = data.filter((x: ICards) => x.userWord?.difficulty === 'hard');
    const learned = data.filter((x: ICards) => x.userWord?.difficulty === 'learned');
    const total = hard.length + learned.length;
    if (total === 20) {
      if (this.pageNotification?.classList.contains('hidden')) {
        this.pageNotification?.classList.remove('hidden');
      }
      if (!this.selectPage?.classList.contains('learned')) {
        this.selectPage?.classList.add('learned');
      }
      if (!this.gameButtons?.classList.contains('inactive')) {
        this.gameButtons?.classList.add('inactive');
      }
      if (!this.textbook?.classList.contains('learned')) {
        this.textbook?.classList.add('learned');
      }
    } else {
      if (!this.pageNotification?.classList.contains('hidden')) {
        this.pageNotification?.classList.add('hidden');
      }
      if (this.selectPage?.classList.contains('learned')) {
        this.selectPage?.classList.remove('learned');
      }
      if (this.gameButtons?.classList.contains('inactive')) {
        this.gameButtons?.classList.remove('inactive');
      }
      if (this.textbook?.classList.contains('learned')) {
        this.textbook?.classList.remove('learned');
      }
    }
  };

  checkIsAuthorised() {
    if (localStorageUtil.checkAuthorization()) {
      return '<option value="7">Сложные слова</option>';
    }
    return '';
  }

  isHidden() {
    if (localStorageUtil.getChapter() === 6) {
      return 'hidden';
    }
    return '';
  }

  async checkPageIsLearned() {
    const array = [];
    let optionList = '';
    for (let i = 0; i < 30; i += 1) {
      array.push(getWords(i, cards.group));
    }
    return Promise.all(array)
      .then((values) => {
        values.forEach((el, i) => {
          const learned = el.filter((x) => x.userWord?.difficulty === 'learned');
          const hard = el.filter((x) => x.userWord?.difficulty === 'hard');
          if (learned.length + hard.length === 20) {
            optionList += `<option class="learned-page" value="${i + 1}">стр. ${i + 1}</option>`;
          } else optionList += `<option value="${i + 1}">стр. ${i + 1}</option>`;
        });
      })
      .then(() => optionList);
  }
}

const textbookNavigation = new TextbookNavigation();
setTimeout(textbookNavigation.checkPage, 500);
export default textbookNavigation;
