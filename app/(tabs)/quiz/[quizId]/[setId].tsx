import { useLocalSearchParams } from "expo-router";

import { normalizeQuizEntryOrigin } from "@/features/quiz/navigation";
import { QuizSetScreen } from "@/features/quiz/quiz-set-screen";

export default function QuizSetRoute() {
  const { origin, quizId, returnModuleId, returnTopicId, setId } = useLocalSearchParams<{
    origin?: string;
    quizId: string;
    returnModuleId?: string;
    returnTopicId?: string;
    setId: string;
  }>();

  return (
    <QuizSetScreen
      origin={normalizeQuizEntryOrigin(Array.isArray(origin) ? origin[0] : origin)}
      quizId={Array.isArray(quizId) ? quizId[0] : quizId}
      returnModuleId={Array.isArray(returnModuleId) ? returnModuleId[0] : returnModuleId}
      returnTopicId={Array.isArray(returnTopicId) ? returnTopicId[0] : returnTopicId}
      setId={Array.isArray(setId) ? setId[0] : setId}
    />
  );
}
