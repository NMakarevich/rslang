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
    const mainContainer = document.querySelector('.main .container') as HTMLElement;
    mainContainer.innerHTML = `
    <div class='main__login'>
      <h2 сlass='main__title'>Вход</h2>
      <form class='main__form'>
        ${this.insertInputs()}
      </form>
      <a class='registry__link' href='#/registry'>Регистрация</a>
    </div>`;
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

  login = async () => {
    // await loginUser(this.email.value, this.password.value);
  };
}

export default Login;
