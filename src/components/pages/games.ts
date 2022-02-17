import main from '../main';

const games = {
  render: () => {
    main.main.style.backgroundColor = '#ffffff';
    main.mainContainer.innerHTML = `<div class='main__games'>
    <h2 сlass='main__title'>Игры</h2>
    <div class='games'>
      <a class='games__link' href='#/games/sprint'>Спринт</a>
      <a class='games__link' href='#/games/audio'>Аудиовызов</a>
    </div>
  </div>`;
  },
};

export default games;
