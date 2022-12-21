import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// interface TextComponentInterface {
//   text: string
//   style?: any
// }

const TextComponent = props => {
  return (
    <View style={styles.textContainer}>
      <Text style={[styles[props.type], props.style]}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  textContainer: {
    margin: 10,
    fontFamily: 'Roboto',
  },
});

export default TextComponent;
