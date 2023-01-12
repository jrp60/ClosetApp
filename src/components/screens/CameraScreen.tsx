import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ButtonComponent from '../atoms/ButtonComponent';
import RNFS from 'react-native-fs';

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
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    }
    if (response.assets) {
      const imageUri = response.assets[0].uri;
      //TODO Change Path to save
      const folderPath = '../../../../assets/images';
      console.log('ImageUri: ', imageUri);

      saveImage(imageUri, folderPath);
    }
  };

  const saveImage = async (imageUri, folderPath) => {
    console.log('Saving image');

    const fileName = imageUri.split('/').pop();
    const destinationPath = `${folderPath}/${fileName}`;
    //const destinationPath = `${RNFS.DocumentDirectoryPath}/${folderPath}/${fileName}`;
    console.log('DestinationPath: ', destinationPath);

    try {
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${folderPath}`);
      console.log('Image save to: ', destinationPath);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <ButtonComponent
        onPress={camera}
        text={'Open Camera'}
        style={styles.buttonMargin}></ButtonComponent>
      <ButtonComponent
        onPress={picker}
        text={'Pick in gallery'}
        style={styles.buttonMargin}></ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMargin: {
    margin: 10,
  },
});

export default CameraScreen;
