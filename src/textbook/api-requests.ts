import { baseUrl, ICards } from './consts';

export async function getWords(page: number, group: number): Promise<ICards[]> {
  const response: Response = await fetch(`${baseUrl}/words?page=${page}&group=${group}`);
  const res = await response.json();
  return res;
}

export async function getWord(id: string): Promise<ICards> {
  const response: Response = await fetch(`${baseUrl}/words/${id}`);
  const res = await response.json();
  return res;
}
