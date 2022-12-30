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

const ImgOutfitComponent = () => {
  const windowWidth = Dimensions.get('window').width;

  const scaleHeight = ({source, desiredWidth}) => {
    const {width, height} = Image.resolveAssetSource(source);
    let ratio = width / height;
    console.log('ratio::', ratio);
    if (ratio < 0.7) {
      ratio = 0.7;
    }
    return desiredWidth / ratio;
  };

  const imageHeight = scaleHeight({
    source: require('../../../assets/images/outfit4.jpg'),
    desiredWidth: windowWidth,
  });

  const like = () => {
    console.log('like');
  };

  return (
    <ImageBackground
      style={[styles.outfit, {height: imageHeight, maxHeight: '90%'}]}
      resizeMode="contain"
      source={require('../../../assets/images/outfit4.jpg')}>
      <TouchableOpacity onPress={like} style={styles.likeContainer}>
        <Ionicons
          name="md-heart-circle"
          size={50}
          color={Colors.primary}
          onPress={like}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  outfit: {
    width: '100%',
    backgroundColor: '#98f99c',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likeContainer: {
    top: 55,
  },
});

export default ImgOutfitComponent;
