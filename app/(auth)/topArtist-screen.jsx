import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StyleSheet,
} from "react-native";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BottomModal, ModalContent } from "react-native-modals";
import { Audio } from "expo-av";
import ArtistCard from "../../components/ArtistCard";
import { TopArtists } from "../../constants/Data";


// Utility function to format time
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const TopArtistScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [sound, setSound] = useState(null);
  const [topArtists, setTopArtist] = useState(TopArtists);
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = params.item ? JSON.parse(params.item) : null;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handlePlayButtonPress = async () => {
    setCurrentTrack(item);
    setModalVisible(true);
    if (sound) {
      await sound.unloadAsync();
    }
    // Load and play the song
    const { sound: playbackObject, status } = await Audio.Sound.createAsync(
      { uri: item?.track?.song_url },
      { shouldPlay: true }
    );
    setSound(playbackObject);
    setTotalDuration(status.durationMillis / 1000); // Set total duration in seconds

    playbackObject.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000);
        setProgress(status.positionMillis / status.durationMillis);
      }
    });
  };

  const goBackArrow = () => {
    router.back();
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const circleSized = 12;

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} className="flex-1">
      <ScrollView className="mt-12">
      <View className="flex-row p-3">
        <Ionicons
          onPress={goBackArrow}
          name="arrow-back"
          size={24}
          color="white"
        />
        <View className="flex-1 items-center mt-10">
          <Image
            className="w-50 h-50"
            source={item.track.album.images}
          />
        </View>
      </View>
      <Text className="text-white mx-3 mt-2 text-2xl font-bold">
        {item?.track?.name}
      </Text>
      <View className="mx-3 flex-row items-center flex-wrap mt-2 gap-2">
        {item?.track?.artists.map((artist, index) => (
          <Text
            key={index}
            className="text-gray-500 text-sm font-medium"
          >
            {artist.name}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        className="flex-row items-center justify-between mx-2"
        onPress={handlePlayButtonPress}
      >
           <TouchableOpacity
          className='rounded-full bg-yellow-500 justify-center items-center'
          style={{
            width: 30,
            height: 30,
          }}
        >
          <AntDesign name="arrowdown" size={20} color="white" />
        </TouchableOpacity>

        <View className='flex-row items-center gap-4'>
          <MaterialCommunityIcons
            name="cross-bolnisi"
            size={30}
            color="#FFA001"
          />
          <TouchableOpacity
       onPress={handlePlayButtonPress}
            className=' rounded-full justify-center items-center bg-yellow-500'
            style={{
              width: 60,
              height: 60,
            }}
          >
            <Entypo name="controller-play" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View className="mt-2.5 mx-3">
        {item?.track?.tracks.map((track, index) => (
          <TouchableOpacity
            key={index}
            className="my-2.5 flex-row justify-between"
          >
            <View>
              <Text className="text-lg font-medium text-white">
                {track.name}
              </Text>
              <View className="flex-row items-center gap-2 mt-1.25">
                {track.artists.map((artist, index) => (
                  <Text
                    key={index}
                    className="text-lg font-medium text-gray-500"
                  >
                    {artist.name}
                  </Text>
                ))}
              </View>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
       <ModalContent className="h-full w-full bg-[#5072A7]">
        <View className="h-full w-full mt-10">
          <TouchableOpacity className="flex-row items-center justify-between">
            <AntDesign
              onPress={() => setModalVisible(!modalVisible)}
              name="down"
              size={24}
              color="#FFA001"
            />
            <Text className="text-base font-bold text-white">
              {currentTrack?.track?.name}
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
          <View className="h-17.5 mt-10" />
            <FlatList
              data={[]}
              ListHeaderComponent={
                <>
                  <Image
                    style={{ width: "100%", height: 330, borderRadius: 4 }}
                    source={ item.track.album.images}
                  />
                      <View className="mt-5 flex-row justify-between">
                      <View>
                      <Text className="text-lg font-bold text-white">
                        {currentTrack?.track?.name}
                      </Text>
                      <Text className="text-[#D3D3D3] mt-1">
                        {currentTrack?.track?.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </Text>
                    </View>
                    <AntDesign name="heart" size={24} color="#FFA001" />
                  </View>
                  <View className="mt-2.5">
                    <View
                      style={{
                        width: "100%",
                        marginTop: 10,
                        height: 3,
                        backgroundColor: "gray",
                        borderRadius: 5,
                      }}
                    >
                      <View
                        style={[
                          styles.progressbar,
                          { width: `${progress * 100}%` },
                        ]}
                      />
                      <View
                        style={[
                          {
                            position: "absolute",
                            top: -5,
                            width: circleSized,
                            height: circleSized,
                            borderRadius: circleSized,
                            backgroundColor: "white",
                          },
                          {
                            left: `${progress * 100}%`,
                            marginLeft: -circleSized / 2,
                          },
                        ]}
                      />
                    </View>


                    <View className="mt-3 flex-row items-center justify-between">
                      <Text className="text-sm text-[#D3D3D3]">{formatTime(currentTime)}</Text>
                      <Text className="text-sm text-[#D3D3D3]">{formatTime(totalDuration)}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between mt-4.25">
                    <TouchableOpacity>
                      <FontAwesome name="arrows" size={30} color="#FFA001" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}}>
                      <Ionicons name="play-skip-back" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                      {isPlaying ? (
                        <AntDesign name="pausecircle" size={60} color="white" />
                      ) : (
                        <TouchableOpacity
                          onPress={handlePlayPause}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Entypo
                            name="controller-play"
                            size={26}
                            color="black"
                          />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}}>
                      <Ionicons
                        name="play-skip-forward"
                        size={30}
                        color="white"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Feather name="refresh-cw" size={30} color="#FFA001" />
                    </TouchableOpacity>
              
                  </View>



                  <View className="mt-2.5 flex-row justify-between">
  <View className="flex-row items-center flex-1">
    <Image
      source={currentTrack?.track?.album?.images}
      className="w-10 h-10 rounded-full"
    />
    <Text className="text-white ml-2.5 flex-1">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum rerum totam nulla exercitationem molestiae sed, nam voluptates obcaecati 
      beatae accusamus. 
    </Text>
  </View>
</View>

              </>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ModalContent>
    </BottomModal>
    

    <Text className="text-white text-lg font-bold mx-2.5 mt-2.5">Hot Spots Played</Text>
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
    </LinearGradient>
  );
};
export default TopArtistScreen;

const styles = StyleSheet.create({

  sectionTitle: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
})