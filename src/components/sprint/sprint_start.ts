// import { getUserStudiedWords } from '../api-requests';
import { pageWords } from './function';
import SprintGame from './sprint_game';
import { localStorageUtil } from '../textbook/localStorageUtil';
import { getWords } from '../api';
import main from '../main';

class SprintStart {
  draw() {
    let arr;
    const CAT_QUANTITY = 6;
    const isFromDictionary = main.pages[0] === 'dictionary';
    const sprintContainer = document.createElement('div');
    sprintContainer.classList.add('sprint__container');
    const sprintStart = document.createElement('div');
    sprintStart.classList.add('sprint__start');
    const sptintStartContainer = document.createElement('div');
    sptintStartContainer.classList.add('sptint__start__container');
    const sprintStartTitle = document.createElement('div');
    sprintStartTitle.classList.add('sprint__start__title');
    sprintStartTitle.innerHTML = 'Спринт';
    const sprintStartDescription = document.createElement('p');
    sprintStartDescription.classList.add('sprint__start__description');
    sprintStartDescription.innerHTML = 'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову';
    const sprintCat = document.createElement('select');
    sprintCat.classList.add('sprint__cat');
    sprintCat.name = 'sprint__cat';
    sprintCat.id = 'sprint__cat';
    for (let i = 0; i <= CAT_QUANTITY - 1; i += 1) {
      const option = document.createElement('option');
      option.classList.add('sprint__cat__option');
      option.value = `${i + 1}`;
      option.innerHTML = `Уровень ${i + 1}`;
      sprintCat.appendChild(option);
    }
    sprintCat.onchange = () => {
      const cat = String(Number(sprintCat.value) - 1);
      localStorageUtil.putChapter(cat);
      pageWords.group = localStorageUtil.getChapter();
      localStorageUtil.putPage('0');
      pageWords.page = localStorageUtil.getPage();
      arr = getWords(pageWords.page, pageWords.group);
    };
    if (isFromDictionary) {
      sprintCat.style.display = 'none';
    } else {
      localStorageUtil.putChapter('0');
      pageWords.group = localStorageUtil.getChapter();
      localStorageUtil.putPage('0');
      pageWords.page = localStorageUtil.getPage();
    }
    const sprintStartBtn = document.createElement('button');
    sprintStartBtn.classList.add('sprint__start__btn');
    sprintStartBtn.innerHTML = 'Начать';
    sprintStartBtn.onclick = async () => {
      pageWords.group = localStorageUtil.getChapter();
      pageWords.page = localStorageUtil.getPage();
      if (localStorageUtil.checkAuthorization()) {
        arr = getWords(pageWords.page, pageWords.group);
        sprintContainer.replaceWith(new SprintGame().draw(await arr));
      } else {
        pageWords.group = Number(sprintCat.value) - 1;
        arr = getWords(pageWords.page, pageWords.group);
        sprintContainer.replaceWith(new SprintGame().draw(await arr));
      }
    };
    sptintStartContainer.appendChild(sprintStartTitle);
    sptintStartContainer.appendChild(sprintStartDescription);
    sptintStartContainer.appendChild(sprintCat);
    sptintStartContainer.appendChild(sprintStartBtn);
    sprintStart.appendChild(sptintStartContainer);
    sprintContainer.appendChild(sprintStart);
    sptintStartContainer.append(sprintStartTitle, sprintStartDescription);
    sptintStartContainer.append(sprintCat, sprintStartBtn);
    return sprintContainer;
  }
}

export default SprintStart;
