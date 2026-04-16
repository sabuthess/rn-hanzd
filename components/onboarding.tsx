import { storage } from "@/utils/mmkv";
import { useSongStore } from "@/zustand/store/useSongStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");
const ONBOARDING_KEY = "@onboarding_seen";

export function Onboarding({ onFinish }) {
  const { setSongs } = useSongStore();
  const scrollRef = useRef(null);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFinish = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    onFinish?.();
  };

  const goToSlide = (index) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < 2) {
      goToSlide(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  const requestPermissionAndLoadSongs = async () => {
    setLoadingPermissions(true);
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso denegado para acceder a la música");
        setLoadingPermissions(false);
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
      goToSlide(currentIndex + 1);
    } catch (error) {
      console.warn("Error cargando canciones", error);
      setLoadingPermissions(false);
    }
  };

  useEffect(() => {}, [loadingPermissions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleFinish}>
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {/* Slide 1 */}
        <View style={styles.slide}>
          <View>
            <Text style={styles.title}>Bienvenido 🎧</Text>
            <Text style={styles.subtitle}>
              Descubre y reproduce tu música favorita
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.slide}>
          <Text style={styles.title}>Algo interesante aqui!</Text>
          <Text style={styles.subtitle}>
            Agrega canciones y controla la reproducción
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={requestPermissionAndLoadSongs}
          >
            <Text style={styles.buttonText}>
              {loadingPermissions ? "Cargando..." : "Escanear canciones"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.slide}>
          <View>
            <Text style={styles.title}>Hemos terminado</Text>
            <Text style={styles.subtitle}>
              Disfruta de tu música sin interrupciones
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <Text style={styles.buttonText}>Empezar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export const checkIfOnboardingSeen = async () => {
  const value = await AsyncStorage.getItem(ONBOARDING_KEY);
  return value === "true";
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  skipButton: { position: "absolute", top: 50, right: 20, zIndex: 10 },
  skipText: { fontSize: 16, color: "#16a085", fontWeight: "bold" },
  slide: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: { fontSize: 16, textAlign: "center", color: "#555" },

  button: {
    backgroundColor: "#16a085",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30,
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#16a085",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  buttonTextSecondary: { color: "#16a085", fontWeight: "bold" },
  item: {
    marginBottom: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
