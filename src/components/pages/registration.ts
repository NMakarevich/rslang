import main from '../main';
import Login from './login';
import { registrationUser } from '../api';

class Registration extends Login {
  name: HTMLInputElement;

  constructor() {
    super();
    this.name = document.createElement('input');
  }

  override render = () => {
    main.mainContainer.innerHTML = `
    <div class='main__registration'>
      <h2 сlass='main__title'><a class='main__title-link' href='#/login'>Вход</a> / Регистрация</h2>
      <form class='main__form'>
        ${this.insertInputs()}
      </form>
    </div>
    `;
    this.eventListener();
  };

  override insertInputs(): string {
    super.insertInputs();
    this.name.type = 'text';
    this.name.id = 'name';
    this.name.placeholder = 'Имя пользователя';
    this.submit.value = 'Зарегистрироваться';

    const div = document.createElement('div');
    div.append(this.name, this.email, this.password, this.submit);
    return div.innerHTML;
  }

  async registration(event: Event) {
    event.preventDefault();
    await registrationUser({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    });
    window.location.href = '#/login';
  }

  override eventListener() {
    main.mainContainer.querySelector('.main__form')?.addEventListener('submit', this.registration);
  }
}

export default Registration;
