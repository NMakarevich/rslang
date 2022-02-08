const about = {
  render: () => {
    const mainContainer = document.querySelector('.main .container') as HTMLElement;
    mainContainer.innerHTML = `
    <div class='main__about'>
      <h2 сlass='main__title'>О приложении</h2>
    </div>
    `;
  },
};

export default about;
