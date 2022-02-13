import { IWord } from './interfaces/IWord';
import SprintResult from './sprint_results';
import Word from './word';

export function addAnswerNo(count: number, translation: number) {
  console.log(`word  ${count} tra  ${translation}`);
  // console.log(`tra  ${translation}`);
}

export function addAnswerYes(count: number, translation: number) {
  console.log(`word  ${count} tra  ${translation}`);
  // console.log(`tra  ${translation}`);
}

export const pageWords = [
  {
    key: 'group',
    value: 0,
  },
  {
    key: 'page',
    value: 0,
  },
];

const baseUrl = 'https://rslang-team32.herokuapp.com';
const path = {
  words: '/words',
  winners: '/winners',
  engine: '/engine',
};

const getParam = (params: any[]) => {
  const param = params.length ? `?${params.map((item) => `${item.key}=${item.value}`).join('&')}` : '';
  return param;
};

export async function getWords(params: any[]) {
  const response = await fetch(`${baseUrl}${path.words}${getParam(params)}`);
  let data;
  if (response.ok) data = await response.json();
  return data;
}

const words = getWords(pageWords);

let time: NodeJS.Timer;
export function setTimer(right: Array<IWord>, wrong: Array<IWord>) {
  let seconds = 60;
  // if (localStorage.getItem('timeGame') ==  'true') {

  // let workTime1 = localStorage.getItem('ltimeInterval');
  // console.log(workTime1);
  time = setInterval(() => {
    if (seconds >= 0) {
      const timerScore = document.querySelector('.sprint__game__timer');
      (document.querySelector('.sprint__container') as HTMLElement).style.opacity = '1';
      (timerScore as HTMLElement).innerHTML = `${seconds}`;
      seconds -= 1;
    } else {
      clearInterval(time);
      const container = document.querySelector('.sprint__container') as HTMLElement;
      container.replaceWith(new SprintResult().draw(right, wrong));
      // (container as HTMLElement).click();
    }
    return seconds;
  }, 1000);
  // }
}

export function changeWord(count: number, word: HTMLElement, data: Array<IWord>) {
  count += 1;
  const x = Math.random();
  let translation: number;
  if (x > 0.33) {
    translation = count;
  } else translation = Math.ceil(Math.random() * 10 + 1);

  const container = document.querySelector('.sprint__word__container1');
  (container as HTMLElement).innerHTML = '';
  if (data[count]) {
    word = new Word().draw(data[count]!, data[translation]!); // тут надо разобраться
  } else word = document.createElement('div');
  container?.appendChild(word);
  if (translation === count) {
    return true;
  }
  return false;
}

export function makeNode(html: string, teg: string): HTMLElement {
  const div = document.createElement(teg);
  div.innerHTML = html;

  return div.firstElementChild as HTMLElement;
}

//   export  function timeOf() {
//     clearInterval(time);
//   }

//   function keyPress(e: Event) {
//     let keyNum;
//     if (window.event) {
//         keyNum = window.event.keyCode;
//     }
//     else if (e) {
//         keyNum = e.which;
//     }
//     console.log(keyNum);
// }
// document.onkeydown = keyPress;
