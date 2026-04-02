import { useSongStore } from "@/zustand/store/useSongStore";
import Slider from "@react-native-community/slider";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function SongDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const image = require("@/assets/images/bg-img-song.jpg");

  const {
    songs,
    currentIndex,
    setSongById,
    handleNext,
    handlePrev,
    isPlaying,
    togglePlay,
  } = useSongStore();

  const currentSong = songs[currentIndex];
  // console.log(currentSong);
  const player = useAudioPlayer(currentSong?.uri ?? "");

  const { setPlayer, setStatus, duration, currentTime } = useSongStore();

  useEffect(() => {
    if (id) setSongById(id);
  }, [id]);

  useEffect(() => {
    if (!player) return;

    setPlayer(player);

    const interval = setInterval(async () => {
      const status = await player.currentStatus;

      if (status?.isLoaded) {
        setStatus(status.currentTime ?? 0, status.duration ?? 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (currentSong?.uri) {
      player.replace(currentSong.uri);
    }
  }, [currentSong]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.container_info_song}>
          <Image source={image} style={styles.img} />

          <View style={styles.song_text}>
            <Text style={styles.title}>{currentSong?.title}</Text>
            <Text style={styles.artist}>Unknown artist - Music</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.container_btns_info}>
          <Icon name="heart-outline" size={25} color="#333" />
          <Icon name="moon" size={25} color="black" />
          <Icon name="notifications" size={25} color="black" />
          <Icon name="ellipsis-vertical" size={25} color="#333" />
        </View>

        {/* 🎚 SLIDER */}
        <View>
          <Slider
            style={{ width: "auto", height: 40 }}
            minimumValue={0}
            maximumValue={duration || 1}
            value={currentTime}
            onSlidingComplete={(value) => {
              player?.seekTo(value);
            }}
          />

          <View style={styles.container_info_slider}>
            <Text>{formatTime(currentTime)}</Text>
            <Text>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* 🎮 CONTROLES */}
        <View style={styles.container_btns_contoler_music}>
          <Icon name="shuffle" size={25} color="black" />

          <View style={styles.container_btn_play}>
            <Icon name="play-skip-back-sharp" size={45} onPress={handlePrev} />

            {isPlaying ? (
              <Icon name="pause" size={45} onPress={togglePlay} />
            ) : (
              <Icon name="play" size={45} onPress={togglePlay} />
            )}

            <Icon name="play-skip-forward" size={45} onPress={handleNext} />
          </View>

          <Icon name="list-outline" size={25} color="#333" />
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
    paddingTop: 10,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container_info_song: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  song_text: {
    alignItems: "center",
  },
  img: {
    width: "100%",
    maxWidth: 450,
    height: 300,
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
  },
  container_btns_info: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  container_info_slider: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
});
