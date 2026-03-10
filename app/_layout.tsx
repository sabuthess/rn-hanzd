import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';



export default function RootLayout() {
  const colorScheme = useColorScheme();

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
                <Icon name="search-outline" size={24} color="#333"  />
                <Icon name="ellipsis-vertical" size={24} color="#333"  />
              </>
            ),
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

