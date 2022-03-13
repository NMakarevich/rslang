import { getWords } from '../api';
import { answersCount } from '../consts';
import { ICards, ICustomEvent, IDictionary, IQuestion } from '../interfaces';
import Question from './question';
import AudiocallResults from './results';

class GameScreen {
  dictionary: IDictionary;

  container: HTMLDivElement;

  questionNum: number;

  correctAnswers: ICards[];

  wrongAnswers: ICards[];

  words!: ICards[];

  constructor(dictionary: IDictionary) {
    this.dictionary = dictionary;
    this.container = document.createElement('div');
    this.questionNum = 1;
    this.correctAnswers = [];
    this.wrongAnswers = [];
  }

  async render(): Promise<HTMLDivElement> {
    this.container.classList.add('audiocall__container-game');
    this.container.innerHTML = '<button type="button" class="button__next" disabled>Далее</button>';
    this.words = await getWords(this.dictionary.page, this.dictionary.chapter);
    const firstQData = this.generateQuestionData();
    localStorage.setItem('audiocallSequence', '0');
    const question = new Question(firstQData);
    this.container.prepend(question.render());
    question.playAudio();
    this.eventListeners();
    return this.container;
  }

  generateQuestionData(questionNum: number = 0): IQuestion {
    const word = this.words[questionNum] as ICards;
    const answers: ICards[] = [];
    while (answers.length !== answersCount - 1) {
      const index = Math.floor(Math.random() * (this.words.length - 1));
      const answer = this.words[index] as ICards;
      if (index !== questionNum && !answers.includes(answer)) {
        answers.push(answer);
      }
    }
    const data: IQuestion = { word, answers };
    return data;
  }

  get nextButton(): HTMLButtonElement {
    return this.container.querySelector('.button__next') as HTMLButtonElement;
  }

  resultButton(): void {
    this.nextButton.classList.remove('next__button');
    this.nextButton.classList.add('button__results');
    this.nextButton.textContent = 'Показать результаты';
    this.nextButton.removeEventListener('click', this.nextQuestion);
    this.nextButton.addEventListener('click', () => {
      const results = new AudiocallResults(this.correctAnswers, this.wrongAnswers);
      this.container.replaceWith(results.render());
    });
  }

  nextQuestion = (): void => {
    const questionData = this.generateQuestionData(this.questionNum);
    const questionContainer = this.container.querySelector('.question') as HTMLDivElement;
    const question = new Question(questionData);
    questionContainer.replaceWith(question.render());
    this.nextButton.disabled = true;
    question.playAudio();
    this.questionNum += 1;
  };

  updateAnswersList = (event: Event) => {
    const detail = (<CustomEvent>event).detail as ICustomEvent;
    if (detail.correct) {
      this.correctAnswers.push(detail.word);
    } else {
      this.wrongAnswers.push(detail.word);
    }
    this.nextButton.disabled = false;
    if (this.questionNum === this.words.length - 1) {
      this.resultButton();
    }
    this.nextButton.focus();
  };

  eventListeners() {
    this.nextButton.addEventListener('click', this.nextQuestion);
    document.addEventListener('answer-question', this.updateAnswersList);
  }
}

export default GameScreen;
