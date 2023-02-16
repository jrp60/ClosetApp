import {BASE_API_URL_IOS} from '@env';
import {BASE_API_URL_ANDROID} from '@env';
import {Platform} from 'react-native';
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
