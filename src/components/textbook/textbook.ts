/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-loop-func */

import '../../sass/textbook.scss';
import { ICards } from '../interfaces';
import { getWords, getUserHardWords } from '../api';
import { localStorageUtil } from './localStorageUtil';
import Card from './card';
import { chapterDifficult } from '../consts';
import textbookNavigation from './navigation';

export class Cards {
  page: number;

  group: number;

  constructor() {
    this.page = localStorageUtil.getPage();
    this.group = localStorageUtil.getChapter();
  }

  render = async (param: string): Promise<void> => {
    let fn;
    if (param === 'usual') {
      fn = getWords(this.page, this.group);
    } else {
      fn = getUserHardWords();
    }

    const textbookWrapper = document.getElementById('textbook-wrapper') as HTMLElement;
    if (!textbookWrapper) return;
    textbookWrapper.innerHTML = '<div class="words-list"></div>';
    await fn
      .then((data: ICards[]) => {
        textbookNavigation.checkPage();
        data.forEach((card: ICards) => {
          (textbookWrapper.firstElementChild as HTMLUListElement).append(new Card(card).render());
        });
      })
      .then(() => {
        const selectPage = document.getElementById('select-page') as HTMLSelectElement;
        const selectChapter = document.getElementById('select-chapter') as HTMLSelectElement;
        selectPage.value = `${this.page + 1}`;
        selectChapter.value = `${this.group + 1}`;
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

export const cards = new Cards();

if (localStorageUtil.getChapter() === chapterDifficult && localStorageUtil.checkAuthorization()) {
  cards.render('difficult');
} else {
  cards.render('usual');
}
/// /////////////////////////////////////////////
export async function checkPageIsLearned() {
  const array = [];
  let optionList = '';
  for (let i = 0; i < 30; i += 1) {
    array.push(getWords(i, cards.group));
  }
  return Promise.all(array).then((values) => {
    values.forEach((el, i) => {
      const learned = el.filter((x) => x.userWord?.difficulty === 'learned');
      const hard = el.filter((x) => x.userWord?.difficulty === 'hard');
      if (learned.length + hard.length === 20) {
        optionList += `<option class="learned-page" value="${i + 1}">стр. ${i + 1}</option>`;
      }
      optionList += `<option value="${i + 1}">стр. ${i + 1}</option>`;
    });
  }).then(() => optionList);
}
