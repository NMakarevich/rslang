import { IWord } from "./interfaces/IWord";
import { WordResult } from "./word_result";

export class SprintResult {
    draw(rigth: Array<IWord>, wrong: Array<IWord>) {
        const sprintResult = document.createElement('div');
        sprintResult.classList.add('sprint__result');
        const sprintResultTitle = document.createElement('div');
        sprintResultTitle.classList.add('sprint__result__title');
        sprintResultTitle.innerHTML = 'Результат';
        const sprintResultText = document.createElement('div');
        sprintResultText.classList.add('sprint__result__text');
        sprintResultText.innerHTML = 'Знаю';
        const sprintResultList = document.createElement('div');
        sprintResultList.classList.add('sprint__result__list', 'sprint__result__list_yes');
        for (let i=0; i<rigth.length; i++) {
            const item = new WordResult().draw(rigth[i]!);
            sprintResultList.appendChild(item);
        }
        const sprintResultTextNo = document.createElement('div');
        sprintResultTextNo.classList.add('sprint__result__text');
        sprintResultTextNo.innerHTML = 'Не знаю';
        const sprintResultListNo = document.createElement('div');
        sprintResultListNo.classList.add('sprint__result__list', 'sprint__result__list_no');
        for (let i=0; i<wrong.length; i++) {
            const item = new WordResult().draw(wrong[i]!);
            sprintResultListNo.appendChild(item);
        }
        sprintResult.appendChild(sprintResultTitle);
        sprintResult.appendChild(sprintResultText);
        sprintResult.appendChild(sprintResultList);
        sprintResult.appendChild(sprintResultTextNo);
        sprintResult.appendChild(sprintResultListNo);
        return sprintResult;
    }
}
