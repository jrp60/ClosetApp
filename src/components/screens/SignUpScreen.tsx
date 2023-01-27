import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import TextComponent from '../atoms/TextComponent';
import TextInputComponent from '../atoms/TextInputComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import {BASE_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../../store/tokenSlice';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';

const SignUpScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const tokenStore = useSelector((state: RootState) => state.token);

  const validatePassword = () => {
    if (password !== passwordConfirm) {
      Alert.alert('Passwords do not match');
    } else {
      return true;
    }
  };

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      Alert.alert('Email is not correct');
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  };

  //TODO - Add async?
  const signUpValidation = () => {
    if (user != '' && email != '' && password != '' && passwordConfirm != '') {
      if (validateEmail(email)) {
        doUserRegistration();
      }
    } else {
      Alert.alert('Fill up all fields');
    }
  };

  const doUserRegistration = async () => {
    console.log('Registrando usuario');
    await fetch(`${BASE_API_URL}register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user,
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log('Usuario registrado');
          //Save token with redux
          dispatch(setToken(responseJson.data.token));
          navigation.navigate('MyTabsHome');
        } else {
          for (const error in responseJson.errors) {
            if (responseJson.errors.hasOwnProperty(error)) {
              Alert.alert(error, responseJson.errors[error][0]);
            }
          }
          console.log('Error signing up');
        }
      })
      .catch(error => {
        console.error('loging error: ' + error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextComponent type="title">Crete Account</TextComponent>
      <TextInputComponent
        placeholder={'User'}
        value={user}
        onChangeText={setUser}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInputComponent
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInputComponent
        placeholder={'Password'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInputComponent
        placeholder={'Confirm Password'}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
      />

      <ButtonComponent
        onPress={signUpValidation}
        text="Sign Up"
        style={styles.input}
      />

      <ButtonComponent
        onPress={() => navigation.goBack()}
        text="Already have an account? Login"
        type="tertiary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 5,
  },
});

export default SignUpScreen;
