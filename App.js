import React from 'react';
import type {Node} from 'react';
import {
  //SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HelloWorldScreen from './src/components/screens/HelloWorldScreen';
import Navigation from './src/routes/Navigation';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const App: () => Node = () => {
  //const isDarkMode = useColorScheme() === 'dark';

  return <Navigation />;
};

export default App;
