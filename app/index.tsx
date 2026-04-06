import { SongFooter } from "@/components/ui/song-footer";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import SongsScreen from "./songs";

export default function HomeScreen() {
  const [activePage, setActivePage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const showScreen = (id: number) => {
    pagerRef.current?.setPage(id);
    setActivePage(id);
  };

  useEffect(() => {}, [pagerRef]);

  return (
    <>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: "#eee" }}> */}
      <View style={styles.root}>
        <View style={styles.container_scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text
              style={activePage === 0 ? styles.button_active : styles.button}
              onPress={() => showScreen(0)}
            >
              Songs
            </Text>
            <Text
              style={activePage === 1 ? styles.button_active : styles.button}
              onPress={() => showScreen(1)}
            >
              Favorites
            </Text>
            <Text
              style={activePage === 2 ? styles.button_active : styles.button}
              onPress={() => showScreen(2)}
            >
              Playlist
            </Text>
            <Text
              style={activePage === 3 ? styles.button_active : styles.button}
              onPress={() => showScreen(3)}
            >
              Artist
            </Text>
            <Text
              style={activePage === 4 ? styles.button_active : styles.button}
              onPress={() => showScreen(4)}
            >
              Albums
            </Text>
            <Text
              style={activePage === 5 ? styles.button_active : styles.button}
              onPress={() => showScreen(5)}
            >
              Folders
            </Text>
          </ScrollView>
        </View>

        <View style={styles.container_screens}>
          <PagerView
            onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
          >
            <SongsScreen key="1" />
            <View key="2">
              {/* <FavoritesScreen /> */}
              <Text>2</Text>
            </View>
            <View key="3">
              <Text>3</Text>
            </View>
            <View key="4">
              <Text>4</Text>
            </View>
            <View key="5">
              <Text>5</Text>
            </View>
          </PagerView>
        </View>
        <SongFooter />
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
