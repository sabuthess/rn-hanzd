import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// const DATA = require("@/db/data.json");
import { SongItemCard } from "@/components/song-item-card";
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
            <SongItemCard id={item.id} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_header: {
    flexDirection: "row", // Ya es flex por defecto
    justifyContent: "center", // Centra los elementos horizontalmente
    alignItems: "center", // Centra los elementos verticalmente
    marginVertical: 20,
    marginHorizontal: 30,
    gap: 10, // No funciona en RN, usamos margenes individuales abajo
  },

  header_item: {
    marginHorizontal: 10, // Esto reemplaza el 'gap' entre elementos
  },

  container_input: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#eee",
    width: "100%",
    alignSelf: "center",
  },

  input_text: {
    flex: 1,
    paddingVertical: 0,
  },

  input: {
    width: "100%",
    borderRadius: 25,
  },

  container_list: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    marginHorizontal: 20,
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
