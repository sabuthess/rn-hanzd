import { SongItemSearchCard } from "@/components/ui/song-item-search-card";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// const DATA = require("@/db/data.json");
import { ISong } from "@/interfaces/song.interface";
import { useSongStore } from "@/zustand/store/useSongStore";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function SearchScreen() {
  const [inputValue, setInputValue] = useState<string>("");
  const [songsFiltered, setSongsFiltered] = useState<ISong[] | undefined>();

  const { songs } = useSongStore();
  const router = useRouter();

  useEffect(() => {
    const filtered = songs.filter((song: ISong) =>
      song.title.toLowerCase().includes(inputValue.toLowerCase()),
    );

    setSongsFiltered(filtered);
  }, [inputValue]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container_header}>
        <AntDesign
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
        <View style={styles.container_input}>
          <EvilIcons name="search" size={24} color="#555" />
          <TextInput style={styles.input} onChangeText={setInputValue} />
        </View>
      </View>

      {songsFiltered && (
        <FlatList
          style={styles.container_list}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={songsFiltered}
          renderItem={({ item }) => (
            <SongItemSearchCard id={item.id} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_header: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    margin: 20,
    // flex: 1,
    width: "100%",
    alignItems: "center",
  },
  container_input: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 25,
    // paddingHorizontal: 10,
    width: "70%",
    backgroundColor: "#eee",
  },

  input: {
    // backgroundColor: "#000",
    width: "100%",
    borderRadius: 25,
  },

  container_list: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    marginHorizontal: 20,
    // marginVertical: 10,
  },

  container_info_songs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },

  container_btn_play: {
    height: 30,
    width: 30,
    backgroundColor: "#16a085",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    color: "#fff",
  },
  container_info_btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  item_info: {
    marginVertical: 10,
  },
});
