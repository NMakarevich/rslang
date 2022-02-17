// import { createUserWordData } from '../textbook/consts';
// import { getWords } from '../api-requests';
import { authorization } from '../textbook/consts';
import { localStorageUtil } from '../textbook/localStorageUtil';
import { IWord } from './interfaces/IWord';
import SprintResult from './sprint_results';
import Word from './word';

export const audio = new Audio();

export const pageWords = {
  group: 0,
  page: 0,
};

const baseUrl = 'https://rslang-team32.herokuapp.com';
const path = {
  words: '/words',
};

// eslint-disable-next-line no-shadow
export async function getWords1(pageWords: { group: any; page?: number; }) {
  const response = await fetch(`${baseUrl}${path.words}?group=${pageWords.group}&page=${pageWords.group}`);
  let data;
  if (response.ok) data = await response.json();
  return data;
}

export async function getStat(userId: string) {
  const response = await fetch(`${baseUrl}/users/${userId}/statistics`);
  let data;
  if (response.ok) data = await response.json();
  return data;
}

// eslint-disable-next-line no-undef
let time: NodeJS.Timer;
export function setTimer(right: Array<IWord>, wrong: Array<IWord>) {
  let seconds = 60;
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
  console.log(count);
  let newWord;
  const count1 = count;
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
  const newWords = shuffle(await getWords1(pageWords));
  oldWords = arrWords.concat(newWords);
  return oldWords;
}

export type createUserWordData = {
  userId: string,
  wordId: string,
  word?: object
};

export type createUserStat = {
  userId: string,
  count: number,
};

export const updateUserStat = async ({ userId, count }: createUserStat) => {
  const { token } = localStorageUtil.getUserInfo();
  await fetch(`${baseUrl}/users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(count),
  });
};

export const createUserWord1 = async ({ userId, wordId, word }: createUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
};

export async function getWord1(id: string) {
  let res;
  if (authorization.authorized) {
    const { token } = localStorageUtil.getUserInfo();
    const { userId } = localStorageUtil.getUserInfo();
    const response: Response = await fetch(`${baseUrl}/users/${userId}/aggregatedWords/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    res = await response.json();
  } else {
    const response: Response = await fetch(`${baseUrl}/words/${id}`);
    res = await response.json();
  }
  return res;
}

export const updateUserWord1 = async ({ userId, wordId, word }: createUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  await fetch(`${baseUrl}/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
};

export async function dailyStat(game: string, answer: string, data: IWord) {
  const date = new Date();
  const dateFormat = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  // const word = data.id;
  const user = localStorageUtil.getUserInfo();
  const wordInfo = await getWord1(data.id);
  let sprint1 = 1;
  if (wordInfo[0].userWord === undefined) {
    await createUserWord1({
      userId: `${user.userId}`,
      wordId: `${data.id}`,
      word: { optional: { [dateFormat]: { [game]: { [answer]: 1 } } } },
    });
  } else {
    // eslint-disable-next-line max-len
    if (wordInfo[0].userWord.optional[dateFormat] === undefined) {
      sprint1 = 1;
      wordInfo[0].userWord.optional[dateFormat] = { [game]: { [answer]: sprint1 } };
      if (wordInfo[0].userWord.optional[dateFormat][game] === undefined) {
        sprint1 = 1;
        wordInfo[0].userWord.optional[dateFormat][game] = { [answer]: sprint1 };
        if (wordInfo[0].userWord.optional[dateFormat][game][answer] === undefined) {
          sprint1 = 1;
          wordInfo[0].userWord.optional[dateFormat][game][answer] = sprint1;
        }
      }
    } else sprint1 = Number(wordInfo[0].userWord.optional[dateFormat][game][answer]) + 1;
    wordInfo[0].userWord.optional[dateFormat][game][answer] = sprint1;
    // console.log(wordInfo[0].userWord.optional);
    if (sprint1 >= 2) {
      wordInfo[0].userWord.optional.isStadied = true;
      let countWords = await getStat(user.userId);
      // console.log(countWords);
      if (countWords === undefined) {
        countWords = 0;
      }
      await updateUserStat({
        userId: `${user.userId}`,
        count: countWords.learnedWords + 1,
      });
      // const stat = await getStat(user.userId);
      // console.log(stat);
    }
    const optionalWord = wordInfo[0].userWord.optional;
    await updateUserWord1({
      userId: `${user.userId}`,
      wordId: `${data.id}`,
      word: { optional: optionalWord },
    });
    // console.log(await getWord1(data.id));
  }
}

export async function addAnswerYes(right: Array<IWord>, point: number, data?: IWord) {
  const sprintGameScore = document.querySelector('.sprint__game__score');
  let bill = sprintGameScore?.innerHTML;
  if (data) {
    dailyStat('sprint', 'rigth', data);
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
