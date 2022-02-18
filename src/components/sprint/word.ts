import { ICards } from '../interfaces';

class Word {
  draw(word: ICards, translation: ICards) {
    const sprintWordCont = document.createElement('div');
    sprintWordCont.classList.add('sprint__word__container');
    const sprintGameWord = document.createElement('div');
    sprintGameWord.classList.add('sprint__game__word');
    sprintGameWord.innerHTML = word.word;
    const sprintGameTranslation = document.createElement('div');
    sprintGameTranslation.classList.add('sprint__game__translation');
    sprintGameTranslation.innerHTML = translation.wordTranslate;
    sprintWordCont.appendChild(sprintGameWord);
    sprintWordCont.appendChild(sprintGameTranslation);
    return sprintWordCont;
  }
}

export default Word;
