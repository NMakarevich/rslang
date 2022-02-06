class Main {
  render = (): string => `<header class='header'>
      <div class="container">
        <div class='header__burger'>
          <span class='header__burger-line'></span>
        </div>
        <nav class='header__nav nav'>
          <ul class='nav__list'>
            <li class='nav__item' id='home'><a class='nav__link' href="/">Главная</a></li>
            <li class='nav__item' id='dictionary'><a class='nav__link' href="#/dictionary">Словарь</a></li>
            <li class='nav__item' id='games'><a class='nav__link' href="#/games">Игры</a></li>
            <li class='nav__item' id='about'><a class='nav__link' href="#/about">О приложении</a></li>
            <li class='nav__item' id='team'><a class='nav__link' href="#/team">Команда</a></li>
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
            <li class='nav__item'><a class='nav__link' href="http://github.com/lisaliza6428" target="_blank">lisaliza6428</a></li>
            <li class='nav__item'><a class='nav__link' href="http://github.com/nmakarevich" target="_blank">NMakarevich</a></li>
            <li class='nav__item'><a class='nav__link' href="http://github.com/natakers" target="_blank">natakers</a></li>
          </ul>
        </nav>
        <span class='footer__year'>2022</span>
      </div>
    </footer>
    `;

  eventListener() {
    this.burger.addEventListener('click', this.toggleBurger);
    document.addEventListener('click', this.closeBurger);
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

  closeBurger = (event: Event) => {
    if (!event.target || !event.currentTarget) return;
    const target = event.target as HTMLElement;
    if (target.classList.contains('header__burger')) return;

    const header = document.querySelector('.header') as HTMLElement;
    if (header.classList.contains('open')) {
      header.classList.remove('open');
    }
  };
}

export default Main;
