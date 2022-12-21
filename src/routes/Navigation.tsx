import React from 'react';
import HelloWorldScreen from '../components/screens/HelloWorldScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5BB5F1',
    background: '#f4f4f4',
  },
};

function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      {/* <SafeAreaView> */}
      <Stack.Navigator
        initialRouteName="HelloWorldScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HelloWorldScreen" component={HelloWorldScreen} />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default Navigation;
