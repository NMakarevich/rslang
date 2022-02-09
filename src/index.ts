import './sass/style.scss';
import main from './components/main';
import Router from './components/router';

window.addEventListener('load', () => {
  document.body.innerHTML = main.render();
  main.eventListener();
  const router = new Router();
  router.run();
});
