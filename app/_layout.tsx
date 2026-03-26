import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";

import Icon from "react-native-vector-icons/Ionicons";
import ModalDrawer from "./modal";

export default function RootLayout() {
  const router = useRouter();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: "#fafafa" },
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
        <Stack.Screen name="scan" />
      </Stack>

      <StatusBar style="auto" />

      {isMenuActive && <ModalDrawer />}
    </>
  );
}
