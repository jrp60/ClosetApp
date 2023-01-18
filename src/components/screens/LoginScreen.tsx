import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LoginFormMolecule from '../molecules/LoginFormMolecule';
import ButtonComponent from '../atoms/ButtonComponent';
import {BASE_API_URL} from '@env';
//import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

//TODO - Add remember me(locally) field
//TODO - If checked remember me, save it in asyncstorage
//TODO - first of all, try to get user from asyncstorage, if remebmer me is true and user is not null
//TODO - do the login automatically and go to home screen
//TODO - if remember me is false, go to login screen

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const validateUser = () => {
    if (user !== '' && password !== '') {
      doUserLogin();
    } else {
      alert('Insert user and password');
    }
  };

  //TODO - Implementar
  const forgotPassword = () => {
    alert('Forgot password');
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const storeUserAsync = async user => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log('Error saving data', error);
    }
  };

  const doUserLogin = async () => {
    const usernameValue = user;
    const passwordValue = password;

    //was 'await' instead of 'return'
    await fetch(`${BASE_API_URL}login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: usernameValue,
        password: passwordValue,
        mobile_device: 'mobile',
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log('responseJson :', response);

        if (response.status == 200) {
          //TODO - not sure if is data.user (change in laravel to fix it)
          const userWithToken = {
            ...response.data.user,
            token: response.data.token,
          };
          console.log('userWithToken: ' + JSON.stringify(userWithToken));

          //SecureStore.setItemAsync('user', JSON.stringify(userWithToken));
          //AsyncStorage.setItem('user', JSON.stringify(userWithToken));
          storeUserAsync(userWithToken)
            .then(() => {
              console.log('User saved');
              navigation.navigate('DisplayScreen');
            })
            .catch(error => {
              console.log('Error saving user', error);
            });
          //navigation.navigate('DisplayScreen');
          console.log('Message 2: ' + response.data.message);
          console.log('status 2: ' + response.status);
          console.log('user 2: ' + JSON.stringify(response.data.user));
        } else {
          alert('Error');
          console.log('Error: ' + response.message);
          console.log('Response status: ' + response.status);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <LoginFormMolecule
        style={styles.loginForm}
        onChangeTextUser={setUser}
        onChangeTextPass={setPassword}
        userValue={user}
        passValue={password}
        validateUser={validateUser}
        forgotPassword={forgotPassword}
      />

      <ButtonComponent
        onPress={() => navigation.navigate('SignUp')}
        text="¿No tienes cuenta? Crear una"
        style={styles.signUp}
        type="tertiary"
        //style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    width: '80%',
    marginVertical: 5,
  },
  signUp: {},
  image: {
    width: '70%',
    maxWidth: 300,
    height: 160,
    padding: 10,
    margin: 10,
  },
});

export default LoginScreen;
