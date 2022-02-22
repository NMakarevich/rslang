import { IUser, ICards, ICreateUserWordData, IStatistics, ISignIn } from './interfaces';
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
  if (response.status === 403) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
    return;
  }
  const userData: ISignIn = await response.json();
  const userInfo: ISignIn = localStorageUtil.getUserInfo();
  userInfo.token = userData.token;
  userInfo.refreshToken = userData.refreshToken;
  localStorageUtil.putUserInfo(userInfo);
}

export async function getWords(page: number, group: number): Promise<ICards[]> {
  let res: ICards[];
  if (localStorageUtil.checkAuthorization()) {
    const { token } = localStorageUtil.getUserInfo();
    const { userId } = localStorageUtil.getUserInfo();
    const response: Response = await fetch(
      `${baseURL}/users/${userId}/aggregatedWords?&filter={"$and": [{"group": ${group}}, {"page": ${page}}]}&wordsPerPage=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    if (response.status === 401) {
      const event = new CustomEvent('logout');
      document.dispatchEvent(event);
    }
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
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
  const res = await response.json();
  return res;
}

export const createUserWord = async ({ userId, wordId, word }: ICreateUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  const response = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
};

export const updateUserWord = async ({ userId, wordId, word }: ICreateUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  const response = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
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
  if (res.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
  if (res.status === 404) return null;
  const data = await res.json();
  return data;
};

export const deleteUserWord = async ({ userId, wordId }: ICreateUserWordData) => {
  const { token } = localStorageUtil.getUserInfo();
  const response = await fetch(`${baseURL}/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
};

export async function getUserHardWords(): Promise<ICards[]> {
  const { token } = localStorageUtil.getUserInfo();
  const { userId } = localStorageUtil.getUserInfo();
  const response: Response = await fetch(
    `${baseURL}/users/${userId}/aggregatedWords?&wordsPerPage=3600&filter={"$and":[{"userWord.difficulty":"hard"}]}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
  const res = await response.json();
  return res[0].paginatedResults;
}

export async function getUserStudiedWords(): Promise<ICards[]> {
  const { token } = localStorageUtil.getUserInfo();
  const { userId } = localStorageUtil.getUserInfo();
  const response: Response = await fetch(
    `${baseURL}/users/${userId}/aggregatedWords?&wordsPerPage=3600&filter={"$and":[{"userWord.difficulty":"learned"}]}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
  const res = await response.json();
  return res[0].paginatedResults;
}

export async function updateUserStatistics(statistics: IStatistics) {
  const { token, userId } = localStorageUtil.getUserInfo();
  const response = await fetch(`${baseURL}/users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
}

export async function getUserStatistics(): Promise<IStatistics | undefined> {
  if (!localStorageUtil.checkAuthorization()) return undefined;
  const { token, userId } = localStorageUtil.getUserInfo();
  const response: Response = await fetch(`${baseURL}/users/${userId}/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (response.status === 404) {
    await updateUserStatistics(emptyUserStatistics);
  }
  if (response.status === 401) {
    const event = new CustomEvent('logout');
    document.dispatchEvent(event);
  }
  const res: IStatistics = await response.json();
  return res;
}
