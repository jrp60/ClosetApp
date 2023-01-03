import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ImgOutfitComponent from '../atoms/ImgOutfitComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import OutfitMolecule from '../molecules/OutfitMolecule';

const DisplayScreen = () => {
  const like = () => {
    console.log('like');
  };

  const DATA = [
    {
      id: '1',
      title: 'First Item',
      urlImage: require('../../../assets/images/outfit1.jpg'),
    },
    {
      id: '2',
      title: 'Second Item',
      urlImage: require('../../../assets/images/outfit2.jpg'),
    },
    {
      id: '3',
      title: 'Third Item',
      urlImage: require('../../../assets/images/outfit3.jpg'),
    },
    {
      id: '4',
      title: 'Fourth Item',
      urlImage: require('../../../assets/images/outfit4.jpg'),
    },
    {
      id: '5',
      title: 'Fifth Item',
      urlImage: require('../../../assets/images/outfit5.jpeg'),
    },
  ];

  const renderItem = ({item}) => (
    <OutfitMolecule onPress={like} urlImage={item.urlImage}></OutfitMolecule>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default DisplayScreen;
