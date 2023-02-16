import React from 'react';
import {View, Text, StyleSheet, Button, Platform} from 'react-native';

import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import ButtonComponent from '../atoms/ButtonComponent';
import RNFS from 'react-native-fs';
import {BASE_API_URL} from '@env';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);

  const user = useSelector((state: RootState) => state.user.user);
  const token = user.token;

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

  const optionsPicker: ImageLibraryOptions = {
    mediaType: 'photo',
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
      console.log('ImagePicker Response: ');
      console.log(response);

      await postImage(response.assets[0]);
      //await saveImage(imageUri, folderPath);
    }
  };

  const postImage = async (selectedImage: Asset) => {
    const initialUri = selectedImage.uri!;

    const uri =
      Platform.OS === 'ios' ? initialUri.replace('file://', '') : initialUri;

    const filename = initialUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;

    console.log('type: ', type);
    console.log('uri: ', uri);
    console.log('name: ', `image.${ext}`);

    var formData = new FormData();
    formData.append('imageBin', {
      uri,
      type,
      name: `image.${ext}`,
    });
    //console.log('image bin :', formData.get('imageBin'));

    formData.append('name', 'test');
    formData.append('description', 'test');
    formData.append('price', '100');
    formData.append('category', 'test');
    formData.append('size', 'S');
    formData.append('color', 'blueblue');
    //formData.append('image', 'test');
    formData.append('likes', '2');

    await fetch(`${BASE_API_URL}outfits`, {
      method: 'POST',
      headers: {
        //Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        return response.json();
      })
      .then(async response => {
        console.log('responseJson :', response);

        if (response.status == 200) {
          console.log('Image saved');
          console.log('Response: ' + response.message);
        } else {
          alert('Error');
          console.log('Error: ' + response.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const saveImage = async (imageUri: string, folderPath: any) => {
    console.log('Saving image');

    const fileName = imageUri.split('/').pop();
    const destinationPath = `${folderPath}/${fileName}`;
    //const destinationPath = `${RNFS.DocumentDirectoryPath}/${folderPath}/${fileName}`;
    console.log('DestinationPath: ', destinationPath);

    try {
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${folderPath}`);
      console.log(`${RNFS.DocumentDirectoryPath}/${folderPath}`);

      console.log('Image save to: ', destinationPath);
    } catch (err: any) {
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
