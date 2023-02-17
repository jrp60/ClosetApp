import {BASE_API_URL_IOS} from '@env';
import {BASE_API_URL_ANDROID} from '@env';
import {Platform} from 'react-native';
const uri = Platform.OS === 'ios' ? BASE_API_URL_IOS : BASE_API_URL_ANDROID;

export const postLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${uri}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: `{"email":"${username}","password":"${password}","mobile_device":"mobile"}`,
      // body: JSON.stringify({
      //   email: usernameValue,
      //   password: passwordValue,
      //   mobile_device: 'mobile',
      // }),
    });
    const data = await response.json();
    if (data.status == 200) {
      return data;
    } else {
      console.log('Error: ' + data.message);
      return data;
    }
  } catch (error) {
    console.log('Error login');

    console.error(error);
  }
};

export const postRegister = async (
  username: string,
  password: string,
  email: string,
) => {
  try {
    console.log('registrandooo');

    const response = await fetch(`${uri}register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: `{"email":"${email}","password":"${password}","name":"${username}"}`,
      // check if works with the previous body
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      return data;
    } else {
      console.log('Error: ' + data.message);
      return data;
    }
  } catch (error) {
    console.log('Error register');

    console.error(error);
  }
};
