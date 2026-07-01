import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { UserPreferencesProvider } from "@/context/user-preferences-context";
import { CoinProvider } from "@/features/coins/coin-store";
import { LearnProgressProvider } from "@/features/learn/learn-progress-store";
import { QuizProgressProvider } from "@/features/quiz/quiz-progress-store";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <UserPreferencesProvider>
        <CoinProvider>
          <LearnProgressProvider>
            <QuizProgressProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="setup" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="coins" />
                <Stack.Screen name="coin-history" />
                <Stack.Screen name="buy-coins" />
                <Stack.Screen name="about" />
                <Stack.Screen name="appearance" />
                <Stack.Screen name="language" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="help-support" />
                <Stack.Screen name="terms" options={{ presentation: "modal" }} />
              </Stack>
            </QuizProgressProvider>
          </LearnProgressProvider>
          <StatusBar style="auto" />
        </CoinProvider>
      </UserPreferencesProvider>
    </ThemeProvider>
  );
}
