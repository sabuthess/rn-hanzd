import { GlobalPlayer } from "@/components/global-player";
import { setAudioModeAsync } from "expo-audio";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import ModalDrawer from "../components/modal-drawer";

export default function RootLayout() {
  const router = useRouter();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const handleMenuActive = () => {
    setIsMenuActive(!isMenuActive);
  };
  useEffect(() => {
    const setupAudio = async () => {
      await setAudioModeAsync({
        // staysActiveInBackground: true,
        shouldPlayInBackground: true,
        interruptionMode: "mixWithOthers",

        playsInSilentMode: true,
      });
    };

    setupAudio();
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            headerTitle: "All songs",
            headerRight: () => (
              <View
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  gap: 30,
                }}
              >
                <Pressable onPress={() => router.push("/search")}>
                  <Icon name="search-outline" size={24} color="#333" />
                </Pressable>

                <Pressable onPress={() => setIsMenuActive(!isMenuActive)}>
                  <Icon name="ellipsis-vertical" size={24} color="#333" />
                </Pressable>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="songs/[id]"
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: "Song",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ paddingHorizontal: 16 }}
              >
                <Icon name="chevron-down" size={24} color="#333" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="scan"
          options={{
            headerTitle: "Scan local songs",

            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="upload"
          options={{
            headerTitle: "Upload local songs",

            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="download"
          options={{
            headerTitle: "Download songs",

            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="search"
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="auth"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
      {isMenuActive && <ModalDrawer handleMenuActive={handleMenuActive} />}
      <GlobalPlayer />
    </>
  );
}
