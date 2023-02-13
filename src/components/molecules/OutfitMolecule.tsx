import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImgOutfitComponent from '../atoms/ImgOutfitComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles';
import TextComponent from '../atoms/TextComponent';
import {useDispatch, useSelector} from 'react-redux';
//import type {RootState} from '../../store/store';
import {transformNumber} from '../../utils/numberFormat';
import {RootState} from 'src/store/store';

const OutfitMolecule = ({onPress, item}: {onPress: () => void; item: any}) => {
  const count = useSelector((state: RootState) => state.likeCounter.value);

  const imageBinaryData: string = item.imageMed;
  const imageUri: string = `data:image/jpg;base64,${imageBinaryData}`;

  const textNumber = transformNumber(item.likes);

  return (
    <View style={styles.container}>
      <ImgOutfitComponent urlImage={imageUri}></ImgOutfitComponent>
      <TouchableOpacity onPress={onPress} style={styles.likeContainer}>
        <Ionicons
          name="heart-circle"
          size={90}
          color={Colors.primary}
          onPress={onPress}
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
