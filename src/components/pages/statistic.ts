import main from '../main';
import Statistic from '../statistic/ststistic';

const statistic = {
  render: async () => {
    main.main.classList.add('bg-white');
    main.mainContainer.innerHTML = `
    <div class='main__statistic'>
      <h2 сlass='main__title'>Статистика</h2>
    </div>
    `;
    const mainStatistic = main.mainContainer.querySelector('.main__statistic') as HTMLElement;
    mainStatistic.append(await new Statistic().draw());
  },
};

export default statistic;
