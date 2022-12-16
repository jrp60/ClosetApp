import React from 'react';
import {View, Text} from 'react-native';

// interface TextComponentInterface {
//   text: string
//   style?: any
// }

View;

const TextComponent = props => {
  return (
    <View>
      <Text>{props.children}</Text>
    </View>
  );
};

export default TextComponent;
