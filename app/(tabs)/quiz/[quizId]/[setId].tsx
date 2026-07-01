import { useLocalSearchParams } from "expo-router";

import { QuizSetScreen } from "@/features/quiz/quiz-set-screen";

export default function QuizSetRoute() {
  const { quizId, setId } = useLocalSearchParams<{ quizId: string; setId: string }>();

  return (
    <QuizSetScreen
      quizId={Array.isArray(quizId) ? quizId[0] : quizId}
      setId={Array.isArray(setId) ? setId[0] : setId}
    />
  );
}
