import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LoginFormMolecule from '../molecules/LoginFormMolecule';
import ButtonComponent from '../atoms/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../../store/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../../store/userSlice';
import axios from 'axios';
import {postLogin} from '../../services/AuthService';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remindMeCheck, setRemindMeCheck] = useState(false);
  const dispatch = useDispatch();

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

    postLogin(usernameValue, passwordValue)
      .then(response => {
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
            const log = storeUserAsync(userState).then(() => {
              console.log('User saved in async storage');
            });
          }
          //Save user with redux
          dispatch(setUser(userState));

          //Clean inputs
          setUsername('');
          setPassword('');
          setRemindMeCheck(false);
        } else {
          alert(response.message);
          console.log('Error: ' + response.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
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

  const loadUserStorage = async () => {
    try {
      const userStorage = await AsyncStorage.getItem('user');
      console.log('loadUser: ' + userStorage);
      if (userStorage !== null) {
        dispatch(setUser(JSON.parse(userStorage)));
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

// await axios
//   .post(
//     `${BASE_API_URL}login`,
//     {
//       email: usernameValue,
//       password: passwordValue,
//       mobile_device: 'mobile',
//     },
//     {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     },
//   )
//   .then(async response => {
//     console.log('responseJson :', response);
//     return response.data;
//   })
//   .then(async response => {
//     console.log('responseJson :', response);

//     if (response.status == 200) {
//       const userState: User = {
//         ...response.data.user,
//         token: response.data.token,
//         remember_session: remindMeCheck,
//       };

//       //Save user in async storage
//       if (remindMeCheck) {
//         const log = await storeUserAsync(userState).then(() => {
//           console.log('User saved in async storage');
//         });
//         console.log('log: ' + log);
//         console.log(log);
//       }
//       //Save user with redux
//       dispatch(setUser(userState));

//       //Save token with redux
//       dispatch(setToken(response.data.token));

//       //Clean inputs
//       setUsername('');
//       setPassword('');
//       setRemindMeCheck(false);

//       //navigation.navigate('MyTabsHome');
//     } else {
//       alert('User or password incorrect');
//     }
//   })
//   .catch(error => {
//     console.log('error: ' + error);
//     alert(error);
//   });
