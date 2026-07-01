import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { UserPreferencesProvider } from "@/context/user-preferences-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <UserPreferencesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="setup" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="coins" />
          <Stack.Screen name="coin-history" />
          <Stack.Screen name="buy-coins" />
          <Stack.Screen name="about" />
        </Stack>
        <StatusBar style="auto" />
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}
