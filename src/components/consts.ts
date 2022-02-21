import { IStatistics, IUserWord } from './interfaces';

export const baseURL = 'https://rslang-team32.herokuapp.com';
export const pagesAmount = 30;
export const wordsPerPage = 20;
export const chapterDifficult = 6;
export const answersCount = 5;

export enum Difficulty {
  'new' = 'new',
  'hard' = 'hard',
  'learned' = 'learned',
}

export const emptyUserWord: IUserWord = {
  difficulty: Difficulty.new,
  optional: {
    answers: '',
  },
};

export const emptyUserStatistics: IStatistics = {
  learnedWords: 0,
  optional: {
    games: {
      sprint: [
        {
          date: new Date().toLocaleDateString('ru-RU').split('.').join('-'),
          wrong: 0,
          right: 0,
          rightSequence: 0,
        },
      ],
      audiocall: [
        {
          date: new Date().toLocaleDateString('ru-RU').split('.').join('-'),
          wrong: 0,
          right: 0,
          rightSequence: 0,
        },
      ],
    }
  },
};
