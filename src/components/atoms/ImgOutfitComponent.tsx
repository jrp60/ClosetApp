import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';

const ImgOutfitComponent = ({urlImage}: {urlImage: string}) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <ImageBackground
      style={{
        //height: dimensions.height,
        aspectRatio: 1,
        //maxHeight: '90%',
        width: windowWidth,
      }}
      resizeMode="contain"
      //source = {{uri: 'data:image/jpeg;base64,' + urlImage}}
      source={{uri: urlImage}}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  likeContainer: {
    top: 55,
  },
});

export default ImgOutfitComponent;
