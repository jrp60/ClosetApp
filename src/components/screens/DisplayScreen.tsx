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
  const [token, setToken] = useState<String>('');
  const dispatch = useDispatch();
  const like = () => {
    console.log('like');
    console.log('counter before: ' + count);

    dispatch(increment());
    console.log('counter now: ', count);
  };

  // It works, but im doing 2 calls separately in useEffect
  const loadTokenAndOutfits2 = async () => {
    try {
      const user2 = await AsyncStorage.getItem('user');
      console.log('myFunction: token2: ' + user2);
      if (user2 !== null) {
        const token2 = JSON.parse(user2).token;
        const response = await fetch(`${BASE_API_URL}outfits`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token2}`,
          },
        });
        const data = await response.json();
        console.log('myFunction: data: ' + JSON.stringify(data));
        setOutfits(data);
        setDisplayOutfits(true);
      }
    } catch (error) {
      console.log('myFunction: Error in display screen: ' + error.message);
    }
  };

  const loadToken = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log('loadToken: token: ' + user);
      if (user !== null) {
        const token2: String = JSON.parse(user).token;
        console.log('loadToken: token: ' + token2);
        console.log('token state: ' + token);

        setToken(token2);
        console.log('token state after: ' + token);
      }
    } catch (error) {
      console.log('loadToken: Error in display screen: ' + error.message);
    }
  };

  const loadOutfits = async () => {
    try {
      console.log('loadOutfits: token: ' + token);

      const response = await fetch(`${BASE_API_URL}outfits`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOutfits(data);
      setDisplayOutfits(true);
    } catch (error) {
      console.log('loadOutfits: Error in display screen: ' + error.message);
    }
  };

  const loadTokenAndOutfits = async () => {
    try {
      await loadToken();
      await loadOutfits();
    } catch (error) {
      console.log(
        'loadTokenAndOutfits: Error in display screen: ' + error.message,
      );
    }
  };

  useEffect(() => {
    console.log('useEffect');
    loadToken();
    console.log('token state: ' + token);
    if (token != '') {
      loadOutfits();
    }
  }, [token]);

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
