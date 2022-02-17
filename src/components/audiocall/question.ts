import { answersCount, baseURL } from '../consts';
import { IQuestion } from '../interfaces';

class Question {
  data: IQuestion;

  container: HTMLDivElement;

  isAnswered: boolean;

  constructor(data: IQuestion) {
    this.data = data;
    this.container = document.createElement('div');
    this.isAnswered = false;
  }

  render(): HTMLDivElement {
    this.container.classList.add('question');
    this.container.innerHTML = `
      <button type='button' class='question__listen'></button>
      <ul class='question__answers'>
      </ul>
    `;
    this.addAnswers();
    this.eventListeners();
    return this.container;
  }

  playAudio = () => {
    const audio = new Audio();
    audio.src = `${baseURL}/${this.data.word.audio}`;
    audio.play();
  };

  addAnswers(): void {
    const { answers } = this.data;
    answers.push(this.data.word.word);
    this.shuffleAnswers(answers).forEach((answer: string, index: number) => {
      const li = document.createElement('li');
      li.classList.add('question__answer');
      li.setAttribute('data-number', `${index + 1}`);
      li.textContent = `${index + 1}. ${answer}`;
      this.answersList.append(li);
    });
  }

  shuffleAnswers(answers: string[]): string[] {
    const copyAnswers: string[] = [...answers];
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyAnswers[i], copyAnswers[j]] = [copyAnswers[j] as string, copyAnswers[i] as string];
    }
    return copyAnswers;
  }

  get answersList(): HTMLUListElement {
    return this.container.querySelector('.question__answers') as HTMLUListElement;
  }

  get listenButton(): HTMLButtonElement {
    return this.container.querySelector('.question__listen') as HTMLButtonElement;
  }

  selectAnswerClick = (event: Event) => {
    if (this.isAnswered) return;
    if (!event.target || !event.currentTarget) return;
    const target = event.target as HTMLElement;
    if (target.tagName !== 'LI') return;
    this.checkAnswer(target);
  };

  selectAnswerKey = (event: KeyboardEvent) => {
    if (this.isAnswered) return;
    const { key } = event;
    if (Number(key) > 0 && Number(key) <= answersCount) {
      const answer = this.answersList.querySelector(`[data-number="${key}"]`) as HTMLElement;
      this.checkAnswer(answer);
    }
  };

  checkAnswer(answer: HTMLElement) {
    let isCorrect = false;
    if (answer.textContent?.includes(this.data.word.word)) {
      answer.classList.add('question__correct');
      isCorrect = true;
    } else {
      answer.classList.add('question__wrong');
      this.showCorrectAnswer();
    }
    this.isAnswered = true;
    const event = new CustomEvent('answer-question', {
      bubbles: true,
      detail: {
        word: this.data.word,
        correct: isCorrect,
      },
    });
    this.container.dispatchEvent(event);
  }

  showCorrectAnswer() {
    const answers = Array.from(this.answersList.querySelectorAll('.question__answer')) as HTMLLIElement[];
    answers
      .find((answer: HTMLLIElement) => answer.textContent?.includes(this.data.word.word))
      ?.classList.add('question__correct');
  }

  eventListeners() {
    this.answersList.addEventListener('click', this.selectAnswerClick);
    window.addEventListener('keyup', this.selectAnswerKey);
    this.listenButton.addEventListener('click', this.playAudio);
  }
}

export default Question;
