const uri = 'http://localhost:8000';

const fetchOutfits = async () => {
  try {
    const response = fetch(uri + '/api/outfits');

    const data = (await response).json();
    //console.log('DATA: ' + JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchOutfits;
