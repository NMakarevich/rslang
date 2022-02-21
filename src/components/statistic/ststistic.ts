import { gerSeries, getPercent } from '../sprint/function';
import { localStorageUtil } from '../textbook/localStorageUtil';

class Statistic {
  async draw() {
    const staticticWrapper = document.createElement('div');
    staticticWrapper.classList.add('statictic__wrapper');
    if (localStorageUtil.checkAuthorization()) {
    const statisticGameName = document.createElement('div');
    statisticGameName.classList.add('statistic__game__name');
    statisticGameName.innerHTML = 'Спринт';
    const statisticContainer = document.createElement('div');
    statisticContainer.classList.add('statistic__container');
    for (let i = 0; i < 2; i += 1) {
      const statisticItem = document.createElement('div');
      statisticItem.classList.add('statistic__item');
      const statisticCount = document.createElement('div');
      statisticCount.classList.add('statistic__count');
      const statisticCountBack = document.createElement('div');
      statisticCountBack.classList.add('statistic__count__back');
      const statisticCountText = document.createElement('div');
      statisticCountText.classList.add('statistic__count__text');
      const statisticCountName = document.createElement('div');
      statisticCountName.classList.add('statistic__count-name');
      if (i === 0) {
        statisticCountName.innerHTML = '% правильных ответов';
        const series = await getPercent();
        console.log(series);
        // if (localStorageUtil.checkAuthorization()) {
        statisticCountText.innerHTML = series;
        // }
      }
      if (i === 1) {
        statisticCountName.innerHTML = 'Самая длинная серия';
        const series = await gerSeries();
        // if (localStorageUtil.checkAuthorization()) {
        statisticCountText.innerHTML = String(series);
        // }
      }
      // if (i === 2) {
      //   statisticCountName.innerHTML = 'Новые слова за день';
      // }
      statisticCountBack.appendChild(statisticCountText);
      statisticCount.appendChild(statisticCountBack);
      statisticItem.appendChild(statisticCount);
      statisticItem.appendChild(statisticCountName);
      statisticContainer.appendChild(statisticItem);
    }
    const statisticGameName1 = document.createElement('div');
    statisticGameName1.classList.add('statistic__game__name');
    statisticGameName1.innerHTML = 'Аудиовызов';
    const statisticContainer1 = document.createElement('div');
    statisticContainer1.classList.add('statistic__container');
    for (let i = 0; i < 2; i += 1) {
      const statisticItem = document.createElement('div');
      statisticItem.classList.add('statistic__item');
      const statisticCount = document.createElement('div');
      statisticCount.classList.add('statistic__count');
      const statisticCountBack = document.createElement('div');
      statisticCountBack.classList.add('statistic__count__back');
      const statisticCountText = document.createElement('div');
      statisticCountText.classList.add('statistic__count__text');
      const statisticCountName = document.createElement('div');
      statisticCountName.classList.add('statistic__count-name');
      if (i === 0) {
        statisticCountName.innerHTML = '% правильных ответов';
      }
      if (i === 1) {
        statisticCountName.innerHTML = 'Самая длинная серия';
      }
      // if (i === 2) {
      //   statisticCountName.innerHTML = 'Новые слова за день';
      // }
      statisticCountBack.appendChild(statisticCountText);
      statisticCount.appendChild(statisticCountBack);
      statisticItem.appendChild(statisticCount);
      statisticItem.appendChild(statisticCountName);
      statisticContainer1.appendChild(statisticItem);
    }
    // eslint-disable-next-line max-len
    staticticWrapper.append(statisticGameName, statisticContainer, statisticGameName1, statisticContainer1);
    
    return staticticWrapper;
  } else return staticticWrapper.innerHTML = 'Зарегистрируйтесь, чтобы получить статистику';
  }
}

export default Statistic;

// <div class="statictic__wrapper">
// <h1 class="statistic__game__name">Спринт</h1>
// <div class="statistic__container">
// <div class="statistic__item">
//   <div class="statistic__count">
//     <div class="statistic__count__back">
//       <div class="statistic__count__text">25</div>
//     </div>
//   </div>
//   <div class="statistic__count-name">Новые слова за день</div>
// </div>
// <div class="statistic__item">
//   <div class="statistic__count">
//     <div class="statistic__count__back">
//       <div class="statistic__count__text">60%</div>
//     </div>
//   </div>
//   <div class="statistic__count-name">Правильные ответы</div>
// </div>
// <div class="statistic__item">
//   <div class="statistic__count">
//     <div class="statistic__count__back">
//       <div class="statistic__count__text">34</div>
//     </div>
//   </div>
//   <div class="statistic__count-name">Самая длинная серия</div>
// </div>
// </div>
// <h1 class="statistic__game__name">Аудиовызов</h1>
// <div class="statistic__container">
// <div class="statistic__item">
//   <div class="statistic__count">
//     <div class="statistic__count__back">
//       <div class="statistic__count__text">15</div>
//     </div>
//   </div>
//   <div class="statistic__count-name">Новые слова за день</div>
// </div>
// <div class="statistic__item">
//   <div class="statistic__count">
//     <div class="statistic__count__back">
//       <div class="statistic__count__text">72%</div>
//     </div>
//   </div>
//   <div class="statistic__count-name">Правильные ответы</div>
// </div>
// <div class="statistic__item">
//   <div class="statistic__count">
//     <div class="statistic__count__back">
//       <div class="statistic__count__text">41</div>
//     </div>
//   </div>
//   <div class="statistic__count-name">Самая длинная серия</div>
// </div>
// </div>
