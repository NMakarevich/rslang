import { ICards } from './consts';

export async function getWords(page, group): Promise<ICards[]> {
  const response: Response = await fetch(`https://rslang-team32.herokuapp.com/words?page=${page}&group=${group}`);
  const res = await response.json();
  return res;
}

export async function getWord(id): Promise<ICards> {
  const response: Response = await fetch(`https://rslang-team32.herokuapp.com/words/${id}`);
  const res = await response.json();
  return res;
}
