import { ISignIn } from '../interfaces';
import { signIn } from '../api';
import main from '../main';

class Login {
  email: HTMLInputElement;

  password: HTMLInputElement;

  submit: HTMLInputElement;

  constructor() {
    this.email = document.createElement('input');
    this.password = document.createElement('input');
    this.submit = document.createElement('input');
  }

  render = () => {
    main.main.style.backgroundColor = '#d373f3';
    main.mainContainer.innerHTML = `
    <div class='main__login content-wrapper'>
      <h2 сlass='main__title'>Вход / <a class='main__title-link' href='#/registration'>Регистрация</a></h2>
      <form class='main__form'>
        ${this.insertInputs()}
      </form>
    </div>`;
    this.eventListener();
  };

  insertInputs(): string {
    this.email.type = 'email';
    this.email.id = 'email';
    this.email.placeholder = 'Email';
    this.password.type = 'password';
    this.password.id = 'password';
    this.password.placeholder = 'Пароль';
    this.submit.type = 'submit';
    this.submit.value = 'Войти';

    const div = document.createElement('div');
    div.append(this.email, this.password, this.submit);
    return div.innerHTML;
  }

  async signIn(event: Event) {
    event.preventDefault();
    await signIn({
      email: this.email.value,
      password: this.password.value,
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('wrong email and/or password');
        }
        return response.json();
      })
      .then((data: ISignIn) => {
        localStorage.setItem('rslang-user', JSON.stringify(data));
        const e = new CustomEvent('signin', {
          bubbles: true,
          detail: data.name,
        });
        document.dispatchEvent(e);
        window.location.href = '/';
      })
      .catch(() => {
        const div = document.createElement('div');
        div.classList.add('form__error');
        div.innerHTML = 'Неверный email и/или пароль';
        main.mainContainer.append(div);
        setTimeout(() => div.remove(), 2000);
      });
  }

  eventListener() {
    main.mainContainer.querySelector('.main__form')?.addEventListener('submit', this.signIn);
  }
}

export default Login;
