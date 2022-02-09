import { addAnswerNo, addAnswerYes, changeWord, setTimer } from "./function";
import { IWord } from "./interfaces/IWord";
import { Word } from "./word";

export class SprintGame {
    draw(data: Array<IWord>) {
        let count: number = 0;
        let right: Array<IWord> = [];
        let wrong: Array<IWord> = [];
        console.log(data[count]);
        const sprintContainer = document.createElement('div');
        sprintContainer.classList.add('sprint__container');
        const sprintExit = document.createElement('div');
        sprintExit.classList.add('sprint__exit');
        const sprintExitImg = document.createElement('img');
        sprintExitImg.classList.add('sprint__exit_img');
        const sprintLevel = document.createElement('div');
        sprintLevel.classList.add('sprint__level');
        const sprintGame = document.createElement('div');
        sprintGame.classList.add('sprint__game');
        const sprintGameHead = document.createElement('div');
        sprintGameHead.classList.add('sprint__game__head');
        const sprintGameTimer = document.createElement('div');
        sprintGameTimer.classList.add('sprint__game__timer');
        sprintContainer.style.opacity = '0';
        // sprintGameTimer.innerHTML = '60';
        sprintGameTimer.innerHTML = String(setTimer(right, wrong));
        const sprintGameScore = document.createElement('div');
        sprintGameScore.classList.add('sprint__game__score');
        sprintGameScore.innerHTML = '100';
        const sprintGameContainer = document.createElement('div');
        sprintGameContainer.classList.add('sprint__game__container');
        const sprintGameOptions = document.createElement('div');
        sprintGameOptions.classList.add('sprint__game__options');
        const sprintGameVoiceNone = document.createElement('div');
        sprintGameVoiceNone.classList.add('sprint__game__voice', 'none');
        const sprintGameVioceImg = document.createElement('img');
        // sprintGameVioceImg.src = './assets/svg/volume.svg';
        sprintGameVioceImg.classList.add('sprint__game__vioce_img');
        const sprintGameVoice = document.createElement('div');
        sprintGameVoice.classList.add('sprint__game__voice');
        const sprintGameVioceImg1 = document.createElement('img');
        sprintGameVioceImg1.classList.add('sprint__game__vioce_img');
        // sprintGameVioceImg1.src = './assets/svg/volume.svg';
        const sprintGameExtrapoints = document.createElement('div');
        sprintGameExtrapoints.classList.add('sprint__game__extrapoints');
        const wordWrapper = document.createElement('div');
        wordWrapper.classList.add('sprint__word__container1');
        for (let i=0; i<3; i++) {
            const point = document.createElement('div');
            point.classList.add('sprint__game__point'); 
            sprintGameExtrapoints.appendChild(point);
        }
        let word: HTMLElement;
        let translation = Math.ceil(Math.random() * 19 + 1) ;
        if (data[0]) {
            word = new Word().draw(data[0], data[translation]!);
        } else word = document.createElement('div');
        
        const sprintGameChoise = document.createElement('div');
        sprintGameChoise.classList.add('sprint__game__choise');
        const sprintGameVariantYes = document.createElement('div');
        sprintGameVariantYes.classList.add('sprint__game__variant', 'sprint__game__variant_yes');
        const sprintGameAnswerYes = document.createElement('div');
        sprintGameAnswerYes.classList.add('sprint__game__answer', 'sprint__game__answer_yes');
        sprintGameAnswerYes.innerHTML = 'Верно';
        const sprintGameAnswerIcon = document.createElement('div');
        sprintGameAnswerIcon.classList.add('sprint__game_answerIcon');
        const answerIconYes = document.createElement('img');
        answerIconYes.classList.add('answerIcon','answerIcon_yes');
        // answerIconYes.src = '../assets/svg/left.svg';
        const sprintGameVariant = document.createElement('div');
        sprintGameVariant.classList.add('sprint__game__variant');
        const sprintGameAnswerNo = document.createElement('div');
        sprintGameAnswerNo.classList.add('sprint__game__answer', 'sprint__game__answer_no');
        sprintGameAnswerNo.innerHTML = 'Не верно';
        sprintGameVariant.onclick = () => {
            wrong.push(data[count]!);
            console.log(wrong);
            
            addAnswerNo(count);
            count = count+1;
            changeWord(count, word, data);
        }
        sprintGameVariantYes.onclick = () => {
            right.push(data[count]!)
            addAnswerYes(count);
            console.log(right);
            count = count + 1;
            changeWord(count, word, data);
            
            // return new SprintGame
        }
        const sprintGameAnswerIconNo = document.createElement('div');
        sprintGameAnswerIconNo.classList.add('sprint__game_answerIcon','sprint__game_answerIcon_no');
        const answerIconNo = document.createElement('img');
        // answerIconNo.src = './assets/svg/right.svg';
        answerIconNo.classList.add('answerIcon','answerIcon_no');   

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
        sprintExit.appendChild(sprintExitImg);
        sprintContainer.appendChild(sprintExit);
        sprintContainer.appendChild(sprintLevel);
        sprintContainer.appendChild(sprintGame);
        return sprintContainer;
    }
}
