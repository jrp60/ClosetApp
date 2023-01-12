import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import TextInputComponent from '../atoms/TextInputComponent';
import ButtonComponent from '../atoms/ButtonComponent';

const LoginFormMolecule = props => {
  return (
    <>
      <TextInputComponent
        placeholder="Username"
        onChangeText={props.onChangeTextUser}
        value={props.userValue}
        {...props}
      />
      <TextInputComponent
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={props.onChangeTextPass}
        value={props.passValue}
        {...props}
      />
      <ButtonComponent
        onPress={props.validateUser}
        text="Login"
        // style={styles.btnContainer}
      />

      <ButtonComponent
        onPress={props.forgotPassword}
        text="Recordar contraseña"
        style={styles.btnRemind}
        type="tertiary"
      />
    </>
  );
};

const styles = StyleSheet.create({
  btnRemind: {
    marginTop: 30,
  },
});

export default LoginFormMolecule;
