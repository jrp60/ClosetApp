import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import TextComponent from '../atoms/TextComponent';
import TextInputComponent from '../atoms/TextInputComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {User} from 'src/store/userSlice';
import {setUser} from '../../store/userSlice';
import {postRegister} from '../../services/AuthService';

const SignUpScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();

  const validatePassword = () => {
    if (password !== passwordConfirm) {
      Alert.alert('Passwords do not match');
    } else {
      return true;
    }
  };

  const validateEmail = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      Alert.alert('Email is not correct');
      return false;
    } else {
      return true;
    }
  };

  //TODO - Add async?
  const signUpValidation = () => {
    if (
      username != '' &&
      email != '' &&
      password != '' &&
      passwordConfirm != ''
    ) {
      if (validateEmail(email) && validatePassword()) {
        doUserRegistration();
      }
    } else {
      Alert.alert('Fill up all fields');
    }
  };

  const doUserRegistration = async () => {
    console.log('Registrando usuario');
    postRegister(username, email, password, passwordConfirm)
      //.then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log('Usuario registrado');
          //Save user with redux
          const userState: User = {
            ...responseJson.data.user,
            token: responseJson.data.token,
            remember_session: false,
          };
          dispatch(setUser(userState));
          navigation.navigate('Home');
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
        value={username}
        onChangeText={setUsername}
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
