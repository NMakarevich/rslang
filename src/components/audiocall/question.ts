import { createUserWord, getUserStatistics, getUserWord, updateUserWord } from '../api';
import { answersCount, baseURL, Difficulty, emptyUserWord } from '../consts';
import { ICards, IGameStatistic, IQuestion, IStatistics } from '../interfaces';
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

  async updateUserWord(wordId: string, answer: string) {
    const { userId } = localStorageUtil.getUserInfo();
    const userWord = await getUserWord(userId, wordId);
    console.log('1', userWord);
    if (!userWord) {
      const emptyUWord = JSON.parse(JSON.stringify(emptyUserWord));
      emptyUWord.optional.answers = `${emptyUWord.optional.answers}${answer}`;
      console.log('2', emptyUWord);
      await createUserWord({
        userId,
        wordId,
        word: emptyUWord,
      });
    } else {
      delete userWord.id;
      delete userWord.wordId;
      console.log('3', userWord);
      userWord.optional.answers = `${userWord.optional.answers}${answer}`;
      if (userWord.optional.answers.includes('111')) {
        userWord.difficulty = Difficulty.learned;
        this.isLearned = true;
      }
      console.log('4', userWord);
      await updateUserWord({
        userId,
        wordId,
        word: userWord,
      });
    }
  }

  async addAnswerToUserStatistics(answer: boolean, isLearned: boolean) {
    const statistics = (await getUserStatistics()) as IStatistics;
    if (isLearned) statistics.learnedWords += 1;
    const date = new Date().toLocaleDateString('ru-RU').split('.').join('-');
    const gameArr = statistics.optional.audiocall;
    const dateIndex = gameArr.findIndex((item: IGameStatistic) => item.date === date) as number;
    // const answerString = answer ? 'right' : 'wrong';
    if (dateIndex >= 0) {
      // statistics.optional[game as keyof typeof statistics.optional][dateIndex][
      //   answerString as keyof IGameStatistic
      // ] += 1;
      const dateObj = statistics.optional.audiocall[dateIndex] as IGameStatistic;
      if (answer) {
        dateObj.right += 1;
      } else dateObj.wrong += 1;
      statistics.optional.audiocall[dateIndex] = dateObj;
    } else {
      statistics.optional.audiocall.push({
        date,
        wrong: answer ? 0 : 1,
        right: answer ? 1 : 0,
        rightSequence: 0,
      });
    }
  }

  checkAnswer(answer: HTMLElement) {
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
      this.updateUserWord(this.data.word.id, `${isCorrect ? '1' : '0'}`);
      // this.addAnswerToUserStatistics(isCorrect, this.isLearned);
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
