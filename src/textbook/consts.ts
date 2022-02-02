export const textbookContainer = document.getElementById('textbook-container');

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
}