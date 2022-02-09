export const baseUrl = 'https://rslang-team32.herokuapp.com';
export const pagesAmount = 30;

export const authorization = {
  authorized: false,
};

export type ICards = {
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
  listProps: Array<Object>;
};

export type IUserInfo = {
  message: string,
  token: string,
  refreshToken: string,
  userId: string,
  name: string
};
