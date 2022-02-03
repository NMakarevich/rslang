class Main {
  render = (): string => {
    return `<header class='header'>
      <div class="container">
        <div class='header__burger'>
          <span class='header__burger-line'></span>
        </div>
        <nav class='header__nav nav'>
          <ul class='nav__list'>
            <li class='nav__item' id='home'><a href="/">Главная</a></li>
            <li class='nav__item' id='dictionary'><a href="#/dictionary">Словарь</a></li>
            <li class='nav__item' id='games'><a href="#/games">Игры</a></li>
            <li class='nav__item' id='about'><a href="#/about">О приложении</a></li>
            <li class='nav__item' id='team'><a href="#/team">Команда</a></li>
          </ul>
        </nav>
        <h1 class='header__title'>RS Lang</h1>
        <a href='#/login' class='header__link' id='login'>Войти</a>
      </div> 
    </header>
    <main class='main'>
      <div class='container'></div>
    </main>
    <footer class='footer'>
      <div class='container'>
        <a class='footer__school' href="https://rs.school"></a>
        <nav class='footer__nav nav'>
          <ul class='nav__list'>
            <li class='nav__item'><a class='nav__link' href="" target="_blank">lisaliza6428</a></li>
            <li class='nav__item'><a class='nav__link' href="" target="_blank">NMakarevich</a></li>
            <li class='nav__item'><a class='nav__link' href="" target="_blank">natakers</a></li>
          </ul>
        </nav>
        <span class='footer__year'>2022</span>
      </div>
    </footer>
    `;
  };

  eventListener() {
    this.burger.addEventListener('click', this.toggleBurger);
  }

  get burger(): HTMLElement {
    return document.querySelector('.header__burger') as HTMLElement;
  }

  toggleBurger = () => {
    const header = document.querySelector('.header') as HTMLElement;
    if (header.classList.contains('open')) {
      header.classList.remove('open');
      return;
    }
    header.classList.add('open');
  };
}

export default Main;
