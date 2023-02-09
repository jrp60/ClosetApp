import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from '../styles/colors';

const TextInputComponent = (props: any) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '100%',
  },
});

export default TextInputComponent;
