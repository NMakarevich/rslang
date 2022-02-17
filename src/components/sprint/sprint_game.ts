import {
  addAnswerYes, audio, changeWord, setTimer, /* shuffle, */ addWords, dailyStat,
} from './function';

import { baseUrl } from '../textbook/consts';
import { IWord } from './interfaces/IWord';
import Word from './word';

class SprintGame {
  draw(data: Array<IWord>) {
    let arrWords = data;
    // console.log(arrWords);
    let count: number = 0;
    const right: Array<IWord> = [];
    const wrong: Array<IWord> = [];
    const sprintContainer = document.createElement('div');
    sprintContainer.classList.add('sprint__container');
    // const sprintExit = document.createElement('div');
    // sprintExit.classList.add('sprint__exit');
    // const sprintExitImg = document.createElement('img');
    // sprintExitImg.classList.add('sprint__exit_img');
    const sprintLevel = document.createElement('div');
    sprintLevel.classList.add('sprint__level');
    const sprintGame = document.createElement('div');
    sprintGame.classList.add('sprint__game');
    const sprintGameHead = document.createElement('div');
    sprintGameHead.classList.add('sprint__game__head');
    const sprintGameTimer = document.createElement('div');
    sprintGameTimer.classList.add('sprint__game__timer');
    (sprintContainer as HTMLElement).style.opacity = '0';
    sprintGameTimer.innerHTML = String(setTimer(right, wrong));
    const sprintGameScore = document.createElement('div');
    sprintGameScore.classList.add('sprint__game__score');
    sprintGameScore.innerHTML = '0';
    const sprintGameContainer = document.createElement('div');
    sprintGameContainer.classList.add('sprint__game__container');
    const sprintGameOptions = document.createElement('div');
    sprintGameOptions.classList.add('sprint__game__options');
    const sprintGameVoiceNone = document.createElement('div');
    sprintGameVoiceNone.classList.add('sprint__game__voice', 'none');
    const sprintGameVioceImg = document.createElement('div');
    sprintGameVioceImg.classList.add('sprint__game__vioce_img');
    const sprintGameVoice = document.createElement('div');
    sprintGameVoice.classList.add('sprint__game__voice');
    sprintGameVoice.onclick = () => {
      audio.play();
    };
    const sprintGameVioceImg1 = document.createElement('div');
    sprintGameVioceImg1.classList.add('sprint__game__vioce_img');
    const sprintGameExtrapoints = document.createElement('div');
    sprintGameExtrapoints.classList.add('sprint__game__extrapoints');
    const wordWrapper = document.createElement('div');
    wordWrapper.classList.add('sprint__word__container1');
    for (let i = 0; i < 3; i += 1) {
      const point = document.createElement('div');
      point.classList.add('sprint__game__point');
      sprintGameExtrapoints.appendChild(point);
    }
    let word: HTMLElement;
    const translation = Math.ceil(Math.random() * 19);
    if (arrWords[0]) {
      word = new Word().draw(arrWords[0], arrWords[translation]!);
      audio.src = `${baseUrl}/${arrWords[0].audio}`;
    } else word = document.createElement('div');
    let x: boolean;
    if (translation === count) {
      x = true;
    } else x = false;
    const sprintGameChoise = document.createElement('div');
    sprintGameChoise.classList.add('sprint__game__choise');
    const sprintGameVariantYes = document.createElement('div');
    sprintGameVariantYes.classList.add('sprint__game__variant', 'sprint__game__variant_yes');
    const sprintGameAnswerYes = document.createElement('div');
    sprintGameAnswerYes.classList.add('sprint__game__answer', 'sprint__game__answer_yes');
    sprintGameAnswerYes.innerHTML = 'Верно';
    const sprintGameAnswerIcon = document.createElement('div');
    sprintGameAnswerIcon.classList.add('sprint__game_answerIcon');
    const answerIconYes = document.createElement('div');
    answerIconYes.classList.add('answerIcon', 'answerIcon_yes');
    const sprintGameVariant = document.createElement('div');
    sprintGameVariant.classList.add('sprint__game__variant');
    const sprintGameAnswerNo = document.createElement('div');
    sprintGameAnswerNo.classList.add('sprint__game__answer', 'sprint__game__answer_no');
    sprintGameAnswerNo.innerHTML = 'Не верно';
    let point = 0;
    sprintGameVariant.onclick = async () => {
      if (!x) {
        if (point === 3) {
          point = 0;
        } point += 1;
        addAnswerYes(right, point, arrWords[count]);
      } else {
        dailyStat('sprint', 'wrong', arrWords[count]!);
        wrong.push(arrWords[count]!);
      }
      count += 1;
      // console.log(`count ${count}`);
      if (count === arrWords.length - 2) {
        arrWords = await addWords(arrWords);
      }
      x = changeWord(count, arrWords);
    };
    sprintGameVariantYes.onclick = async () => {
      if (x) {
        if (point === 3) {
          point = 0;
        } point += 1;
        addAnswerYes(right, point, arrWords[count]);
      } else {
        dailyStat('sprint', 'wrong', arrWords[count]!);
        wrong.push(arrWords[count]!);
      }
      // console.log(arrWords[count]);
      // console.log(wrong);
      count += 1;
      // console.log(`count ${count}`);
      if (count === arrWords.length - 2) {
        arrWords = await addWords(arrWords);
      }
      x = changeWord(count, arrWords);
    };
    const sprintGameAnswerIconNo = document.createElement('div');
    sprintGameAnswerIconNo.classList.add('sprint__game_answerIcon', 'sprint__game_answerIcon_no');
    const answerIconNo = document.createElement('div');
    answerIconNo.classList.add('answerIcon', 'answerIcon_no');
    sprintGameHead.appendChild(sprintGameTimer);
    sprintGameHead.appendChild(sprintGameScore);
    sprintGameVoiceNone.appendChild(sprintGameVioceImg);
    sprintGameVoice.appendChild(sprintGameVioceImg1);
    sprintGameOptions.appendChild(sprintGameVoiceNone);
    sprintGameOptions.appendChild(sprintGameExtrapoints);
    sprintGameOptions.appendChild(sprintGameVoice);
    sprintGameContainer.appendChild(sprintGameOptions);
    wordWrapper.appendChild(word);
    sprintGameContainer.appendChild(wordWrapper);
    sprintGameAnswerIcon.appendChild(answerIconYes);
    sprintGameAnswerIconNo.appendChild(answerIconNo);
    sprintGameVariantYes.appendChild(sprintGameAnswerYes);
    sprintGameVariantYes.appendChild(sprintGameAnswerIcon);
    sprintGameVariant.appendChild(sprintGameAnswerNo);
    sprintGameVariant.appendChild(sprintGameAnswerIconNo);
    sprintGameChoise.appendChild(sprintGameVariantYes);
    sprintGameChoise.appendChild(sprintGameVariant);
    sprintGameContainer.appendChild(sprintGameChoise);
    sprintGame.appendChild(sprintGameHead);
    sprintGame.appendChild(sprintGameContainer);
    // sprintExit.appendChild(sprintExitImg);
    // sprintContainer.appendChild(sprintExit);
    sprintContainer.appendChild(sprintLevel);
    sprintContainer.appendChild(sprintGame);
    document.addEventListener('keydown', async (event) => {
      if (event.key === 'ArrowLeft') {
        if (x) {
          if (point === 3) {
            point = 0;
          } point += 1;
          addAnswerYes(right, point, arrWords[count]);
        } else wrong.push(arrWords[count]!);
        count += 1;
        if (count === arrWords.length - 2) {
          arrWords = await addWords(arrWords);
        }
        x = changeWord(count, arrWords);
      }
      if (event.key === 'ArrowRight') {
        if (!x) {
          if (point === 3) {
            point = 0;
          } point += 1;
          addAnswerYes(right, point, arrWords[count]);
        } else wrong.push(arrWords[count]!);
        count += 1;
        if (count === arrWords.length - 2) {
          arrWords = await addWords(arrWords);
        }
        x = changeWord(count, arrWords);
      }
    });
    return sprintContainer;
  }
}

export default SprintGame;
