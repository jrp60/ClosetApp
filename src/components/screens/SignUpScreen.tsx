import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import TextComponent from '../atoms/TextComponent';
import TextInputComponent from '../atoms/TextInputComponent';
import ButtonComponent from '../atoms/ButtonComponent';

const SignUpScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const validatePassword = () => {
    if (password !== passwordConfirm) {
      alert('Las contraseñas no coinciden');
    } else {
      return true;
    }
  };

  const validateEmail = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      Alert.alert('El Correo no es correcto');
      alert('Forgot password');
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  };

  const signUpValidation = () => {
    console.log(user, email, password, passwordConfirm);

    if (user != '' && email != '' && password != '' && passwordConfirm != '') {
      if (validatePassword() && validateEmail(email)) {
        doUserRegistration();
      }
    } else {
      console.log(user, email, password, passwordConfirm);
      console.log(user == '');
      console.log(email == '');
      console.log(password == '');
      console.log(passwordConfirm == '');

      alert('Rellena todos los campos');
    }
  };

  //TODO - Implementar
  const doUserRegistration = () => {};

  return (
    <View style={styles.container}>
      <TextComponent type="title">Crete Account</TextComponent>
      <TextInputComponent
        placeholder={'Usuario'}
        value={user}
        onChangeText={setUser}
        style={styles.input}
      />
      <TextInputComponent
        placeholder={'Correo'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInputComponent
        placeholder={'Contraseña'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInputComponent
        placeholder={'Confirmar contraseña'}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
        style={styles.input}
      />

      <ButtonComponent
        onPress={signUpValidation}
        text="Registrar"
        style={styles.input}
      />

      <ButtonComponent
        onPress={() => navigation.goBack()}
        text="¿Tienes cuenta? Accede"
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
