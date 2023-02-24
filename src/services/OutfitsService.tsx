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

// USER_OUTFIT
export const postOutfitLike = async (
  outfitId: number,
  userId: string,
  token: string,
) => {
  console.log('outfitId: ' + outfitId);
  console.log('userId: ' + userId);

  try {
    const response = await fetch(`${uri}user_outfit/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        outfit_id: outfitId,
      }),
    });
    console.log('response: ');
    console.log(response);

    const data = await response.json();
    console.log('data: ');
    console.log(data);

    return response;
  } catch (error) {
    console.log('Error post outfit like service: ' + error);

    console.error(error);
  }
};

export const getIsLiked = async (
  outfitId: number,
  userId: string,
  token: string,
) => {
  try {
    const response = await fetch(
      `${uri}user_outfit/getLike/${userId}/${outfitId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        //   outfit_id: outfitId,
        //   user_id: userId,
        // }),
      },
    );
    const data = await response.json();
    console.log('data: ');
    console.log(data);

    return data;
  } catch (error) {
    console.log('Error get is liked service: ' + error);

    console.error(error);
  }
};

export const deleteOutfitLike = async (
  outfitId: number,
  userId: string,
  token: string,
) => {
  try {
    const response = await fetch(
      `${uri}user_outfit/delete/${userId}/${outfitId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({
        //   outfit_id: outfitId,
        //   user_id: userId,
        // }),
      },
    );
    console.log('response: ');
    console.log(response);

    const data = await response.json();
    console.log('data: ');
    console.log(data);

    return data;
  } catch (error) {
    console.log('Error delete outfit like service: ' + error);

    console.error(error);
  }
};
