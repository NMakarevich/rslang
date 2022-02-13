import { IWord } from './interfaces/IWord';

class WordResult {
  draw(word: IWord) {
    const sprintResultItem = document.createElement('div');
    sprintResultItem.classList.add('sprint__result__item');
    const sprinteRsultItemVoice = document.createElement('div');
    sprinteRsultItemVoice.classList.add('sprint__result__item__voice');
    // sprinteRsultItemVoice.src = './assets/svg/volume.svg';
    const sprintResultItemText = document.createElement('div');
    sprintResultItemText.classList.add('sprint__result__item__text');
    sprintResultItemText.innerHTML = `${word.word} - ${word.wordTranslate}`;
    sprintResultItem.appendChild(sprinteRsultItemVoice);
    sprintResultItem.appendChild(sprintResultItemText);
    return sprintResultItem;
  }
}

export default WordResult;
