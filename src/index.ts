import './components/textbook/textbook.ts';
import './components/textbook/navigation.ts';
import './components/textbook/localStorageUtil.ts';
import './components/textbook/upButton.ts';

/*
import { localStorageUtil } from './components/textbook/localStorageUtil';

 export type User = {
  email: string,
  password: string
};

const loginUser = async (user: User) => {
  const rawResponse = await fetch('https://rslang-team32.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();
  localStorageUtil.putUserInfo(content);
  console.log(content);
};

loginUser({ email: 'lis@user.com', password: '11223344' });

*/
