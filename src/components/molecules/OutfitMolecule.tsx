import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImgOutfitComponent from '../atoms/ImgOutfitComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles';
import TextComponent from '../atoms/TextComponent';
import {useDispatch, useSelector} from 'react-redux';
//import type {RootState} from '../../store/store';
import {transformNumber} from '../../utils/numberFormat';
import {RootState} from 'src/store/store';
import {
  getIsLiked,
  postOutfitLike,
  deleteOutfitLike,
} from '../../services/OutfitsService';

const OutfitMolecule = ({onPress, item}: {onPress: () => void; item: any}) => {
  //console.log('ITEM: ', item);

  //const count = useSelector((state: RootState) => state.likeCounter.value);
  const [isLiked, setIsLiked] = useState(false);

  const imageBinaryData: string = item.imageMed;
  const imageUri: string = `data:image/jpg;base64,${imageBinaryData}`;

  const textNumber = transformNumber(item.likes);
  const userStore = useSelector((state: RootState) => state.user.user);
  const token = userStore.token;

  const doUserLike = () => {
    console.log('id: ' + item.id);
    console.log('user id: ' + userStore.id);
    console.log('token: ' + token);

    const response = postOutfitLike(item.id, userStore.id, token);
    console.log(response);

    //TODO update likes number
  };

  const doUserDeleteLike = () => {
    console.log('delete like');
    console.log('id: ' + item.id);
    console.log('user id: ' + userStore.id);
    console.log('token: ' + token);
    const response = deleteOutfitLike(item.id, userStore.id, token);
    console.log(response);

    //TODO update likes number
  };

  const likePressed = async () => {
    console.log('like pressed!');
    if (isLiked) {
      console.log('delete like');
      doUserDeleteLike();
      setIsLiked(false);
    } else {
      console.log('not liked yet');
      doUserLike();
      setIsLiked(true);
    }
  };

  useEffect(() => {
    // Call your promise and set the value of isLiked when the promise resolves
    async function fetchData() {
      const result = await getIsLiked(item.id, userStore.id, token);

      setIsLiked(result.liked);
    }
    fetchData();
  }, []);

  if (isLiked === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImgOutfitComponent urlImage={imageUri}></ImgOutfitComponent>
      <TouchableOpacity onPress={likePressed} style={styles.likeContainer}>
        <Ionicons
          name="heart-circle"
          size={90}
          color={isLiked == true ? Colors.red : Colors.primary}
          onPress={likePressed}
        />
        <TextComponent type="body" style={styles.likeNumber}>
          {textNumber}
        </TextComponent>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  likeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 100,
    marginTop: 10,
  },
  likeNumber: {
    color: Colors.primary,
    top: -58,
    left: -3,
  },
});

export default OutfitMolecule;
