class Header {
  header: HTMLHeadElement;

  constructor() {
    this.header = document.createElement('header');
  }

  render = (): void => {
    const userData = localStorage.getItem('rslang-user') || '';
    this.header.classList.add('header');
    this.header.innerHTML = `<div class="container">
    <div class='header__burger'>
          <span class='header__burger-line'></span>
        </div>
        <nav class='header__nav nav'>
          <ul class='nav__list'>
            <li class='nav__item' id='home'><a class='nav__link' href="/">Главная</a></li>
            <li class='nav__item' id='dictionary'><a class='nav__link' href="#/dictionary">Учебник</a></li>
            <li class='nav__item' id='games'><a class='nav__link' href="#/games">Игры</a></li>
            <li class='nav__item' id='about'><a class='nav__link' href="#/about">О приложении</a></li>
            <li class='nav__item' id='team'><a class='nav__link' href="#/team">Команда</a></li>
          </ul>
        </nav>
        <h1 class='header__title'>RSLang</h1>
        <a href='#/login' class='header__link' id='login' ${userData ? 'hidden' : ''}>Войти</a>
        <div class='header__user'${userData ? '' : 'hidden'}>
          <span class='header__user-name'>${userData ? JSON.parse(userData).name : ''}</span>
          <button type='button' class='header__user-button'>Выход</button>
      </div> `;
    document.body.append(this.header);
    this.eventListeners();
  };

  logout = () => {
    localStorage.setItem('rslang-user', '');
    this.toggleUser({ detail: '' } as CustomEvent);
    window.location.href = '#/';
  };

  toggleBurger = () => {
    if (this.header.classList.contains('open')) {
      this.header.classList.remove('open');
      return;
    }
    this.header.classList.add('open');
  };

toggleUser = (event: CustomEventInit<string>) => {
    const userName = this.header.querySelector('.header__user-name') as HTMLSpanElement;
    userName.textContent = event.detail as string;
    const user = this.header.querySelector('.header__user') as HTMLElement;
    user.hidden = !user.hidden;
    const link = this.header.querySelector('.header__link') as HTMLLinkElement;
    link.hidden = !link.hidden;
  };

  closeBurger = (event: Event) => {
    if (!event.target || !event.currentTarget) return;
    const target = event.target as HTMLElement;
    if (target.classList.contains('header__burger')) return;

    if (this.header.classList.contains('open')) {
      this.header.classList.remove('open');
    }
  };

  eventListeners() {
    this.header.querySelector('.header__burger')?.addEventListener('click', this.toggleBurger);
    document.addEventListener('click', this.closeBurger);
    document.addEventListener('signin', this.toggleUser);
    this.header.querySelector('.header__user-button')?.addEventListener('click', this.logout);
  }
}

export default Header;
