import main from '../main';

const about = {
  render: () => {
    main.mainContainer.innerHTML = `
    <div class='main__about'>
      <h2 сlass='main__title'>О приложении</h2>
    </div>
    `;
  },
};

export default about;
