import { Stack } from "expo-router/stack";

export default function QuizLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[quizId]/index" />
      <Stack.Screen name="[quizId]/[setId]" />
    </Stack>
  );
}
