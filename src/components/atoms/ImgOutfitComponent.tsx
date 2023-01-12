import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
} from 'react-native';

const ImgOutfitComponent = ({urlImage}) => {
  const windowWidth = Dimensions.get('window').width;

  const scaleHeight = ({source, desiredWidth}) => {
    console.log('source: ', source);

    //const {width, height} = Image.resolveAssetSource(source);
    let ratio = 1 / 1;
    if (ratio < 0.7) {
      ratio = 0.7;
    }

    return desiredWidth / ratio;
  };

  const imageHeight = scaleHeight({
    source: urlImage,
    desiredWidth: windowWidth,
  });

  return (
    <ImageBackground
      style={{
        height: imageHeight,
        maxHeight: '90%',
        width: '100%',
        //backgroundColor: 'red',
      }}
      resizeMode="contain"
      source={{uri: urlImage}}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  likeContainer: {
    top: 55,
  },
});

export default ImgOutfitComponent;
