import { chapterDifficult, pagesAmount } from '../consts';
import { IDictionary } from '../interfaces';
import main from '../main';
import GameScreen from './gameScreen';
import { localStorageUtil } from '../textbook/localStorageUtil';

class StartScreen {
  container: HTMLDivElement;

  dictionary: IDictionary;

  isFromDictionary!: boolean;

  constructor() {
    this.container = document.createElement('div');
    this.dictionary = {
      chapter: 0,
      page: 0,
    };
  }

  render(): HTMLDivElement {
    if (main.main.classList.contains('bg-white')) {
      main.main.classList.remove('bg-white');
    }
    this.container.classList.add('audiocall__container');
    this.isFromDictionary = main.pages[0] === 'dictionary';
    this.container.innerHTML = `
      <p class="audiocall__description">
        Прослушивайте слова и выбирайте из 5 вариантов правильный. 
        Выбрать слово можно, кликнув по нему или нажав цифру на клавиатуре, 
        соответствующую выбранному слову
      </p>
      <div class="audiocall__controlls">
        <div class="audiocall__difficulty">
          <span>Сложность:</span>
          <select class="audiocall__difficulty-select" ${
            this.isFromDictionary ? 'hidden' : ''
          }>${this.addOptions()}</select>
          </div>
        <button type="button" class="audiocall__start">Начать</button>
      </div>
    `;
    this.startButton.addEventListener('click', this.startGame);
    return this.container;
  }

  get select(): HTMLSelectElement {
    return this.container.querySelector('.audiocall__difficulty-select') as HTMLSelectElement;
  }

  get startButton(): HTMLButtonElement {
    return this.container.querySelector('.audiocall__start') as HTMLButtonElement;
  }

  startGame = async () => {
    if (!this.isFromDictionary) {
      this.dictionary.chapter = Number(this.select.value);
      this.dictionary.page = Math.round(Math.random() * (pagesAmount - 1));
    } else {
      this.dictionary.chapter = localStorageUtil.getChapter();
      this.dictionary.page = localStorageUtil.getPage();
    }
    const gameScreen = new GameScreen(this.dictionary);
    this.container.replaceWith(await gameScreen.render());
  };

  addOptions(): string {
    let options = '';
    for (let i = 0; i < chapterDifficult; i += 1) {
      options += `<option value="${i}">${i + 1}</option>`;
    }
    return options;
  }
}

const startScreen = new StartScreen();
export default startScreen;
