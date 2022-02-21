import { baseURL } from '../consts';
import { ICards } from '../interfaces';
import { audio } from './function';

class WordResult {
  draw(word: ICards) {
    const sprintResultItem = document.createElement('div');
    sprintResultItem.classList.add('sprint__result__item');
    const sprinteRsultItemVoice = document.createElement('div');
    sprinteRsultItemVoice.classList.add('sprint__result__item__voice');
    sprinteRsultItemVoice.onclick = () => {
      audio.src = `${baseURL}/${word.audio}`;
      audio.play();
    };
    const sprintResultItemText = document.createElement('div');
    sprintResultItemText.classList.add('sprint__result__item__text');
    sprintResultItemText.innerHTML = `${word.word} - ${word.wordTranslate}`;
    sprintResultItem.appendChild(sprinteRsultItemVoice);
    sprintResultItem.appendChild(sprintResultItemText);
    return sprintResultItem;
  }
}

export default WordResult;
