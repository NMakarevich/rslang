/* eslint-disable class-methods-use-this */
/* eslint-disable no-loop-func */

import '../../sass/textbook.scss';
import { ICards } from './consts';
import { getWords } from '../api-requests';
import { localStorageUtil } from './localStorageUtil';
import Card from './card';

/* const textbook = document.createElement('div');
textbook.className = 'textbook';
textbook.innerHTML = `<div id="textbook-header"></div>
                 <div id="textbook-wrapper"></div>
                 <div id="upButton" hidden></div>`;
document.body.appendChild(textbook); */

export class Cards {
  page: number;

  group: number;

  constructor() {
    this.page = localStorageUtil.getPage();
    this.group = localStorageUtil.getChapter();
  }

  render = async (): Promise<void> => {
    const textbookWrapper = document.getElementById('textbook-wrapper') as HTMLElement;
    if (!textbookWrapper) return;
    textbookWrapper.innerHTML = '<div class="words-list"></div>';
    await getWords(this.page, this.group)
      .then((data) => {
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
}

export const cards = new Cards();
// cards.render();
