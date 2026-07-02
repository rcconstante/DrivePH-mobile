import { Stack } from "expo-router/stack";

export default function LearnLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[topicId]" />
      <Stack.Screen name="[topicId]/[moduleId]" />
    </Stack>
  );
}
