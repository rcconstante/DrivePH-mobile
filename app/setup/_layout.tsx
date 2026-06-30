import { Stack } from "expo-router/stack";

export default function SetupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="vehicle" />
      <Stack.Screen name="goal" />
      <Stack.Screen name="experience" />
    </Stack>
  );
}
