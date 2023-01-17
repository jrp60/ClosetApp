import {BASE_API_URL} from '@env';

const fetchOutfits = async () => {
  try {
    const response = fetch(BASE_API_URL + 'outfits');

    const data = (await response).json();
    //console.log('DATA: ' + JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchOutfits;
