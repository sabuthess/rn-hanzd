import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>

        <Stack.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: "#fafafa" },
            headerShadowVisible: false,
            headerTitle: "All songs",
            headerRight: () => (
              <>
                <Icon name="search-outline" size={24} color="#333" />
                <Icon name="ellipsis-vertical" size={24} color="#333" />
              </>
            ),
          }}
        />
        <Stack.Screen name='songs/[id]' options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "Song",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 16 }}>
              <Icon name="chevron-down" size={24} color="#333" />
            </TouchableOpacity>
          ),

        }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

