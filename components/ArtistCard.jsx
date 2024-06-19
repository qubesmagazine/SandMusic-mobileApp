import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

const ArtistCard = ({ item, index, scrollX }) => {
  const router = useRouter();
  const ArtistInfo = () => {
    router.push({
      pathname: "/topArtist-screen",
      params: { item: JSON.stringify(item) }, // Stringify the item object
    });
  };

  const inputRange = [
    (index - 1) * 140,
    index * 140,
    (index + 1) * 140
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: 'clamp'
  });

    return (
      <Animated.View style={{ margin: 10, transform: [{ scale }] }}>
        <TouchableOpacity onPress={ArtistInfo}>
          <Image
            className="w-32 h-32 rounded-2xl"
            source={item.images}
          />
          <Text className="text-xs font-medium text-white mt-2.5">
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  export default ArtistCard
