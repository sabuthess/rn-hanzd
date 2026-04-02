import { SongItemCard } from "@/components/ui/song-item-card";
import { storage } from "@/utils/mmkv";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// const DATA = require("@/db/data.json");

export default function SongsScreen() {
  // const { songs } = useContext(SongContex);
  // const songs = [{ id: "asdfasdf", title: "All yours" }];

  const songsJson = storage.getString("@local_songs");
  const songs = JSON.parse(songsJson);

  return (
    <>
      <View>
        <View style={styles.container_info_songs}>
          <View style={styles.container_info_btns}>
            <Text>Play all (242) </Text>
          </View>
          <View style={styles.container_info_btns}>
            <Icon name="list-outline" size={24} color="#333" />
            <Icon name="swap-vertical" size={24} color="#333" />
          </View>
        </View>
      </View>

      {songs && (
        <FlatList
          style={styles.container_list}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={songs}
          renderItem={({ item }) => (
            <SongItemCard
              id={item.id}
              title={item.title}
              // uri={""}
              // artist={""} // artist={item.artist}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
