import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Player } from "../context/PlayerContext";

const SongItem = ({ item, onPress, isPlaying }) => {
  const { currentTrack, setCurrentTrack } = useContext(Player);

  const handlePress = () => {
    setCurrentTrack(item);
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-row items-center p-2.5">
      <Image
        className="w-12 h-12 mr-2.5"
        source={item.track.album.images}
      />
      <View className="flex-1">
        <Text
          numberOfLines={1}
          className={`font-bold text-base ${isPlaying ? 'text-[#FFA001]' : 'text-white'}`}
        >
          {item.track.name}
        </Text>
        <Text className="mt-1 text-gray-500">
          {item.track.artists.name}
        </Text>
      </View>
      <View className="flex-row items-center gap-2 mx-2.5">
        <Ionicons name="chatbubble-outline" size={30} color="#FFA001" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;
