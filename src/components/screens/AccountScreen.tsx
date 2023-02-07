import React from 'react';
import {View, StyleSheet} from 'react-native';
import TextComponent from '../atoms/TextComponent';
import ButtonComponent from '../atoms/ButtonComponent';
import {BASE_API_URL} from '@env';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const AccountScreen = () => {
  const userStore = useSelector((state: RootState) => state.user);
  const logout = () => {
    console.log('Logout');
    console.log(userStore.user);
    console.log(userStore);
    //TODO - Implementar
    //
  };
  return (
    <View style={styles.container}>
      <TextComponent type="title">Account</TextComponent>
      <ButtonComponent text="Logout" type="primary" onPress={logout} />
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
