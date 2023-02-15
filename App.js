import React from 'react';
import type {Node} from 'react';
import {
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

import {Provider} from 'react-redux';
import store from './src/store/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
