import { SongFooter } from "@/components/song-footer";
import { useSongStore } from "@/zustand/store/useSongStore";
import { StyleSheet, View } from "react-native";
import SongsScreen from "./songs";

export default function HomeScreen() {
  const { queue, currentIndex } = useSongStore();

  const currentSong = queue[currentIndex];
  return (
    <>
      <View style={styles.root}>
        <SongsScreen />
        {currentSong?.title && <SongFooter />}
        {/* <Auth /> */}
        {/* <GlobalPlayer /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {},

  container_scroll: {
    display: "flex",
    gap: 30,
    maxHeight: 70,
  },

  container_screens: {
    flex: 1,
  },

  button: {
    color: "#000",
    marginHorizontal: 20,
  },

  button_active: {
    marginHorizontal: 20,
    color: "#16a085",
  },
});
