import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LoginFormMolecule from '../molecules/LoginFormMolecule';
import ButtonComponent from '../atoms/ButtonComponent';
import {BASE_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../../store/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [remindMeCheck, setRemindMeCheck] = useState(false);
  const dispatch = useDispatch();
  const tokenStore = useSelector((state: RootState) => state.token);

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

  const storeUserAsync = async user => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('Data successfully saved');
      return true;
    } catch (error) {
      console.log('Error saving data', error);
      return false;
    }
  };

  /**
   * Login user
   * @returns {Promise<void>}
   * @constructor
   *
   * Firs take user and password from inputs, then call API to login user
   * If user and password are correct, then save user in async storage (if remind me is checked) and token in redux
   * Then navigate to MyTabs screen
   */
  const doUserLogin = async () => {
    const usernameValue = user;
    const passwordValue = password;

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
          const userWithToken = {
            ...response.data.user,
            token: response.data.token,
          };

          //Save user in async storage
          if (remindMeCheck) {
            const log = storeUserAsync(userWithToken);
            console.log('log: ' + log);
          }
          //Save token with redux
          dispatch(setToken(response.data.token));

          navigation.navigate('MyTabsHome');
        } else {
          alert('Error');
          console.log('Error: ' + response.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const loadUserStorage = async () => {
    try {
      const userStorage = await AsyncStorage.getItem('user');
      console.log('loadUser: ' + userStorage);
      if (userStorage !== null) {
        const tokenUser: string = JSON.parse(userStorage).token;
        dispatch(setToken(tokenUser));
        navigation.navigate('MyTabs');
      }
    } catch (error) {
      console.log('loadToken: Error in display screen: ' + error.message);
    }
  };

  useEffect(() => {
    loadUserStorage();
  }, []);

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
        remindMeCheck={remindMeCheck}
        setRemindMeCheck={setRemindMeCheck}
      />

      <ButtonComponent
        onPress={() => navigation.navigate('SignUp')}
        text="Sign Up"
        style={styles.signUp}
        type="tertiary"
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
