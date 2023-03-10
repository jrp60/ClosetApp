import React, {useEffect} from 'react';
import HelloWorldScreen from '../components/screens/HelloWorldScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DisplayScreen from '../components/screens/DisplayScreen';
import CameraScreen from '../components/screens/CameraScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../components/styles';

import {Provider} from 'react-redux';
import store from '../store/store';
import LoginScreen from '../components/screens/LoginScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountScreen from '../components/screens/AccountScreen';

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
  useEffect(() => {
    //AsyncStorage.removeItem('user');
  }, []);

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
        name="Home"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="camera" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Login2"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" size={28} color={color} />
          ),
        }}
      />
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
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        {/* <SafeAreaView> */}
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MyTabsHome" component={MyTabsHome} />
          <Stack.Screen name="HelloWorldScreen" component={HelloWorldScreen} />
          <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;
