// import { ICreateUserWordData } from '../textbook/consts';
// import { getWords } from '../api-requests';
import {
  // eslint-disable-next-line max-len
  createUserWord, getUserStatistics, getUserWord, getWords, updateUserStatistics, updateUserWord,
} from '../api';
import { Difficulty, emptyUserWord } from '../consts';
import { ICards, IGameStatistic, IStatistics } from '../interfaces';
// import games from '../pages/games';
import { localStorageUtil } from '../textbook/localStorageUtil';
// eslint-disable-next-line import/no-cycle
import SprintResult from './sprint_results';
import Word from './word';

export const audio = new Audio();

export const pageWords = {
  group: 0,
  page: 0,
};

const baseUrl = 'https://rslang-team32.herokuapp.com';
export async function getStat(userId: string) {
  const { token } = localStorageUtil.getUserInfo();
  const response = await fetch(`${baseUrl}/users/${userId}/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  let data;
  if (response.ok) data = await response.json();
  return data;
}

// eslint-disable-next-line no-undef
let time: NodeJS.Timer
export function setTimer(right: Array<ICards>, wrong: Array<ICards>) {
  let second = 10;
  time = setInterval(() => {
    if (second >= 0) {
      const timerScore = document.querySelector('.sprint__game__timer');
      (document.querySelector('.sprint__container') as HTMLElement).style.opacity = '1';
      (timerScore as HTMLElement).innerHTML = `${second}`;
      second -= 1;
    } else {
      clearInterval(time);
      const container = document.querySelector('.sprint__container') as HTMLElement;
      container.appendChild(new SprintResult().draw(right, wrong));
    }
    return second;
  }, 1000);
}

export function changeWord(count: number, data: Array<ICards>) {
  console.log('count', count);
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

export function shuffle(array: Array<ICards>) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export async function addWords(arrWords: Array<ICards>) {
  let oldWords = arrWords;
  if (pageWords.group > 0) {
    pageWords.group -= 1;
    const newWords = shuffle(await getWords(pageWords.page, pageWords.group));
    oldWords = arrWords.concat(newWords);
    return oldWords;
  } return [];
}

export type createUserStat = {
  userId: string;
  count: number;
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

export async function wordStatistic(game: string, answer: string, data: ICards) {
  const date = new Date();
  const dateFormat = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  // const word = data.id;
  const user = localStorageUtil.getUserInfo();
  if (!user) return;
  const id1 = data.id;
  const wordInfo = await getUserWord(user?.userId, id1 as string);
  let answerCount = 1;
  console.log(wordInfo);
  if (!wordInfo) {
    await createUserWord({
      userId: `${user.userId}`,
      wordId: `${id1}`,
      word: { optional: { [dateFormat]: { [game]: { [answer]: 1 } } } },
    });
  } else {
    // eslint-disable-next-line max-len
    if (!wordInfo.optional[dateFormat]) {
      answerCount = 1;
      wordInfo.optional[dateFormat] = { [game]: { [answer]: answerCount } };
      if (!wordInfo.optional[dateFormat][game]) {
        answerCount = 1;
        wordInfo.optional[dateFormat][game] = { [answer]: answerCount };
        if (!wordInfo.optional[dateFormat][game][answer]) {
          answerCount = 1;
          wordInfo.optional[dateFormat][game][answer] = answerCount;
        }
      }
    }
    if (!wordInfo.optional[dateFormat][game]) {
      answerCount = 1;
      wordInfo.optional[dateFormat][game] = { [answer]: answerCount };
      if (!wordInfo.optional[dateFormat][game][answer]) {
        answerCount = 1;
        wordInfo.optional[dateFormat][game][answer] = answerCount;
      }
    } else answerCount = Number(wordInfo.optional[dateFormat][game][answer]) + 1;
    wordInfo.optional[dateFormat][game][answer] = answerCount;
    const optionalWord = wordInfo.optional;
    await updateUserWord({
      userId: `${user.userId}`,
      wordId: `${id1}`,
      word: { optional: optionalWord },
    });
    // console.log(await getWord1(data.id));
  }
}

async function updateUserWordLearnes(wordId: string, answer: string) {
  const { userId } = localStorageUtil.getUserInfo();
  let isLearned = false;
  const userWord = await getUserWord(userId, wordId);
  if (!userWord) {
    const emptyUWord = JSON.parse(JSON.stringify(emptyUserWord));
    emptyUWord.optional.answers = `${emptyUWord.optional.answers}${answer}`;
    await createUserWord({
      userId,
      wordId,
      word: emptyUWord,
    });
    // getNew();
  } else {
    delete userWord.id;
    delete userWord.wordId;
    userWord.optional.answers = `${userWord.optional.answers}${answer}`;
    if (userWord.optional.answers.includes('111')) {
      userWord.difficulty = Difficulty.learned;
      isLearned = true;
    }
    await updateUserWord({
      userId,
      wordId,
      word: userWord,
    });
  }
  return isLearned;
}

async function addAnswerToUserStatisticsSprint(answer: boolean, isLearned: boolean) {
  const statistics = (await getUserStatistics()) as IStatistics;
  delete statistics.id;
  console.log(statistics);
  if (isLearned) statistics.learnedWords += 1;
  const date = new Date().toLocaleDateString('ru-RU').split('.').join('-');
  const gameArr = statistics.optional.games.sprint;
  const dateIndex = gameArr.findIndex((item: IGameStatistic) => item.date === date) as number;
  // const answerString = answer ? 'right' : 'wrong';
  if (dateIndex >= 0) {
    // statistics.optional.games[game as keyof typeof statistics.optional][dateIndex][
    //   answerString as keyof IGameStatistic
    // ] += 1;
    const dateObj = statistics.optional.games.sprint[dateIndex] as IGameStatistic;
    if (answer) {
      dateObj.right += 1;
    } else dateObj.wrong += 1;
    statistics.optional.games.sprint[dateIndex] = dateObj;
  } else {
    statistics.optional.games.sprint.push({
      date,
      wrong: answer ? 0 : 1,
      right: answer ? 1 : 0,
      rightSequence: 0,
      // newWords: 0,
    });
  }
  await updateUserStatistics(statistics);
}

// addAnswerToUserStatistics(true, true);
export async function addAnswerYes(right: Array<ICards>, point: number, data?: ICards) {
  const sprintGameScore = document.querySelector('.sprint__game__score');
  let bill = sprintGameScore?.innerHTML;
  if (data) {
    
    // wordStatistic('sprint', 'rigth', data);
    if (localStorageUtil.checkAuthorization()) {
      const isLearned = await updateUserWordLearnes(data.id, '1');
      addAnswerToUserStatisticsSprint(true, isLearned);
    }
    right.push(data);
    console.log(right);
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
  }
  (points[point - 1] as HTMLElement).classList.add('sprint__game__point_activ');
  setTimeout(() => sprintGameScore?.classList.remove('sprint__game__score_activ'), 1000);
}

export async function addAnswerNo(wrong: Array<ICards>, data?: ICards) {
  if (data) {
    const isLearned = await updateUserWordLearnes(data.id, '0');
    if (localStorageUtil.checkAuthorization()) {
      addAnswerToUserStatisticsSprint(false, isLearned);
    }
    wrong.push(data);
    console.log(wrong);
  }
}

export async function rigthSeries(rigth: Array<ICards>) {
  const statistics = await getUserStatistics() as IStatistics;
  delete statistics.id;
  console.log(statistics);
  const rightSequence = statistics.optional.games.sprint.filter(((item) => item.date === new Date().toLocaleDateString('ru-RU').split('.').join('-')));
  if (rightSequence[0]!.rightSequence < rigth.length) {
    rightSequence[0]!.rightSequence = rigth.length;
  } else rightSequence[0]!.rightSequence = rigth.length;
  updateUserStatistics(statistics);
}

export async function getPercent() {
  // if (localStorageUtil.checkAuthorization()) {
    const statistics = await getUserStatistics() as IStatistics;
    delete statistics.id;
    const rightSequence = statistics.optional.games.sprint.filter(((item) => item.date === new Date().toLocaleDateString('ru-RU').split('.').join('-')));
    if (rightSequence[0]) {
      const rightWords = rightSequence[0].right;
      const wrongWords = rightSequence[0].wrong;
      const percentWords = `${Math.round((rightWords / (rightWords + wrongWords)) * 100)}%`;
      return percentWords;
    } return '0';
  // } return 'Зарегистрируйтесь чтобы получить статистику';
}

export async function gerSeries() {
  // if (localStorageUtil.checkAuthorization()) {
    const series = await getUserStatistics() as IStatistics;
    const rightSequence = series.optional.games.sprint.filter(((item) => item.date === new Date().toLocaleDateString('ru-RU').split('.').join('-')));
    if (rightSequence[0]) {
      return rightSequence[0].rightSequence;
    } return 0;
  // } return 
}

// export async function getNew() {
//   const statistics = await getUserStatistics() as IStatistics;
//   delete statistics.id;
//   console.log(statistics);
//   const day = new Date().toLocaleDateString('ru-RU').split('.').join('-');
//   const rightSequence = statistics.optional.games.sprint.filter(((item) => item.date === day));
//   if (rightSequence[0]!.newWords) {
//     statistics.optional.games.sprint.newWords += 1; 
//   } else rightSequence[0]!.newWords = 1; 
//   console.log(statistics);
//   console.log(rightSequence);
  
//   //   rightSequence[0]!.rightSequence = rigth.length;
//   // } else rightSequence[0]!.rightSequence = rigth.length;
//   updateUserStatistics(statistics);
// }

