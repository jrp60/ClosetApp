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

  const doUserRegistration = () => {};

  return (
    <View style={styles.container}>
      <TextComponent type="title">Crete Account</TextComponent>
      <TextInputComponent
        placeholder={'Usuario'}
        value={user}
        setValue={user => setUser(user)}
      />
      <TextInputComponent
        placeholder={'Correo'}
        value={email}
        onChangeText={text => validateEmail(text)}
        setValue={email => setEmail(email)}
      />
      <TextInputComponent
        placeholder={'Contraseña'}
        value={password}
        setValue={password => setPassword(password)}
        secureTextEntry
      />
      <TextInputComponent
        placeholder={'Confirmar contraseña'}
        value={passwordConfirm}
        setValue={passwordConfirm => setPasswordConfirm(passwordConfirm)}
        secureTextEntry
      />

      <ButtonComponent onPress={signUpValidation} text="Registrar" />

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
});

export default SignUpScreen;
