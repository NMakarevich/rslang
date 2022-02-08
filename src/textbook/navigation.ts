import { textbookHeader, pagesAmount } from './consts';
import { cards } from './textbook';

class TextbookNavigation {
  render() {
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
                  <div class="game-btns">
                      <button id="coolbutton">Игра "Аудиовызов"</button>
                      <button>Игра "Спринт"</button>
                  </div>`;
    if (!textbookHeader) return;
    textbookHeader.innerHTML = html;
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
}

const textbookNavigation = new TextbookNavigation();
textbookNavigation.render();

const selectPage = document.getElementById('select-page') as HTMLSelectElement;
selectPage.addEventListener('change', () => {
  cards.page = +selectPage.value - 1;
  cards.render();
});

const selectChapter = document.getElementById('select-chapter') as HTMLSelectElement;
selectChapter.addEventListener('change', () => {
  if (+selectChapter.value === 7) {
    console.log('Difficult words');
  }
  cards.group = +selectChapter.value - 1;
  cards.page = 0;
  selectPage.value = '1';
  cards.render();
});

const backBTN = document.getElementById('back-btn') as HTMLElement;
backBTN.addEventListener('click', () => {
  if (+selectPage.value > 1) {
    selectPage.value = `${+selectPage.value - 1}`;
    cards.page -= 1;
    cards.render();
  }
});

const nextBTN = document.getElementById('next-btn') as HTMLElement;
nextBTN.addEventListener('click', () => {
  if (+selectPage.value < 30) {
    selectPage.value = `${+selectPage.value + 1}`;
    cards.page += 1;
    cards.render();
  }
});
