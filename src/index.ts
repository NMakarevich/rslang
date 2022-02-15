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

/* document.addEventListener('click', () => {
  console.log(window.pageYOffset);
  localStorage.setItem('scroll', `${window.pageYOffset}`);
  window.pageYOffset = 5000;
  window.scrollTo(10, 5000);
})  */

