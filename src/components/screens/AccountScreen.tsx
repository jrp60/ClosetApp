import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import TextComponent from '../atoms/TextComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import {BASE_API_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {clearUser} from '../../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userStore = useSelector((state: RootState) => state.user);
  const logout = () => {
    console.log('Logout');
    AsyncStorage.removeItem('user');
    dispatch(clearUser());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextComponent type="title">Account</TextComponent>
      <ButtonComponent text="Logout" type="primary" onPress={logout} />
      <TextComponent type="title">Name: {userStore.user.name}</TextComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
