import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LoginFormMolecule from '../molecules/LoginFormMolecule';
import ButtonComponent from '../atoms/ButtonComponent';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const validateUser = () => {
    if (user !== '' && password !== '') {
      doUserLogin();
    } else {
      alert('Insert user and password');
    }
  };

  //TODO - Implementar
  const forgotPassword = () => {
    alert('Forgot password');
  };

  const doUserLogin = async () => {
    const usernameValue = user;
    const passwordValue = password;
    // return await Parse.User.logIn(usernameValue, passwordValue)
    //   .then(loggedInUser => {
    //     //Alert.alert('Success!', 'You are logged in!');
    //     const currentUser = Parse.User.currentAsync();
    //     navigation.navigate('HomeTabsView');
    //     return true;
    //   })
    //   .catch(error => {
    //     Alert.alert('Error!', error.message);
    //     return false;
    //   });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <LoginFormMolecule
        style={styles.loginForm}
        onChangeTextUser={setUser}
        onChangeTextPass={setPassword}
        userValue={user}
        passValue={password}
        validateUser={validateUser}
        forgotPassword={forgotPassword}
      />

      <ButtonComponent
        onPress={() => navigation.navigate('SignUp')}
        text="¿No tienes cuenta? Crear una"
        style={styles.signUp}
        type="tertiary"
        //style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    width: '80%',
    marginVertical: 5,
  },
  signUp: {
    //marginTop: 10,
  },
  image: {
    width: '70%',
    maxWidth: 300,
    height: 160,
    padding: 10,
    margin: 10,
  },
});

export default LoginScreen;
