import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import TextComponent from './TextComponent';
import {Colors} from '../styles';

interface ButtonComponentInterface {
  onPress: () => any;
  text: string;
  style?: any;
  type?: 'primary' | 'secondary' | 'tertiary';
}

const ButtonComponent = ({
  onPress,
  text,
  style,
  type = 'primary',
}: ButtonComponentInterface) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles[type], styles.touchableStyle]}>
        <TextComponent type={type} style={styles[`text${type}`]}>
          {text}
        </TextComponent>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '80%',
  },
  primary: {
    backgroundColor: Colors.primary,
    fontSize: 20,
  },
  secondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  tertiary: {
    backgroundColor: Colors.background,
  },
  textprimary: {
    color: Colors.background,
  },
  textsecondary: {
    color: Colors.black,
  },
  texttertiary: {
    color: Colors.inactiveTintColor,
  },
  touchableStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 18,
    color: 'red',
  },
});

export default ButtonComponent;
