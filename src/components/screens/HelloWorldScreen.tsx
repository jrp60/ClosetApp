import React from 'react';
import TextComponent from '../atoms/TextComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import {View, StyleSheet} from 'react-native';

const HelloWorldScreen = () => {
  return (
    <View style={styles.container}>
      <TextComponent type="title">Hello World!</TextComponent>
      <ButtonComponent
        type="primary"
        onPress={() => {}}
        text="Primary"></ButtonComponent>
      <ButtonComponent
        type="secondary"
        onPress={() => {}}
        text="Secondary"></ButtonComponent>
      <ButtonComponent
        type="tertiary"
        onPress={() => {}}
        text="Tertiary"></ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default HelloWorldScreen;
