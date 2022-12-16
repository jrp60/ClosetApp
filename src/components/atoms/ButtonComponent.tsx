import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

interface ButtonComponentInterface {
  onPress: () => void;
  props: any;
  text: string;
  style?: any;
  type?: 'primary' | 'secondary' | 'tertiary';
}

const ButtonComponent = ({
  onPress,
  props,
  text,
  style,
  type = 'primary',
}: ButtonComponentInterface) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchableStyle, styles[`touchable_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ButtonComponent;
