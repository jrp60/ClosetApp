import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Image,
  Alert,
} from 'react-native';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ButtonComponent from '../atoms/ButtonComponent';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {postOutfit} from '../../services/OutfitsService';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(null);

  const user = useSelector((state: RootState) => state.user.user);
  const token = user.token;
  const [selectedFile, setSelectedFile] = useState<Asset | null>(null);

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
    quality: 0.1,
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
    console.log('Response pciker= ');
    console.log(response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    }
    if (response.assets) {
      console.log('ImagePicker Response: ');
      console.log(response);

      setSelectedFile(response.assets[0]);
    }
  };

  const createOutfit = async (selectedImage: Asset) => {
    await postOutfit(selectedImage, token)
      .then(response => {
        if (response.status == 200) {
          console.log('Image saved');
          console.log('Response message: ' + response.data.message);
          Alert.alert('Outfit created');
          setSelectedFile(null);
        } else {
          alert('Error saving image');
          console.log('Error: ' + response.message);
        }
      })
      .catch(error => {
        console.error(error);
        console.log('Catched error');
      });
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

      {selectedFile != null ? (
        <Image
          source={{uri: selectedFile.uri}}
          style={{width: 200, height: 200}}
        />
      ) : null}
      {selectedFile != null ? (
        <ButtonComponent
          onPress={() => createOutfit(selectedFile)}
          text={'Upload'}
          style={styles.buttonMargin}
        />
      ) : null}
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
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default CameraScreen;
