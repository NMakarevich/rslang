import './sass/style.scss';
import main from './components/main';
import Router from './components/router';

window.addEventListener('load', () => {
  main.render();
  const router = new Router();
  router.run();
});
