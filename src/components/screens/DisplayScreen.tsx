import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ImgOutfitComponent from '../atoms/ImgOutfitComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import OutfitMolecule from '../molecules/OutfitMolecule';
import {increment, decrement} from '../../store/likeCounterSlice';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';

const DisplayScreen = () => {
  const count = useSelector((state: RootState) => state.likeCounter.value);
  const dispatch = useDispatch();
  const like = () => {
    console.log('like');
    console.log('counter before: ' + count);

    dispatch(increment());
    console.log('counter now: ', count);
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

  console.log('url in screen: ' + renderItem);

  console.log('urlimage in screen 2: ' + DATA[0].urlImage);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.urlImage}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default DisplayScreen;
