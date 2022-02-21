/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-loop-func */

import '../../sass/textbook.scss';
import { ICards } from '../interfaces';
import { getWords, getUserHardWords } from '../api';
import { localStorageUtil } from './localStorageUtil';
import Card from './card';
import { chapterDifficult, wordsPerPage } from '../consts';

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
        data.forEach((card: ICards) => {
          (textbookWrapper.firstElementChild as HTMLUListElement).append(new Card(card).render());
        });
        this.checkPageIsLearned();
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

  /// /доделать!!! Добавить фильтр в getWords
  checkPageIsLearned = async () => {
    const data = await getWords(this.page, this.group);
    const hard = data.filter((x: ICards) => x.userWord?.difficulty === 'hard');
    const learned = data.filter((x: ICards) => x.userWord?.difficulty === 'learned');
    if (hard.length + learned.length === wordsPerPage) {
      if (document.getElementById('page-notification')?.classList.contains('hidden')) {
        document.getElementById('page-notification')?.classList.remove('hidden');
      }
      if (!document.getElementById('select-page')?.classList.contains('learned')) {
        document.getElementById('select-page')?.classList.add('learned');
      }
      if (!document.querySelector('.game')?.classList.contains('inactive')) {
        document.querySelector('.game')?.classList.add('inactive');
      }
      console.log('Изучена полностью');
    } else {
      if (!document.getElementById('page-notification')?.classList.contains('hidden')) {
        document.getElementById('page-notification')?.classList.add('hidden');
      }
      if (document.getElementById('select-page')?.classList.contains('learned')) {
        document.getElementById('select-page')?.classList.remove('learned');
      }
      if (document.querySelector('.game')?.classList.contains('inactive')) {
        document.querySelector('.game')?.classList.remove('inactive');
      }
      console.log('Не изучена');
    }
  };
}

export const cards = new Cards();

if (localStorageUtil.getChapter() === chapterDifficult && localStorageUtil.checkAuthorization()) {
  cards.render('difficult');
} else {
  cards.render('usual');
}
