import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ColorValue, Animated, Easing} from 'react-native';
import Colors from '../styles/colors';

interface Props {
  color?: ColorValue;
  testID?: string;
  durationMs?: number;
}

const LoadingComponent = ({
  color = Colors.primary,
  durationMs = 1000,
}: Props): JSX.Element => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  const startRotationAnimation = (
    durationMs: number,
    rotationDegree: Animated.Value,
  ): void => {
    console.log('startRotationAnimation');

    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
    console.log('useEffect');
  }, [durationMs, rotationDegree]);
  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View style={[styles.background, {borderColor: Colors.background}]} />
      <Animated.View
        style={[
          styles.progress,
          {borderTopColor: color},
          {
            //Transforms 0 -> 360 to '0deg' -> '360deg'
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const height = 64;

const styles = StyleSheet.create({
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 10,
    opacity: 0.25,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    //borderLeftColor: 'transparent',
    // borderRightColor: 'transparent',
    // borderBottomColor: 'transparent',
    borderLeftColor: Colors.background,
    borderBottomColor: Colors.background,
    borderRightColor: Colors.background,
    borderWidth: 10,
    position: 'absolute',
  },
});

export default LoadingComponent;
