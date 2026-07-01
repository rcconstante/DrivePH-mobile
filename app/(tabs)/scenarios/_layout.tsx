import { Stack } from "expo-router/stack";

export default function ScenariosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[scenarioId]" />
    </Stack>
  );
}
