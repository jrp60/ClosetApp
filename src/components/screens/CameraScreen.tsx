import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ButtonComponent from '../atoms/ButtonComponent';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);

  // React.useEffect(() => {
  //   (async () => {
  //     const {status} = await Camera.requestPermissionsAsync();

  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }

  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  // You can also use as a promise without 'callback':
  const optionsCamera: CameraOptions = {
    mediaType: 'photo',
    // includeBase64: false,
    // maxHeight: 200,
    // maxWidth: 200,
  };
  const camera = async () => {
    const response = await launchCamera(optionsCamera);
    console.log('Response = ', response);
  };

  const optionsPicker = {
    type: 'jpg,png,jpeg',
  };

  const picker = async () => {
    const response = await launchImageLibrary(optionsPicker);
    console.log('Response = ', response);
  };

  return (
    <View style={styles.container}>
      <ButtonComponent onPress={camera} text={'Open Camera'}></ButtonComponent>
      <ButtonComponent
        onPress={picker}
        text={'Pick in gallery'}></ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
