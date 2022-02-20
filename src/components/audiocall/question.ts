import { createUserWord, getUserStatistics, getUserWord, updateUserStatistics, updateUserWord } from '../api';
import { answersCount, baseURL, Difficulty, emptyUserWord } from '../consts';
import { ICards, IGamesStatistic, IGameStatistic, IQuestion, IStatistics } from '../interfaces';
import { localStorageUtil } from '../textbook/localStorageUtil';

class Question {
  data: IQuestion;

  container: HTMLDivElement;

  isAnswered: boolean;

  isLearned: boolean;

  constructor(data: IQuestion) {
    this.data = data;
    this.container = document.createElement('div');
    this.isAnswered = false;
    this.isLearned = false;
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
    answers.push(this.data.word);
    this.shuffleAnswers(answers).forEach((answer: ICards, index: number) => {
      const li = document.createElement('li');
      li.classList.add('question__answer');
      li.setAttribute('data-number', `${index + 1}`);
      li.textContent = `${index + 1}. ${answer.wordTranslate}`;
      this.answersList.append(li);
    });
  }

  shuffleAnswers(answers: ICards[]): ICards[] {
    const copyAnswers: ICards[] = [...answers];
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyAnswers[i], copyAnswers[j]] = [copyAnswers[j] as ICards, copyAnswers[i] as ICards];
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

  updateUserWord = async (wordId: string, answer: string) => {
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
    } else {
      delete userWord.id;
      delete userWord.wordId;
      userWord.optional.answers = `${userWord.optional.answers}${answer}`;
      if (userWord.optional.answers.includes('111') && userWord.difficulty !== Difficulty.learned) {
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
  };

  addAnswerToUserStatistics = async (game: string, answer: boolean, isLearned: boolean) => {
    const statistics = (await getUserStatistics()) as IStatistics;
    delete statistics.id;
    if (isLearned) statistics.learnedWords += 1;
    const date = new Date().toLocaleDateString('ru-RU').split('.').join('-');
    const gameKey = game as keyof IGamesStatistic;
    const gameArr = statistics.optional.games[gameKey];
    const dateIndex = gameArr.findIndex((item: IGameStatistic) => item.date === date) as number;
    if (dateIndex >= 0) {
      const dateObj = statistics.optional.games[gameKey][dateIndex] as IGameStatistic;
      if (answer) {
        dateObj.right += 1;
        const currentSequence = Number(localStorage.getItem('audiocallSequence')) + 1;
        localStorage.setItem('audiocallSequence', String(currentSequence));
      } else {
        dateObj.wrong += 1;
        const LSSequence = Number(localStorage.getItem('audiocallSequence'));
        if (LSSequence > dateObj.rightSequence) dateObj.rightSequence = LSSequence;
        localStorage.setItem('audiocallSequence', '0');
      }
      statistics.optional.games[gameKey][dateIndex] = dateObj;
    } else {
      statistics.optional.games[gameKey].push({
        date,
        wrong: answer ? 0 : 1,
        right: answer ? 1 : 0,
        rightSequence: 1,
      });
    }
    await updateUserStatistics(statistics);
  };

  async checkAnswer(answer: HTMLElement) {
    let isCorrect = false;
    if (answer.textContent?.includes(this.data.word.wordTranslate)) {
      answer.classList.add('question__correct');
      isCorrect = true;
    } else {
      answer.classList.add('question__wrong');
      this.showCorrectAnswer();
    }
    this.isAnswered = true;
    if (localStorageUtil.getUserInfo()) {
      const isLearned = await this.updateUserWord(this.data.word.id, `${isCorrect ? '1' : '0'}`);
      this.addAnswerToUserStatistics('audiocall', isCorrect, isLearned);
    }
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
      .find((answer: HTMLLIElement) => answer.textContent?.includes(this.data.word.wordTranslate))
      ?.classList.add('question__correct');
  }

  eventListeners() {
    this.answersList.addEventListener('click', this.selectAnswerClick);
    window.addEventListener('keyup', this.selectAnswerKey);
    this.listenButton.addEventListener('click', this.playAudio);
  }
}

export default Question;
