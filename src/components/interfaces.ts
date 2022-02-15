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

export type ICards = {
  audio: string;
  audioMeaning: string;
  audioExample: string;
  _id?: string;
  id?: string;
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
    difficulty: string,
    optional: {
      answers: string,
    }
  };
  listProps: Array<Object>;
};

export type IUserInfo = {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
};

export type createUserWordData = {
  userId: string,
  wordId: string,
  word?: object
};
