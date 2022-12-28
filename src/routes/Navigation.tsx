import React from 'react';
import HelloWorldScreen from '../components/screens/HelloWorldScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import DisplayScreen from '../components/screens/DisplayScreen';
import CameraScreen from '../components/screens/CameraScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4a3621',
    background: '#f4f4f4',
    inactiveTintColor: '#a6a6a6',
  },
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: MyTheme.colors.background},
        tabBarActiveTintColor: MyTheme.colors.primary,
        tabBarInactiveTintColor: MyTheme.colors.inactiveTintColor,
        headerStyle: {backgroundColor: MyTheme.colors.background},
      }}>
      <Tab.Screen
        name="HelloWorldScreen"
        component={HelloWorldScreen}
        options={{
          tabBarLabel: 'Home',
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
      <Tab.Screen name="Settings" component={DisplayScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      {/* <SafeAreaView> */}
      <Stack.Navigator
        initialRouteName="MyTabs"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="HelloWorldScreen" component={HelloWorldScreen} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default Navigation;
