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
import {BASE_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisplayScreen = () => {
  const count = useSelector((state: RootState) => state.likeCounter.value);
  const [outfits, setOutfits] = useState();
  const [displayOutfits, setDisplayOutfits] = useState(false);
  // const [token, setToken] = useState<String>('');
  //const tokenStore = useSelector((state: RootState) => state.token.token);
  const userStore = useSelector((state: RootState) => state.user.user);
  const token = userStore.token;
  const dispatch = useDispatch();
  const like = () => {
    console.log('like');
    console.log('counter before: ' + count);
    dispatch(increment());
    console.log('counter now: ', count);
  };

  const loadOutfits = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}outfits`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 401) {
        console.log('loadOutfits: token expired');
        return;
      }

      const data = await response.json();

      if (data.length != 0) {
        setOutfits(data);
        setDisplayOutfits(true);
      }
    } catch (error) {
      console.log('loadOutfits: Error in display screen: ' + error.message);
    }
  };

  useEffect(() => {
    loadOutfits();
  }, []);

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
