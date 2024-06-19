import {
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { router } from "expo-router";
import SongItem from "../../components/SongItem";
import { SavedTracks, CommentsModal } from "../../constants/Data";
import { Player } from "../../context/PlayerContext";
import { BottomModal, ModalContent } from "react-native-modals";
import { Audio } from "expo-av";
import MusicCardList from "../../components/MusicCard";
import { debounce } from "lodash";
import EmptyState from "../../components/EmptyState";

const CommentsView = ({ comments }) => (
  <View className='flex-1 bg-white rounded-lg'>
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View className='flex-row p-2.5'>
          <Image
            source={item.image}
            className='w-10 h-10 rounded-full mr-2.5'
          />
          <View>
            <Text className='text-sm font-bold'>
              {item.profile}
            </Text>
            <Text className='text-base'>{item.text}</Text>
            <Text>Reply</Text>
          </View>
        </View>
      )}
    />
  </View>
);



const LikedSongs = () => {
  const [input, setInput] = useState("");
  const [savedTracks] = useState(SavedTracks);
  const { currentTrack, setCurrentTrack } = useContext(Player);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const value = useRef(0);
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const playTrack = async () => {
    if (SavedTracks.length > 0) {
      setCurrentTrack(SavedTracks[[0]]);
    }
    await play(SavedTracks[0]);
  };

  const play = async (nextTrack) => {
    console.log("Next track details:", nextTrack); // Log the nextTrack object for debugging

    const preview_url = nextTrack?.song_url.trim(); // Trim to remove any extra spaces
    if (!preview_url) {
      console.error("No preview URL found for the track");
      return;
    }

    try {
      if (currentSound) {
        await currentSound.stopAsync();
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });

      console.log("Starting to load the sound from URL:", preview_url); // Log before loading the sound

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: preview_url },
        { shouldPlay: true, isLooping: false },
        onPlaybackStatusUpdate
      );

      onPlaybackStatusUpdate(status);
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing the sound:", error.message); // Log any errors
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    console.log(status);
    if (status.isLoaded && status.isPlaying) {
      const progress = status.positionMillis / status.durationMillis;
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }

    if (status.didJustFinish) {
      setCurrentSound(null);
      playNextTrack();
    }
  };

  const circleSized = 12;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < savedTracks.length) {
      const nextTrack = savedTracks[value.current];
      setCurrentTrack(nextTrack);

      await play(nextTrack);
    } else {
      console.log("end of playlist");
    }
  };

  const playPreviousTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (value.current < savedTracks.length) {
      const nextTrack = savedTracks[value.current];
      setCurrentTrack(nextTrack);

      await play(nextTrack);
    } else {
      console.log("end of playlist");
    }
  };

  const debouncedSearch = debounce(handleSearch, 800);
  function handleSearch(text) {
    const filteredTracks = savedTracks.filter((item) =>
      item.track.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchedTracks(filteredTracks);
  }

  const handleInputChange = (text) => {
    setInput(text);
    debouncedSearch(text);
  };


  useEffect(() => {
    if(savedTracks.length > 0){
      handleSearch(input)
    }
  },[savedTracks])

  const renderHeader = () => (
    <View>
      <TouchableOpacity
        onPress={() => router.back()}
        className='mx-2.5 mt-12'
      >
        <Ionicons name="arrow-back" size={24} color="#FFA001" />
      </TouchableOpacity>

      <TouchableOpacity
        className='mx-2.5 flex-row items-center justify-between mt-2.5'
      >
        <TouchableOpacity
          className='flex-row items-center bg-purple-700 p-2.5 flex-1 rounded-sm h-9'
        >
          <AntDesign name="search1" size={20} color="white" />
          <TextInput
            value={input}
            onChangeText={(text) => handleInputChange(text)}
            placeholder="find top comment songs"
            placeholderTextColor={"white"}
            className='font-medium text-white'
          />
        </TouchableOpacity>
        <TouchableOpacity
          className='mx-2.5 bg-purple-700 p-2.5 rounded-sm h-9'
        >
          <Text className='text-white'>Search</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View className='h-12' />

      <View className='mx-2.5'>
        <Text className='text-lg font-bold text-white'>
          Top Comments
        </Text>
        <Text className='text-white text-xs mt-1.5'>
          280 songs
        </Text>
      </View>
      <TouchableOpacity
        className='flex-row items-center justify-between mx-2.5 mt-5'
      >
        <TouchableOpacity
          className='rounded-full bg-yellow-500 justify-center items-center'
          style={{
            width: 30,
            height: 30,
          }}
        >
          <AntDesign name="arrowdown" size={20} colors="white" />
        </TouchableOpacity>
        <View className='flex-row items-center gap-4'>
          <MaterialCommunityIcons
            name="cross-bolnisi"
            size={30}
            color="#FFA001"
          />
          <TouchableOpacity
            onPress={playTrack}
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
    </View>
  );


  return (
    <>
      <LinearGradient colors={["#040306", "#131624"]}  className="flex-1">

      {isSearching ? (
          <ActivityIndicator size="large" color="gray" className="mt-50" />
        ) : searchedTracks.length === 0 ? (
             <View style={{marginTop: 100}}>
          <EmptyState title="No Results" subtitle="Try a different search term" />
          </View>
        ) : (
          <FlatList
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          data={searchedTracks}
          renderItem={({ item }) => (
            <SongItem
              item={item}
              onPress={play}
              isPlaying={item === currentTrack}
            />
          )}
        />
        )}
      </LinearGradient>

      {currentTrack && (
             <TouchableOpacity
             onPress={() => setModalVisible(!modalVisible)}
             className="bg-[#5072A7] w-[90%] p-2 mx-auto mb-4 absolute rounded-md 
             left-5 bottom-2.5 flex-row justify-between items-center gap-2.5"
           >

<View className="flex-row items-center gap-1">
            <Image
              style={{ width: 40, height: 40 }}
              source={currentTrack.track.album.images}
            />
             <Text numberOfLines={1} className="text-xs w-46 text-white font-bold">

              {currentTrack.track.name} . {currentTrack.track.artists.name}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <AntDesign name="heart" size={24} color="#FFA001" />
            <TouchableOpacity>
              <AntDesign name="pausecircle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
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

            <View style={{ height: 70 }} />

            <FlatList
              data={[]}
              ListHeaderComponent={
                <>
                  <Image
                    style={{ width: "100%", height: 330, borderRadius: 4 }}
                    source={currentTrack?.track?.album?.images}
                  />
                        <View className="mt-5 flex-row justify-between">
                    <View>
                      <Text className="text-lg font-bold text-white">{currentTrack?.track?.name}</Text>
                      <Text className="text-[#D3D3D3] mt-1">{currentTrack?.track?.artists?.name}</Text>
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

                    <TouchableOpacity onPress={playPreviousTrack}>
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

                    <TouchableOpacity onPress={playNextTrack}>
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
                    <View className="flex-row items-center">
                      <Image source={{ uri: currentTrack?.track?.album?.images }} className="w-12.5 h-12.5 rounded-full" />
                      <Text className="text-white ml-2.5">{currentTrack?.track?.album?.name}</Text>
                    </View>
                    <View style={{ marginTop: 20, paddingRight: 100 }}>
                      <TouchableOpacity
                        onPress={() => setCommentsVisible(true)}
                      >
                       <View className="flex-row items-center">
                          <Text className="text-white font-bold text-lg align-self-start">1200 Comments</Text>
                          <Ionicons name="chevron-down" size={16} color="white" className="ml-1.25" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <MusicCardList />
                </>
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ModalContent>
      </BottomModal>

      <BottomModal
        visible={commentsVisible}
        onHardwareBackPress={() => setCommentsVisible(false)}
        swipeDirection={["down"]}
        swipeThreshold={200}
        className="mt-50 mb-[-25]"
      >
        <ModalContent className="h-[85%] w-full bg-white">
          <TouchableOpacity onPress={() => setCommentsVisible(false)} className="self-end p-2.5">
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black self-center font-bold text-lg">Comments</Text>
          <CommentsView comments={CommentsModal[0].comments} />
          <View className="flex-row items-center p-2.5 mb-[-17.5]">
            <AntDesign name="smileo" size={24} color="black" />
            <TextInput
              className="flex-1 ml-2.5 border border-gray-300 rounded-md p-1.25"
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default LikedSongs;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});
