import React, {useState} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';

const ImgOutfitComponent = ({urlImage}: {urlImage: string}) => {
  const windowWidth = Dimensions.get('window').width;

  const scaleHeight = ({desiredWidth}: {desiredWidth: number}) => {
    //const {width, height} = Image.resolveAssetSource(source);
    let ratio = 1 / 1;
    if (ratio < 0.7) {
      ratio = 0.7;
    }

    return desiredWidth / ratio;
  };

  const imageHeight = scaleHeight({
    desiredWidth: windowWidth,
  });

  return (
    <ImageBackground
      style={{
        height: imageHeight,
        maxHeight: '90%',
        width: '100%',
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
