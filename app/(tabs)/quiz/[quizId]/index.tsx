import { useLocalSearchParams } from "expo-router";

import { QuizCategoryScreen } from "@/features/quiz/quiz-category-screen";

export default function QuizCategoryRoute() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();

  return <QuizCategoryScreen quizId={Array.isArray(quizId) ? quizId[0] : quizId} />;
}
