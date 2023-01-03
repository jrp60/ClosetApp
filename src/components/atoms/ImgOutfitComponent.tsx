import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles';

const ImgOutfitComponent = ({urlImage}) => {
  console.log('URL IMAGE: ', urlImage);

  const windowWidth = Dimensions.get('window').width;

  const scaleHeight = ({source, desiredWidth}) => {
    const {width, height} = Image.resolveAssetSource(source);
    let ratio = width / height;
    console.log('ratio::', ratio);
    if (ratio < 0.7) {
      ratio = 0.7;
    }
    console.log('heith: ', desiredWidth / ratio);

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
        backgroundColor: 'red',
      }}
      resizeMode="contain"
      source={urlImage}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  likeContainer: {
    top: 55,
  },
});

export default ImgOutfitComponent;
