import {
  IUser, ICards, ICreateUserWordData, IStatistics, ISignIn,
} from './interfaces';
import { baseURL, emptyUserStatistics } from './consts';
import { localStorageUtil } from './textbook/localStorageUtil';

export async function registrationUser(user: IUser): Promise<Response> {
  const response = await fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response;
}

export async function signIn(user: IUser): Promise<Response> {
  const response = await fetch(`${baseURL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response;
}

export async function updateToken(): Promise<void> {
  const { refreshToken, userId } = localStorageUtil.getUserInfo();
  const response = await fetch(`${baseURL}/users/${userId}/tokens`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
    },
  });
  const userData: ISignIn = await response.json();
  localStorageUtil.putUserInfo(userData);
}

export async function getWords(page: number, group: number): Promise<ICards[]> {
  let res: ICards[];
  if (localStorageUtil.checkAuthorization()) {
    const { token } = localStorageUtil.getUserInfo();
    const { userId } = localStorageUtil.getUserInfo();
    const response: Response = await fetch(
      `${baseURL}/users/${userId}/aggregatedWords?page=${page}&group=${group}&wordsPerPage=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );
    const data = await response.json();
    res = await data[0].paginatedResults;
  } else {
    const response: Response = await fetch(`${baseURL}/words?page=${page}&group=${group}&wordsPerPage=20`);
    res = await response.json();
  }

  return res;
}

export async function getWord(id: string): Promise<ICards> {
  const response: Response = await fetch(`${baseURL}/words/${id}`);
  const res = await response.json();
  return res;
}

export const createUserWord = async ({ userId, wordId, word }: ICreateUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  const a = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const b = await a.json();
  console.log(b);
};

export const updateUserWord = async ({ userId, wordId, word }: ICreateUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
};

export const getUserWord = async (userId: string, wordId: string) => {
  const { token } = localStorageUtil.getUserInfo();
  const res = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 404) return null;
  const data = await res.json();
  return data;
};

export const deleteUserWord = async ({ userId, wordId }: ICreateUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export async function getUserHardWords(): Promise<ICards[]> {
  const { token } = localStorageUtil.getUserInfo();
  const { userId } = localStorageUtil.getUserInfo();
  const response: Response = await fetch(
    `${baseURL}/users/${userId}/aggregatedWords?&wordsPerPage=3600&filter=%7B%22$or%22:[%7B%22userWord.difficulty%22:%22hard%22%7D]%7D`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  const res = await response.json();
  return res[0].paginatedResults;
}

export async function getUserStudiedWords(): Promise<ICards[]> {
  const { token } = localStorageUtil.getUserInfo();
  const { userId } = localStorageUtil.getUserInfo();
  const response: Response = await fetch(
    `${baseURL}/users/${userId}/aggregatedWords?&wordsPerPage=3600&filter=%7B%22$or%22:[%7B%22userWord.difficulty%22:%22easy%22%7D]%7D`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  const res = await response.json();
  // console.log(res);
  return res[0].paginatedResults;
}

export async function updateUserStatistics(statistics: IStatistics) {
  const { token, userId } = localStorageUtil.getUserInfo();

  const res = await fetch(`${baseURL}/users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });
  const a = await res.json();
  console.log(a);
}

export async function getUserStatistics(): Promise<IStatistics | undefined> {
  if (!localStorageUtil.checkAuthorization()) return undefined;
  const { token, userId } = localStorageUtil.getUserInfo();
  const request: Response = await fetch(`${baseURL}/users/${userId}/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (request.status === 404) {
    await updateUserStatistics(emptyUserStatistics);
  }
  if (request.status === 401) await updateToken();
  const response: IStatistics = await request.json();
  return response;
}
