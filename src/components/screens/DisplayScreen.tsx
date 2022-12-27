import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DisplayScreen = () => {
  return (
    <View>
      <Text style={styles.text}>Display Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default DisplayScreen;
