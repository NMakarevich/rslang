// import { getUserStudiedWords } from '../api-requests';
import { pageWords } from './function';
import SprintGame from './sprint_game';
import { localStorageUtil } from '../textbook/localStorageUtil';
import { getWords } from '../api';

class SprintStart {
  draw() {
    let arr;
    const CAT_QUANTITY = 6;
    const sprintContainer = document.createElement('div');
    sprintContainer.classList.add('sprint__container');
    // const sprintExit = document.createElement('div');
    // sprintExit.classList.add('sprint__exit');
    // const sprintExitImg = document.createElement('img');
    // sprintExitImg.classList.add('sprint__exit_img');
    const sprintStart = document.createElement('div');
    sprintStart.classList.add('sprint__start');
    const sptintStartContainer = document.createElement('div');
    sptintStartContainer.classList.add('sptint__start__container');
    const sprintStartTitle = document.createElement('div');
    sprintStartTitle.classList.add('sprint__start__title');
    sprintStartTitle.innerHTML = 'Спринт';
    const sprintStartDescription = document.createElement('p');
    sprintStartDescription.classList.add('sprint__start__description');
    sprintStartDescription.innerHTML =
      'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову';
    const sprintCat = document.createElement('select');
    sprintCat.classList.add('sprint__cat');
    sprintCat.name = 'sprint__cat';
    sprintCat.id = 'sprint__cat';
    for (let i = 0; i <= CAT_QUANTITY; i += 1) {
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
      console.log(pageWords);
      arr = getWords(pageWords.page, pageWords.group);
      // sprintContainer.replaceWith(new SprintGame().draw(await arr));
    };
    const sprintStartBtn = document.createElement('button');
    sprintStartBtn.classList.add('sprint__start__btn');
    sprintStartBtn.innerHTML = 'Начать';
    sprintStartBtn.onclick = async () => {
      console.log(pageWords);
      pageWords.group = localStorageUtil.getChapter();
      pageWords.page = localStorageUtil.getPage();
      console.log(pageWords);
      if (localStorageUtil.checkAuthorization()) {
        arr = getWords(pageWords.page, pageWords.group);
        console.log(arr);
        sprintContainer.replaceWith(new SprintGame().draw(await arr));
      } else {
        pageWords.group = Number(sprintCat.value) - 1;
        arr = getWords(pageWords.page, pageWords.group);
        console.log(arr);
        sprintContainer.replaceWith(new SprintGame().draw(await arr));
      }
    };
    sptintStartContainer.appendChild(sprintStartTitle);
    sptintStartContainer.appendChild(sprintStartDescription);
    sptintStartContainer.appendChild(sprintCat);
    sptintStartContainer.appendChild(sprintStartBtn);
    sprintStart.appendChild(sptintStartContainer);
    // sprintExit.appendChild(sprintExitImg);
    // sprintContainer.appendChild(sprintExit);
    sprintContainer.appendChild(sprintStart);
    sptintStartContainer.append(sprintStartTitle, sprintStartDescription);
    sptintStartContainer.append(sprintCat, sprintStartBtn);
    return sprintContainer;
  }
}

export default SprintStart;
