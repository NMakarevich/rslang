import { getWords, pageWords } from "./function";
import { SprintGame } from "./sprint_game";

export class SprintStart {
    draw() {
        const CAT_QUANTITY = 6;
        // const sprintContainer =  makeElem('<div class="sprint__container"></div>', 'div');
        const sprintContainer = document.createElement('div');
        sprintContainer.classList.add('sprint__container');
        // const sprintExit =  makeElem('<div class="sprint__exit"></div>', 'div');
        const sprintExit = document.createElement('div');
        sprintExit.classList.add('sprint__exit');
        // const sprintExitImg = makeElem('<img class="sprint__exit">', 'img');
        const sprintExitImg = document.createElement('img');
        sprintExitImg.classList.add('sprint__exit_img');
        // const sprintStart = makeElem('<img class="sprint__start">', 'div');
        const sprintStart = document.createElement('div');
        sprintStart.classList.add('sprint__start');
        const sptintStartContainer = document.createElement('div');
        sptintStartContainer.classList.add('sptint__start__container');
        const sprintStartTitle = document.createElement('div');
        sprintStartTitle.classList.add('sprint__start__title');
        sprintStartTitle.innerHTML = 'Спринт';
        const sprintStartDescription = document.createElement('p');
        sprintStartDescription.classList.add('sprint__start__description');
        sprintStartDescription.innerHTML = 'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову';
        const sprintCat = document.createElement('select');
        sprintCat.classList.add('sprint__cat');
        sprintCat.name = 'sprint__cat';
        sprintCat.id = 'sprint__cat';
        for (let i=0; i <= CAT_QUANTITY; i++) {
            const option = document.createElement('option');
            option.classList.add('sprint__cat__option');
            option.value = `${i+1}`;
            option.innerHTML = `Уровень ${i+1}`
            sprintCat.appendChild(option);
        }
        const sprintStartBtn = document.createElement('button');
        sprintStartBtn.classList.add('sprint__start__btn');
        sprintStartBtn.innerHTML = 'Начать';
        sprintStartBtn.onclick = async () => {
            
            sprintContainer.innerHTML = '';
            const arr = getWords(pageWords);
            sprintContainer.appendChild(new SprintGame().draw(await arr));
            
        }
        sptintStartContainer.appendChild(sprintStartTitle);
        sptintStartContainer.appendChild(sprintStartDescription);
        sptintStartContainer.appendChild(sprintCat);
        sptintStartContainer.appendChild(sprintStartBtn);
        sprintStart.appendChild(sptintStartContainer);
        sprintExit.appendChild(sprintExitImg);
        sprintContainer.appendChild(sprintExit);
        sprintContainer.appendChild(sprintStart);
        sptintStartContainer.append(sprintStartTitle, sprintStartDescription, sprintCat, sprintStartBtn)
    //     const sprintContainer = makeNode('<div class="sprint__container"></div>', 'div');
    // const sprintExit = makeNode('<div class="sprint__exit"></div>', 'div');
    // const sprintExitImg = makeNode('<img class="sprint__exit_img">', 'img');
    // const sprintStart = makeNode('<div class="sprint__start"></div>', 'div');
    // const sptintStartContainer = makeNode('<div class="sprint__start__container"></div>', 'div');
    // const sprintStartTitle = makeNode('<div class="sprint__start__title">Спринт</div>', 'div');
    // const sprintStartDescription = makeNode(
    //   `<p class="sprint__start__description">
    //         'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову';
    //     </p>`, 'p'
    // );
    // const sprintCat = makeNode('<select class="sprint__cat" name="sprint__cat" id="sprint__cat"></select>', 'select');
    // for (let i = 0; i <= CAT_QUANTITY; i++) {
    //   const option = makeNode(`<option class="sprint__cat__option value=${i + 1}">${i + 1}</option>`, 'option');
    //   sprintCat.appendChild(option);
    // }
    // const sprintStartBtn = makeNode('<button class="sprint__start__btn">Начать</button>', 'button');
    // sprintStartBtn.onclick = async () => {
    //   const arr = getWords(pageWords);
    //   sprintContainer.replaceWith(new SprintGame().draw(await arr));
    // };
    // sptintStartContainer.append(sprintStartTitle, sprintStartDescription, sprintCat, sprintStartBtn);
    // sprintStart.append(sptintStartContainer);
    // sprintExit.append(sprintExitImg);
    // sprintContainer.append(sprintExit, sprintStart);
    return sprintContainer;
        // return sprintContainer;
    }
}
