import main from '../main';
import Login from './login';

class Registry extends Login {
  name: HTMLInputElement;

  constructor() {
    super();
    this.name = document.createElement('input');
  }

  override render = () => {
    main.mainContainer.innerHTML = `
    <div class='main__registry'>
      <h2 сlass='main__title'>Регистрация</h2>
      <form class='main__form'>
        ${this.insertInputs()}
      </form>
      <a class='login__link' href='#/login'>Вход</a>
    </div>
    `;
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

  registry = async () => {
    // await registryUser(this.name.value, this.email.value, this.password.value);
  };
}

export default Registry;
