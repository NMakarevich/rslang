import './components/textbook/textbook.ts';
import './components/textbook/navigation.ts';
import './components/textbook/localStorageUtil.ts';
import './components/textbook/upButton.ts';
import './sass/style.scss';
import main from './components/main';
import Router from './components/router';

window.addEventListener('load', () => {
  main.render();
  const router = new Router();
  router.run();
});

// localStorage.clear();
