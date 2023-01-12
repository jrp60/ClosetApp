import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import Colors from '../styles/colors';

// interface CustomInputInterface extends TextInputProps {
//   value: string;
//   setValue: (value: string) => void;
//   placeholder: string;
//   secureTextEntry?: boolean;
//   onChangeText?: (text: string) => void;
// }

const TextInputComponent = ({
  // value,
  // setValue,
  // placeholder,
  // secureTextEntry = false,
  // onChangeText,
  ...props
}) => {
  console.log('textinput value: ', props.value);

  return (
    <TextInput
      // value={value}
      // onChangeText={setValue}
      // placeholder={placeholder}
      {...props}
      // autoCapitalize="none"
      // secureTextEntry={secureTextEntry}
      //onChangeText={props.onChangeText}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    // padding: 10,
    // margin: 5,
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '100%',
    //maxWidth: 300,
  },
});

export default TextInputComponent;
