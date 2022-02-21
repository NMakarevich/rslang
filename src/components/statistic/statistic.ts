import { getSeries, getPercent } from '../sprint/function';
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
        const series = await getSeries();
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
