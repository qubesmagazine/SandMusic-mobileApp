import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RecentlyPlayedThree } from "../constants/Data";

const MusicCard = ({ track }) => (
  <TouchableOpacity>
    <View style={styles.cardContainer}>
      <Image
        source={track.album.images}
        style={styles.albumImage}
        resizeMode="cover"
      />
      <Text style={styles.trackName}>{track.name}</Text>
      <Text style={styles.trackTitle}>{track.title}</Text>
      <Ionicons
        name="headset-outline"
        size={24}
        color="#FFA001"
        style={styles.leftIcon}
      />
      <Ionicons
        name="volume-high-outline"
        size={24}
        color="#FFA001"
        style={styles.rightIcon}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    position: "relative",
  },
  albumImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  trackName: {
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    top: 160,
    left: 30,
    backgroundColor: "#778899",
    padding: 4,
  },
  trackTitle: {
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    top: 140,
    left: 50,
    backgroundColor: "#778899",
    padding: 4,
  },
  leftIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  rightIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

const MusicCardList = () => (
  <FlatList
    data={RecentlyPlayedThree}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => <MusicCard track={item.track} />}
    contentContainerStyle={{ padding: 10 }}
  />
);

export default MusicCardList;
