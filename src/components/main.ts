import Header from './header';

const header = new Header();

class Main {
  main: HTMLElement;

  pages: string[];

  constructor() {
    this.main = document.createElement('main');
    this.pages = [];
    this.pages[1] = '/';
  }

  render = (): void => {
    header.render();
    this.main.classList.add('main');
    this.main.innerHTML = '<div class="container"></div>';
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `<div class='container'>
      <a class='footer__school' href="https://rs.school"></a>
      <nav class='footer__nav nav'>
        <ul class='nav__list'>
          <li class='nav__item'><a class='nav__link' href="http://github.com/lisaliza6428" target="_blank">lisaliza6428</a></li>
          <li class='nav__item'><a class='nav__link' href="http://github.com/nmakarevich" target="_blank">NMakarevich</a></li>
          <li class='nav__item'><a class='nav__link' href="http://github.com/natakers" target="_blank">natakers</a></li>
        </ul>
      </nav>
      <span class='footer__year'>2022</span>
    </div>
    `;
    document.body.append(this.main, footer);
  };

  get mainContainer(): HTMLElement {
    return this.main.querySelector('.container') as HTMLElement;
  }
}

const main = new Main();
export default main;
