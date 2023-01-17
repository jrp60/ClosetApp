import React, {useEffect, useState} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
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
  const [outfits, setOutfits] = useState();
  const [displayOutfits, setDisplayOutfits] = useState(false);
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
        //console.log('DATA in display: ' + data);
        console.log('First then');

        setOutfits(data);
        setDisplayOutfits(true);
      })
      .catch(error => {
        console.log('Error in display screen: ' + error.message);
        setDisplayOutfits(false);
      });
  }, []);

  console.log('display outfits: ' + displayOutfits);

  // console.log('New DATA: ' + outfits);
  // console.log('NEW DATA:', JSON.stringify(outfits, null, 2));

  const renderItem = ({item}) => (
    <OutfitMolecule onPress={like} item={item}></OutfitMolecule>
  );

  return (
    <View>
      {displayOutfits ? (
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
