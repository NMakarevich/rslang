import { IWord } from './interfaces/IWord';
import SprintResult from './sprint_results';
import Word from './word';

export const audio = new Audio();

export function addAnswerYes(right: Array<IWord>, point: number, data?: IWord) {
  const sprintGameScore = document.querySelector('.sprint__game__score');
  let bill = sprintGameScore?.innerHTML;
  if (data) {
    right.push(data);
    bill = String(10 + Number(bill));
    (sprintGameScore as HTMLElement).innerHTML = bill;
    sprintGameScore?.classList.add('sprint__game__score_activ');
  }
  const points = document.querySelectorAll('.sprint__game__point');
  if (point === 3) {
    (points[point - 1] as HTMLElement).classList.add('sprint__game__point_activ');
    setTimeout(() => {
      points?.forEach((item) => {
        (item as HTMLElement).classList.remove('sprint__game__point_activ');
      });
    }, 200);
  } (points[point - 1] as HTMLElement).classList.add('sprint__game__point_activ');
  setTimeout(() => sprintGameScore?.classList.remove('sprint__game__score_activ'), 1000);
}

export const pageWords = {
  group: 0,
  page: 0,
};

const baseUrl = 'https://rslang-team32.herokuapp.com';
const path = {
  words: '/words',
};

// eslint-disable-next-line no-shadow
export async function getWords(pageWords: { group: any; page?: number; }) {
  const response = await fetch(`${baseUrl}${path.words}?group=${pageWords.group}&page=${pageWords.group}`);
  let data;
  if (response.ok) data = await response.json();
  return data;
}

// eslint-disable-next-line no-undef
let time: NodeJS.Timer;
export function setTimer(right: Array<IWord>, wrong: Array<IWord>) {
  let seconds = 10;
  time = setInterval(() => {
    if (seconds >= 0) {
      const timerScore = document.querySelector('.sprint__game__timer');
      (document.querySelector('.sprint__container') as HTMLElement).style.opacity = '1';
      (timerScore as HTMLElement).innerHTML = `${seconds}`;
      seconds -= 1;
    } else {
      clearInterval(time);
      const container = document.querySelector('.sprint__container') as HTMLElement;
      container.appendChild(new SprintResult().draw(right, wrong));
    }
    return seconds;
  }, 1000);
}

export function changeWord(count: number, data: Array<IWord>) {
  let newWord;
  const count1 = count + 1;
  const x = Math.random();
  let translation: number;
  if (x > 0.333) {
    translation = count1;
  } else translation = Math.ceil(Math.random() * 19);
  const container = document.querySelector('.sprint__word__container1');
  (container as HTMLElement).innerHTML = '';
  if (data[count1]) {
    newWord = new Word().draw(data[count1]!, data[translation]!); // тут надо разобраться
    audio.src = `${baseUrl}/${data[count1]!.audio}`;
  } else return false;
  container?.appendChild(newWord);
  if (translation === count1) {
    return true;
  }
  return false;
}

export function makeNode(html: string, teg: string): HTMLElement {
  const div = document.createElement(teg);
  div.innerHTML = html;
  return div.firstElementChild as HTMLElement;
}

export function shuffle(array: Array<IWord>) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export async function addWords(arrWords: Array<IWord>) {
  let oldWords = arrWords;
  pageWords.group += 1;
  const newWords = shuffle(await getWords(pageWords));
  oldWords = arrWords.concat(newWords);
  return oldWords;
}

// export async function rightAnswer(x, point, right, wrong, arrWords, count) {
//   let point1 = point;
//   let count1 = count;
//   let x1 = x;
//   let arrWords1 = arrWords;
//   if (!x) {
//     if (point1 === 3) {
//       point1 = 0;
//     } point1 += 1;
//     addAnswerYes(right, point, arrWords[count]);
//   } else wrong.push(arrWords1[count]!);
//   count1 += 1;
//   if (count1 === arrWords.length - 2) {
//     arrWords1 = await addWords(arrWords);
//   }
//   x1 = changeWord(count, arrWords);
//   return x1;
// }
