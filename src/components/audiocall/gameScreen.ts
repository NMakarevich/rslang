import { IDictionary } from '../interfaces';

class GameScreen {
  dictionary: IDictionary;

  container: HTMLDivElement;

  constructor(dictionary: IDictionary) {
    this.dictionary = dictionary;
    this.container = document.createElement('div');
  }

  render(): HTMLDivElement {
    this.container.classList.add('audiocall__container-game');
    return this.container;
  }
}

export default GameScreen;
