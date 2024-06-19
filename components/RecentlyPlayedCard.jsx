import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const RecentlyPlayedCard = ({ item }) => {
  const router = useRouter();

  const songInfo = () => {
    router.push({
      pathname: "/song-infoscreen",
      params: { item: JSON.stringify(item) }, // Stringify the item object
    });
  };
  return (
    <TouchableOpacity onPress={songInfo} className="m-2.5">
    <Image
      className="w-32 h-32 rounded-md"
      source={item.track.album.images}
    />
    <Text
      numberOfLines={1}
      className="text-sm font-medium text-white mt-2.5"
    >
      {item.track.name}
    </Text>
  </TouchableOpacity>
  );
};

export default RecentlyPlayedCard;