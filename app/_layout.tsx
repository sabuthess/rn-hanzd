import { GlobalPlayer } from "@/components/global-player";
import ModalDrawer from "@/components/ui/modal-drawer";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";

import Icon from "react-native-vector-icons/Ionicons";

export default function RootLayout() {
  const router = useRouter();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const handleMenuActive = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: "#eee" },
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
                <Icon name="search-outline" size={24} color="#333" />
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
          name="scan/index"
          options={{ headerTitle: "Scan local songs" }}
        />
        <Stack.Screen
          name="playlists/index"
          options={{ headerTitle: "Scan local songs" }}
        />
      </Stack>

      <StatusBar style="auto" />

      {isMenuActive && <ModalDrawer handleMenuActive={handleMenuActive} />}
      <GlobalPlayer />
    </>
  );
}
