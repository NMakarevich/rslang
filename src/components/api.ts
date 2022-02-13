import { baseURL } from '../consts';
import { IUser } from '../interfaces';

export async function registryUser(user: IUser): Promise<Response> {
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
