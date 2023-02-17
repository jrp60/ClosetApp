import {BASE_API_URL_IOS} from '@env';
import {BASE_API_URL_ANDROID} from '@env';
import {Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';
const uri = Platform.OS === 'ios' ? BASE_API_URL_IOS : BASE_API_URL_ANDROID;

export const getOutfits = async (token: string) => {
  try {
    const response = await fetch(`${uri}outfits`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 401) {
      console.log('loadOutfits: token expired');
      return;
    }

    const data = await response.json();
    if (data.length != 0) {
      console.log('we have outfits');

      return data;
    }
  } catch (error: any) {
    console.log('loadOutfits: Error in display screen: ' + error.message);
    console.log(error);
    return error;
  }
};

export const postOutfit = async (selectedImage: Asset, token: string) => {
  const initialUri: string = selectedImage.uri!;
  const uriImg: string =
    Platform.OS === 'ios' ? initialUri.replace('file://', '') : initialUri;
  const filename = initialUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename as string);
  const ext = match?.[1];
  const type = match ? `image/${match[1]}` : `image`;

  var formData = new FormData();
  formData.append('imageBin', {
    // @ts-ignore
    uri: uriImg,
    type,
    name: `image.${ext}`,
  });

  console.log('post blob ');

  formData.append('name', 'test');
  formData.append('description', 'test');
  formData.append('price', '100');
  formData.append('category', 'test');
  formData.append('size', 'S');
  formData.append('color', 'blueblue');
  formData.append('likes', '2');

  try {
    const response = await fetch(`${uri}outfits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error post outfit service: ' + error);

    console.error(error);
  }
};
