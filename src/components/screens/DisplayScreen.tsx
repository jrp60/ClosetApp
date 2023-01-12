import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, VirtualizedList} from 'react-native';
import ImgOutfitComponent from '../atoms/ImgOutfitComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import OutfitMolecule from '../molecules/OutfitMolecule';
import {increment, decrement} from '../../store/likeCounterSlice';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';
import fetchOutfits from '../../services/FetchOutfits';
import TextComponent from '../atoms/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';

const DisplayScreen = () => {
  const count = useSelector((state: RootState) => state.likeCounter.value);
  const [outfits, setOutfits] = useState(fetchOutfits().then(data => data));
  const dispatch = useDispatch();
  const like = () => {
    console.log('like');
    console.log('counter before: ' + count);

    dispatch(increment());
    console.log('counter now: ', count);
  };

  useEffect(() => {
    console.log('useEffect');
    fetchOutfits()
      //.then(data => data.json())
      .then(data => {
        setOutfits(data);
      });
  }, []);

  const DATA = [
    {
      id: '1',
      title: 'First Item',
      urlImage: require('../../../assets/images/outfit1.jpg'),
      likes: 0,
    },
    {
      id: '2',
      title: 'Second Item',
      urlImage: require('../../../assets/images/outfit2.jpg'),
      likes: 12430,
    },
    {
      id: '3',
      title: 'Third Item',
      urlImage: require('../../../assets/images/outfit3.jpg'),
      likes: 123,
    },
    {
      id: '4',
      title: 'Fourth Item',
      urlImage: require('../../../assets/images/outfit4.jpg'),
      likes: 98082812,
    },
    {
      id: '5',
      title: 'Fifth Item',
      urlImage: require('../../../assets/images/outfit5.jpg'),
      likes: 88744,
    },
  ];

  console.log('New DATA: ' + outfits);
  console.log('NEW DATA:', JSON.stringify(outfits, null, 2));

  const renderItem = ({item}) => (
    <OutfitMolecule onPress={like} item={item}></OutfitMolecule>
  );

  return (
    <View>
      {outfits ? (
        // <FlatList
        //   contentContainerStyle={styles.container}
        //   data={DATA}
        //   renderItem={renderItem}
        //   keyExtractor={item => item.id}
        // />
        <VirtualizedList
          contentContainerStyle={styles.listContainer}
          data={outfits}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
        />
      ) : (
        <View style={styles.container}>
          <TextComponent type="title">No data to display</TextComponent>
          <Ionicons name="sad-outline" size={64} color={Colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 30,
  },
});

export default DisplayScreen;
