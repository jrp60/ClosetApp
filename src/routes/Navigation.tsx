import React from 'react';
import HelloWorldScreen from '../components/screens/HelloWorldScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import CameraScreen from '../components/screens/CameraScreen';
import Icon from 'react-native-ionicons';
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
        component={HelloWorldScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="shirt" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={CameraScreen} />
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
      </Stack.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default Navigation;
