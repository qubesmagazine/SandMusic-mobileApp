import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import ArtistCard from "../../components/ArtistCard";
import RecentlyPlayedCard from "../../components/RecentlyPlayedCard";
import { router } from "expo-router";
import {
  RecentlyPlayed,
  RecentlyPlayedTwo,
  TopArtists,
  UserProfile,
} from "../../constants/Data";
import { images } from "../../constants";
import MusicCardList from "../../components/MusicCard";

const Home = () => {
  const [userProfile, setUserProfile] = useState(UserProfile);
  const [recentlyPlayed, setRecentlyPlayed] = useState(RecentlyPlayed);
  const [topArtists, setTopArtist] = useState(TopArtists);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();

  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-1 flex-row justify-between mx-2 my-2 bg-gray-800 rounded-md shadow-md">
      <Image
        className="w-14 h-14"
        source={item.track.album.images}
      />
      <View className="flex-1 mx-2 justify-center">
        <Text numberOfLines={2} className="text-white font-bold text-sm">
          {item.track.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const LikedSongRouter = () => {
    router.push("/likedSongs");
  };

  const renderHeader = () => (
    <View>
      <View className="p-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            source={userProfile.images}
            className="w-11 h-11 rounded-full"
          />
          <Text className="ml-2 text-lg font-bold text-white">
            {message}
          </Text>
        </View>
        <SimpleLineIcons name="earphones" size={24} color="#FFA001" />
      </View>

      <View className="mx-3 my-1 flex-row items-center gap-2 p-2">
        <TouchableOpacity className="bg-gray-800 p-2 rounded-full" onPress={LikedSongRouter}>
          <Text className="text-sm text-white">Music</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-800 p-2 rounded-full" onPress={LikedSongRouter}>
          <Text className="text-sm text-white">Comments & Reviews</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white text-lg font-bold mx-3 mt-2">Your Top Artist</Text>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {topArtists.map((item, index) => (
          <ArtistCard item={item} key={index} index={index} scrollX={scrollX} />
        ))}
      </Animated.ScrollView>

      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={LikedSongRouter} className="flex-1 mx-2 my-2 bg-gray-600 rounded-md shadow-md 
        flex-row items-center gap-1 p-0.3 m-2">
          <LinearGradient colors={["#33006F", "FFFFFF"]}>
            <TouchableOpacity className="w-14 h-14 justify-center items-center">
              <Ionicons name="chatbubble-outline" size={20} color="#FFA001" />
            </TouchableOpacity>
          </LinearGradient>
          <Text className="text-white text-sm font-bold">Top Comments</Text>
        </TouchableOpacity>
        <View className="flex-1 mx-2 my-2 bg-gray-900 rounded-md shadow-md flex-row items-center gap-1 p-0.3 m-2">
          <Image
            className="w-14 h-14"
            source={images.artistalbum}
          />
          <Text className="text-white text-sm font-bold">Hiphop Tamhiza</Text>
        </View>
      </View>

      <Text className="text-white text-lg font-bold mx-3 mt-2">Recently Played</Text>
    </View>
  );

  const renderRecentlyPlayed = ({ item }) => <RecentlyPlayedCard item={item} />;

  return (
    <LinearGradient colors={["#161622", "#131624"]} style={{ flex: 1 }}>
      <StatusBar backgroundColor='#161622' style='light'/>
      <SafeAreaView className="mb-[-30]">
        <FlatList
          data={recentlyPlayed}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListFooterComponent={
            <View>
              <Text className="text-white text-lg font-bold mx-3 mt-2">Latest Music Added</Text>
              <FlatList
                data={RecentlyPlayedTwo}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderRecentlyPlayed}
                keyExtractor={(item, index) => index.toString()}
              />
              <MusicCardList />
              <Text className="text-white text-lg font-bold mx-3 mt-2">Latest Music Added</Text>
              <FlatList
                data={RecentlyPlayedTwo}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderRecentlyPlayed}
                keyExtractor={(item, index) => index.toString()}
              />
              <MusicCardList />
            </View>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
