import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SavedTracks, UserProfile } from "../../constants/Data";

const Profile = () => {
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView className="mt-12">
        <View className="mt-12">
          <View className="flex-row items-center gap-2">
            <Image
              className="w-10 h-10 rounded-full object-cover"
              source={UserProfile.images}
            />
            <View>
              <Text className="text-white text-base font-bold">
                {UserProfile.display_name}
              </Text>
              <Text className="text-gray-400 text-base font-bold">
                {UserProfile.email}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-white text-lg font-medium mx-3 mt-2">
          Your Playlists
        </Text>
        <View className="p-4">
          {SavedTracks.map((item, index) => (
            <View key={index} className="flex-row items-center gap-2 my-2">
              <TouchableOpacity>
                <Image
                  source={item.track.album.images}
                  className="w-12 h-12 rounded-md"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Text className="text-white">{item.track.name}</Text>
                  <Text className="text-white mt-2">0 followers</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
