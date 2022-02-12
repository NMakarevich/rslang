import main from '../main';

const page404 = {
  render: () => {
    main.mainContainer.innerHTML = `<h2>Страница не найдена</h2>`;
  },
};

export default page404;
