import React, {useEffect} from 'react';
import HelloWorldScreen from '../components/screens/HelloWorldScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DisplayScreen from '../components/screens/DisplayScreen';
import CameraScreen from '../components/screens/CameraScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../components/styles';

import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {RootState} from '../store/store';
import LoginScreen from '../components/screens/LoginScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountScreen from '../components/screens/AccountScreen';
import {setUser} from '../store/userSlice';
import {User} from '../store/userSlice';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    inactiveTintColor: Colors.inactiveTintColor,
  },
};

const Tab = createBottomTabNavigator();

function MyTabsHome() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: Colors.background},
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactiveTintColor,
        headerStyle: {backgroundColor: Colors.background},
      }}>
      <Tab.Screen
        name="Outfits"
        component={DisplayScreen}
        options={{
          tabBarLabel: 'Outfits',

          tabBarIcon: ({color}) => (
            <Ionicons name="shirt" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="camera" size={28} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen name="testing" component={HelloWorldScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  const dispatch = useDispatch();
  const loadUserStorage = async () => {
    try {
      const userStorage = await AsyncStorage.getItem('user');
      console.log('loadUser: ' + userStorage);
      if (userStorage !== null) {
        const tokenUser: string = JSON.parse(userStorage).token;
        dispatch(setUser(JSON.parse(userStorage)));
      }
    } catch (error: any) {
      console.log('loadToken: Error in display screen: ' + error.message);
    }
  };

  const InitialScreen = ({navigation}: any) => {
    const userStore = useSelector((state: RootState) => state.user);
    console.log('UserStore in initial Screen');
    console.log(userStore);

    return (
      <>
        {userStore.user.name == '' ? (
          <LoginScreen navigation={navigation} />
        ) : (
          <MyTabsHome />
        )}
      </>
    );
  };
  useEffect(() => {
    loadUserStorage();
    //AsyncStorage.removeItem('user');
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={InitialScreen} />
        {/* <Stack.Screen name="MyTabsHome" component={MyTabsHome} /> */}
        {/* <Stack.Screen name="HelloWorldScreen" component={HelloWorldScreen} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} /> */}
        {/* <Stack.Screen name="CameraScreen" component={CameraScreen} /> */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
