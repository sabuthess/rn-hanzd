import { storage } from "@/utils/mmkv";
import { useSongStore } from "@/zustand/store/useSongStore";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ScanLocalSongsScreen() {
  const { setSongs } = useSongStore();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const requestPermissionAndLoadSongs = async () => {
    setLoading(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso denegado para acceder a la música");
        setLoading(false);
        return;
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 1000,
        sortBy: "creationTime",
      });

      const songs = media.assets.map(({ id, filename, uri }) => ({
        id,
        title: filename,
        uri,
      }));

      await storage.set("@local_songs", JSON.stringify(songs));
      setSongs(songs);
      // await AsyncStorage.setItem("@local_songs", );

      setLoading(false);
      router.back();

      // Navegar a la pantalla /songs
    } catch (error) {
      console.warn("Error cargando canciones", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.item}>Escanear canciones</Text>

        <Button
          title={loading ? "Cargando..." : "Pedir permiso y cargar canciones"}
          onPress={requestPermissionAndLoadSongs}
          disabled={loading}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 20,
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
  item: {
    marginBottom: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
