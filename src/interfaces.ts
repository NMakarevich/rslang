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
