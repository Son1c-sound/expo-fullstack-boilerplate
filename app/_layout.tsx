import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SuperwallProvider } from "expo-superwall"
import { useColorScheme } from '@/hooks/useColorScheme';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';

const convex = new ConvexReactClient("https://cautious-guanaco-154.convex.cloud")

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ClerkProvider
    tokenCache={tokenCache}
    publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
  >
    <ClerkLoaded>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <SuperwallProvider apiKeys={{ ios: "YOUR_SUPERWALL_API_KEY", android: "pk_722d4d8b7a1a8fc99596baa5b04f3d9f96f74c3358be1adb" }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SuperwallProvider>
    </ConvexProviderWithClerk>
    </ClerkLoaded>
    </ClerkProvider>
  );
}
