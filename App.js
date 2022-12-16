import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import HelloWorldScreen from './src/components/screens/HelloWorldScreen';

const App: () => Node = () => {
  //const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <HelloWorldScreen />
      <Text>Probando</Text>
    </SafeAreaView>
  );
};

export default App;
