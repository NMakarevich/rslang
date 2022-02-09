import main from '../main';

const team = {
  render: () => {
    main.mainContainer.innerHTML = `
    <div class='main__team team'>
      <h2 class='main__title'>О команде</h2> 
      <div class="team__container">
        <div class='team__card'>
          <div class='team__avatar team__avatar-lisaliza6428'>
          </div>
          <div class='team__info'>
            <h3 class='team__name'>Елизавета Иванушенко</h3>
            <a class='team__github' href='http://github.com/lisaliza6428' target='_blank'>lisaliza6428</a>
            <ul class='team__contribution'>
            </ul>
          </div>
        </div>
        <div class='team__card'>
          <div class='team__avatar team__avatar-nmakarevich'>
          </div>
          <div class='team__info'>
            <h3 class='team__name'>Николай Макаревич</h3>
            <a class='team__github' href='http://github.com/nmakarevich' target='_blank'>NMakarevich</a>
            <ul class='team__contribution'>
            </ul>
          </div>
        </div>
        <div class='team__card'>
          <div class='team__avatar team__avatar-natakers'>
          </div>
          <div class='team__info'>
            <h3 class='team__name'>Наталья Керсновская</h3>
            <a class='team__github' href='http://github.com/natakers' target='_blank'>natakers</a>
            <ul class='team__contribution'>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `;
  },
};

export default team;
