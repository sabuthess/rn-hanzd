import { Link } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

export const SongItemSearchCard = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  return (
    <View style={styles.item}>
      <Link
        href={{
          pathname: "/songs/[id]",
          params: { id },
        }}
        asChild
      >
        <Pressable style={{ flex: 1 }}>
          <View style={styles.container_info}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
            <Text style={styles.artist}>Unknown artist - Music</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    paddingVertical: 10,
    // marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  container_info: {
    width: "100%",
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "medium",
    width: 300,
  },
  artist: {
    color: "#7a7a7a",
  },

  container_icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
});
