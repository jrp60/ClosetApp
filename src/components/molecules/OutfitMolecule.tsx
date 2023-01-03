import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImgOutfitComponent from '../atoms/ImgOutfitComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../styles';

const OutfitMolecule = ({onPress, urlImage}) => {
  return (
    <View style={styles.container}>
      <ImgOutfitComponent urlImage={urlImage}></ImgOutfitComponent>
      <TouchableOpacity onPress={onPress} style={styles.likeContainer}>
        <Ionicons
          name="md-heart-circle"
          size={60}
          color={Colors.primary}
          onPress={onPress}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#aqua',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
});

export default OutfitMolecule;
