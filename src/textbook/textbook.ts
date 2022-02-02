import './textbook.scss';
import { textbookContainer, ICards } from './consts';

async function getWords(): Promise<ICards[]>{
  const response: Response = await fetch('https://rslang-team32.herokuapp.com/words?page=1&group=0');
  return await response.json();

}

class Cards {
  render() {
    let html = ''
    let data: ICards[];
    (async () => {
      data = (await getWords());
    })().then(() => {
      data.forEach((card: ICards) => {
        html += `<li class="word-card">
                  <div class="content-wrapper">
                      <div class="word-wrapper">
                             <span class="word">${card.word}</span>
                             <span class="word-transcription">${card.transcription}</span>
                             <span class="word-translate">${card.wordTranslate}</span> 
                      </div>
                      <p class="word-title">Значение:</p>
                      <div>${card.textMeaning}</div>
                      <div>${card.textMeaningTranslate}</div>
                      <p class="word-title">Пример:</p>
                      <div>${card.textExample}</div>
                      <div>${card.textExampleTranslate}</div>
                  </div>
                  <div><img class="word-image" src="https://rslang-team32.herokuapp.com/${card.image}" alt=""></div>
                </li>`;
      });
    })
      .then(() => {
        if (!textbookContainer) return;
        textbookContainer.innerHTML = `<ul class = "words-list">${html}</ul>`;
      })
  }
}
const cards = new Cards();
cards.render();

