import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import TextInputComponent from '../atoms/TextInputComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../styles/colors';
import TextComponent from '../atoms/TextComponent';
import {type} from '../../store/store';

const LoginFormMolecule = ({...props}) => {
  return (
    <>
      <TextInputComponent
        placeholder="Username"
        onChangeText={props.onChangeTextUser}
        value={props.userValue}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
      <TextInputComponent
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={props.onChangeTextPass}
        value={props.passValue}
        autoCapitalize="none"
        {...props}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={props.remindMeCheck}
          onValueChange={newValue => props.setRemindMeCheck(newValue)}
          tintColors={{true: Colors.primary, false: Colors.inactiveTintColor}}
          tintColor={Colors.inactiveTintColor}
          onTintColor={Colors.primary}
          onCheckColor={Colors.primary}
        />
        <TextComponent style={styles.remindTxt} type="body">
          Remind User{' '}
        </TextComponent>
      </View>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  remindTxt: {
    marginLeft: 10,
  },
});

export default LoginFormMolecule;
