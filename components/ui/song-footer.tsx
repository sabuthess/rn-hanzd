import { useSongStore } from "@/zustand/store/useSongStore";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const SongFooter = () => {
  const image = require("@/assets/images/bg-img-song.jpg");

  const { queue, currentIndex, handleNext, isPlaying, togglePlay } =
    useSongStore();

  const currentSong = queue[currentIndex];

  return (
    <View style={styles.container_song_modal}>
      <Link
        href={{
          pathname: "/songs/[id]",
          params: { id: currentIndex },
        }}
        asChild
      >
        <Pressable style={styles.container_song_modal_info}>
          <Image source={image} style={styles.container_song_modal_img_info} />

          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 150 }}>
              {currentSong?.title}
            </Text>
            <Text>Unknown Artist</Text>
          </View>
        </Pressable>
      </Link>

      <View style={styles.container_songs_modal_btns_controllers}>
        {isPlaying ? (
          <Icon name="pause" size={30} onPress={togglePlay} />
        ) : (
          <Icon name="play" size={30} onPress={togglePlay} />
        )}

        <Icon
          name="play-skip-forward"
          size={30}
          color="black"
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

/* const styles = StyleSheet.create({
  container_song_modal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // alignItems: "center",
    width: "100%",
    // padding: 10,
    marginHorizontal: 0,
    borderRadius: 25,
    backgroundColor: "#38cf90",
  },

  container_song_modal_info: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    // backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  container_song_modal_img_info: {
    width: 35,
    height: 35,
    borderRadius: 5,
  },

  container_songs_modal_btns_controllers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
  },
}); */

const styles = StyleSheet.create({
  container_song_modal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // alignItems: "center",
    width: "90%",
    marginHorizontal: "auto",
    // padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    // backgroundColor: "#aab9b3",
    backgroundColor: "#8dc2ad",
  },

  container_song_modal_info: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // backgroundColor: "blue",
    // paddingHorizontal: 10,
    paddingVertical: 10,
  },

  container_song_modal_img_info: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },

  container_songs_modal_btns_controllers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
});
