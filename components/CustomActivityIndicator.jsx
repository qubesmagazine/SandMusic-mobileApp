import React from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { images } from '../constants'; // Adjust the import according to your file structure

const CustomActivityIndicator = () => {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    )
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={{...StyleSheet.absoluteFillObject}} className="absolute inset-0 justify-center items-center bg-transparent">
    <Animated.Image
      source={images.loadingIcon} // Replace with your loading icon image
      className="w-16 h-16"
      style={{ transform: [{ rotate: spin }] }}
      resizeMode="contain"
    />
  </View>
  );
};


export default CustomActivityIndicator;
