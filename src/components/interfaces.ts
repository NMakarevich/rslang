import { Difficulty } from './consts';

export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IRegistry {
  email: string;
  id: string;
  name: string;
}

export interface ISignIn {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface ICards {
  audio: string;
  audioMeaning: string;
  audioExample: string;
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: {
    difficulty: string;
    optional: {
      answers: string;
    };
  };
  listProps: Array<Object>;
}

export interface ICreateUserWordData {
  userId: string;
  wordId: string;
  word?: object;
}

export interface IDictionary {
  chapter: number;
  page: number;
}

export interface IQuestion {
  word: ICards;
  answers: ICards[];
}

export interface ICustomEvent {
  word: ICards;
  correct: boolean;
}

export interface IUserWord {
  difficulty: Difficulty;
  optional: {
    answers: string;
  };
  id?: string;
  wordId?: string;
}

export interface IGameStatistic {
  date: string;
  right: number;
  wrong: number;
  rightSequence: number;
}

export interface IGamesStatistic {
  sprint: IGameStatistic[];
  audiocall: IGameStatistic[];
}

export interface IStatistics {
  id?: string;
  learnedWords: number;
  optional: {
    games: IGamesStatistic;
  };
}
