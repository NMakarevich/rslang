import { IWord } from './interfaces/IWord';
import WordResult from './word_result';

class SprintResult {
  draw(rigth: Array<IWord>, wrong: Array<IWord>) {
    const sprintResult = document.createElement('div');
    sprintResult.classList.add('sprint__result');
    const sprintResultTitle = document.createElement('div');
    sprintResultTitle.classList.add('sprint__result__title');
    sprintResultTitle.innerHTML = 'Результат';
    const sprintResultText = document.createElement('div');
    sprintResultText.classList.add('sprint__result__text');
    sprintResultText.innerHTML = 'Знаю';
    const sprintResultQuantity = document.createElement('div');
    sprintResultQuantity.classList.add('sprint__result__quantity');
    sprintResultQuantity.innerHTML = `${rigth.length}`;
    const sprintResultList = document.createElement('div');
    sprintResultList.classList.add('sprint__result__list', 'sprint__result__list_yes');
    for (let i = 0; i < rigth.length; i += 1) {
      const item = new WordResult().draw(rigth[i]!);
      sprintResultList.appendChild(item);
    }
    const sprintResultTextNo = document.createElement('div');
    sprintResultTextNo.classList.add('sprint__result__text');
    sprintResultTextNo.innerHTML = 'Не знаю';
    const sprintResultQuantityNo = document.createElement('div');
    sprintResultQuantityNo.classList.add('sprint__result__quantity', 'sprint__result__quantity_no');
    sprintResultQuantityNo.innerHTML = `${wrong.length}`;
    const sprintResultListNo = document.createElement('div');
    sprintResultListNo.classList.add('sprint__result__list', 'sprint__result__list_no');
    for (let i = 0; i < wrong.length; i += 1) {
      const item = new WordResult().draw(wrong[i]!);
      sprintResultListNo.appendChild(item);
    }
    const sprintResultBtnBtns = document.createElement('div');
    sprintResultBtnBtns.classList.add('sprint__result__btns');
    const sprintResultBtnBack = document.createElement('button');
    sprintResultBtnBack.classList.add('sprint__result__back');
    const sprintResultBtnBackLink = document.createElement('a');
    sprintResultBtnBackLink.classList.add('sprint__result__back__link');
    sprintResultBtnBackLink.href = '#/games';
    sprintResultBtnBack.innerHTML = 'К списку игр';
    const sprintResultBtnAgainLink = document.createElement('a');
    sprintResultBtnAgainLink.classList.add('sprint__result__again__link');
    sprintResultBtnAgainLink.href = '#/games/sprint';
    sprintResultBtnBackLink.appendChild(sprintResultBtnBack);
    sprintResultBtnBtns.append(sprintResultBtnBackLink);
    sprintResult.appendChild(sprintResultTitle);
    sprintResultText.appendChild(sprintResultQuantity);
    sprintResult.appendChild(sprintResultText);
    sprintResult.appendChild(sprintResultList);
    sprintResultTextNo.appendChild(sprintResultQuantityNo);
    sprintResult.appendChild(sprintResultTextNo);
    sprintResult.appendChild(sprintResultListNo);
    sprintResult.append(sprintResultBtnBtns);
    return sprintResult;
  }
}

export default SprintResult;
