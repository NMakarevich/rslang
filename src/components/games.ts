const games = {
  render: () => {
    const mainContainer = document.querySelector('.main .container') as HTMLElement;
    mainContainer.innerHTML = `<div class='main__games'>
    <h2 сlass='main__title'>Игры</h2>
  </div>`;
  },
};

export default games;
