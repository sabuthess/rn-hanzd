import { SafeAreaView } from "react-native-safe-area-context";

import { formatText } from "@/utils/format-song";
import { storage } from "@/utils/mmkv";
import { useSongStore } from "@/zustand/store/useSongStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import TrackPlayer from "react-native-track-player";
import Icon from "react-native-vector-icons/Ionicons";

export default function SongDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    queue,
    currentIndex,
    setSongById,
    handleNext,
    handlePrev,
    isPlaying,
    togglePlay,
  } = useSongStore();
  const currentSong = queue[currentIndex];

  console.log("current idx", currentIndex);
  console.log("id song", id);

  const image = require("@/assets/images/child-background-img.jpg");

  useEffect(() => {
    if (id) setSongById(id);
  }, [id]);

  useEffect(() => {
    async function loadSong() {
      const storedSongs = await storage.getString("@local_songs");
      const parsedSongs: any = storedSongs ? JSON.parse(storedSongs) : [];

      const currentSong = parsedSongs.findIndex((s) => s.id === id);

      // await TrackPlayer.reset();

      await TrackPlayer.add({
        id: currentSong.id,
        url: currentSong.uri,
        title: currentSong.title,
        artist: "Unknown artist",
      });

      await TrackPlayer.play();
    }

    loadSong();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_info_song}>
        <Image source={image} style={styles.img} />

        <View>
          <Text numberOfLines={3} ellipsizeMode="clip" style={styles.title}>
            {formatText(currentSong?.title)}
          </Text>
          <Text style={styles.artist}>Unknown artist</Text>
        </View>
      </View>

      <View style={styles.container_btn_play}>
        <View style={styles.btn_wrapper}>
          <Icon name="play-skip-back" size={45} onPress={handlePrev} />
        </View>

        <View style={styles.btn_wrapper}>
          {isPlaying ? (
            <Icon name="pause" size={45} onPress={togglePlay} />
          ) : (
            <Icon name="play" size={45} onPress={togglePlay} />
          )}
        </View>

        <View style={styles.btn_wrapper}>
          <Icon name="play-skip-forward" size={45} onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container_info_song: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },

  img: {
    width: "100%",
    maxWidth: 450,
    height: 300,
    marginHorizontal: 90,
    borderRadius: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  artist: {
    fontSize: 16,
    color: "#7a7a7a",
    textAlign: "center",
  },

  container_btns_contoler_music: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  container_btn_play: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  btn_wrapper: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
