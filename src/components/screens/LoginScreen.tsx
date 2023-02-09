import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LoginFormMolecule from '../molecules/LoginFormMolecule';
import ButtonComponent from '../atoms/ButtonComponent';
import {BASE_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../../store/tokenSlice';
import {setUser} from '../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';
import {User} from '../../store/userSlice';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remindMeCheck, setRemindMeCheck] = useState(false);
  const dispatch = useDispatch();
  const tokenStore = useSelector((state: RootState) => state.token);

  const validateUser = () => {
    if (username !== '' && password !== '') {
      doUserLogin();
    } else {
      alert('Insert user and password');
    }
  };

  //TODO - Implementar
  const forgotPassword = () => {
    alert('Forgot password');
  };

  const storeUserAsync = async (user: User) => {
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
    const usernameValue = username;
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
      .then(async response => {
        console.log('responseJson :', response);

        if (response.status == 200) {
          const userState: User = {
            ...response.data.user,
            token: response.data.token,
            remember_session: remindMeCheck,
          };

          //Save user in async storage
          //TODO  add await?
          if (remindMeCheck) {
            const log = await storeUserAsync(userState).then(() => {
              console.log('User saved in async storage');
            });
            console.log('log: ' + log);
            console.log(log);
          }
          //Save user with redux
          dispatch(setUser(userState));

          //Save token with redux
          dispatch(setToken(response.data.token));

          //Clean inputs
          setUsername('');
          setPassword('');
          setRemindMeCheck(false);

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
        //dispatch(setToken(tokenUser));
        dispatch(setUser(JSON.parse(userStorage)));
        //TODO - dispatch user to store
        navigation.navigate('MyTabsHome');
      }
    } catch (error: any) {
      console.log('loadToken: Error in display screen: ' + error.message);
    }
  };

  useEffect(() => {
    loadUserStorage();
    console.log('username: ' + username);
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
        onChangeTextUser={setUsername}
        onChangeTextPass={setPassword}
        userValue={username}
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
