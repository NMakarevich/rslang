import './sass/style.scss';
import './components/style.css';
import { SprintStart } from "./components/sprint/sprint_start";

// window.addEventListener('load', () => {
//   const main = new Main();
//   document.body.innerHTML = main.render();
//   main.eventListener();
//   new Router();
// });

const body = document.body;
// console.log('ddddd')
body.appendChild(new SprintStart().draw());