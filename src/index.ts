import './sass/style.scss';
import Main from './components/main';
import Router from './components/router';

window.addEventListener('load', () => {
  const main = new Main();
  document.body.innerHTML = main.render();
  main.eventListener();
  const router = new Router();
  router.run();
});
