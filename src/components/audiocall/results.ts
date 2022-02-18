import { ICards } from '../interfaces';

class AudiocallResults {
  correct: ICards[];

  wrong: ICards[];

  container: HTMLDivElement;

  constructor(correct: ICards[], wrong: ICards[]) {
    this.correct = correct;
    this.wrong = wrong;
    this.container = document.createElement('div');
  }

  render(): HTMLDivElement {
    this.container.classList.add('audiocall__results');
    this.container.innerHTML = `
    <h3 class='audiocall__subtitle'>Результаты</h3>
    <div class="audiocall__results-container">
      <div class='audiocall__results-correct'>
        <h4 class='audiocall__results-title'>Знаю</h4>
        <ul class='results__list'>${this.generateWordsList(this.correct)}</ul>
      </div>
      <div class='audiocall__results-wrong'>
        <h4 class='audiocall__results-title'>Не знаю</h4>
        <ul class='results__list'>${this.generateWordsList(this.wrong)}</ul>
      </div>
    </div>
    <div class='audiocall__links'>
      <a class='audiocall__link' href='#/dictionary'>К учебнику</a>
    </div>      
    `;
    return this.container;
  }

  generateWordsList(words: ICards[]): string {
    let html = '';
    words.forEach((word: ICards) => {
      html += `<li class='results__item'>${word.word} - ${word.wordTranslate}</li>`;
    });
    return html;
  }
}

export default AudiocallResults;
