import React, {useEffect, useState} from 'react';
import {StyleSheet, View, VirtualizedList} from 'react-native';
import OutfitMolecule from '../molecules/OutfitMolecule';
import {increment} from '../../store/likeCounterSlice';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../../store/store';
import TextComponent from '../atoms/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/colors';
import {getOutfits, postOutfitLike} from '../../services/OutfitsService';
import LoadingComponent from '../atoms/LoadingComponent';

const DisplayScreen = () => {
  const count = useSelector((state: RootState) => state.likeCounter.value);
  const [outfits, setOutfits] = useState();
  const [displayOutfits, setDisplayOutfits] = useState(false);
  const userStore = useSelector((state: RootState) => state.user.user);
  const token = userStore.token;
  const dispatch = useDispatch();
  const like = () => {
    console.log('like');
    console.log('counter before: ' + count);
    dispatch(increment());
    console.log('counter now: ', count);
  };

  useEffect(() => {
    const loadOutfits = async () => {
      const outfits = await getOutfits(token);
      if (outfits) {
        setOutfits(outfits);
        setDisplayOutfits(true);
      }
    };
    loadOutfits();
  }, []);

  const renderItem = ({item}: {item: any}) => (
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
          <LoadingComponent />
          <TextComponent type="title">Loading outfits...</TextComponent>
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
