class Dictionary {
  render = async () => {
    const mainContainer = document.querySelector('.main .container') as HTMLElement;
    mainContainer.innerHTML = `
    <div class='main__dictionary'>
      <h2 сlass='main__title'>Словарь</h2>
      <div class="textbook">
        <div id="textbook-header"></div>
        <div id="textbook-wrapper"></div>
      </div>
    </div>`;
    textbookNavigation.render();
    await cards.render();
  };
}

export default Dictionary;
