import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import TextComponent from './TextComponent';

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
  console.log('text', text);

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles[type], styles.touchableStyle]}>
        <TextComponent type="title" style={styles[`text${type}`]}>
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
    margin: 10,
  },
  primary: {
    backgroundColor: '#4a3621',
    fontSize: 20,
  },
  secondary: {
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#000',
  },
  tertiary: {
    backgroundColor: '#f4f4f4',
  },
  textprimary: {
    color: '#dfdfdf',
  },
  textsecondary: {
    color: '#000',
  },
  texttertiary: {
    color: '#333',
  },
  touchableStyle: {
    //flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    color: 'red',
  },
});

export default ButtonComponent;
