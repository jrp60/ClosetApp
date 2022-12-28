import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ImgOutfitComponent = () => {
  const like = () => {
    console.log('like');
  };

  return (
    <ImageBackground
      style={styles.outfit}
      resizeMode="contain"
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}>
      <TouchableOpacity onPress={like}>
        <Ionicons name="camera" size={28} color={'white'} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  outfit: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});

export default ImgOutfitComponent;
