import main from '../main';

const home = {
  render: () => {
    main.mainContainer.innerHTML = `<div class="home-container">
                                      <h2 class="title">Улучшай свой английский вместе с <span class="rslang">RSLang</span>!</h2>
                                      <div class="list-title">Здесь ты найдешь:</div>
                                      <ul class="list">
                                        <li class="list__item"><span class="list-item-img"></span>Удобный учебник с более 3,5 тысяч слов, разделенный  на главы различного уровня сложности, с актуальными примерами и транскрипцией</li>
                                        <li class="list__item"><span class="list-item-img"></span>Интерактивные игры для запоминания новых слов и практики
                                            восприятия их на слух </li>
                                        <li class="list__item"><span class="list-item-img"></span>Возможность отслеживать свой прогресс</li>
                                      </ul>
                                      <div class="textbook-button"><a class="textbook-link" href="#/dictionary">НАЧАТЬ!</a></div>
                                    </div>`;
  },
};

export default home;
