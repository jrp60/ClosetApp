import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TextComponent = (props: any) => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles[props.type], props.style]}>{props.children}</Text>
    </View>
  );
};

const styles: any = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
  textContainer: {},
  // For buttonComponent
  primary: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textsecondary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  texttertiary: {
    fontSize: 14,
  },
});

export default TextComponent;
