import main from '../main';
import { SprintStart } from '../sprint/sprint_start';

const sprint = {
  render: () => {
    main.mainContainer.innerHTML = `
    <div class='main__sprint'>
      <h2 сlass='main__title'>Спринт</h2>
    </div>
    `;
    const mainSprint = main.mainContainer.querySelector('.main__sprint') as HTMLElement;
    mainSprint.append(new SprintStart().draw());
  },
};

export default sprint;
