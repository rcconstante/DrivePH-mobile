import type { Href } from "expo-router";

export type QuizEntryOrigin = "learn" | "quiz";

export type QuizReturnInput = {
  categoryId: string;
  origin: QuizEntryOrigin;
  returnModuleId?: string;
  returnTopicId?: string;
};

export function getQuizReturnHref({
  categoryId,
  origin,
  returnModuleId,
  returnTopicId,
}: QuizReturnInput): Href {
  if (origin === "learn" && returnTopicId != null) {
    if (returnModuleId != null) {
      return {
        pathname: "/learn/[topicId]/[moduleId]",
        params: {
          moduleId: returnModuleId,
          topicId: returnTopicId,
        },
      };
    }

    return {
      pathname: "/learn/[topicId]",
      params: { topicId: returnTopicId },
    };
  }

  if (categoryId.length > 0) {
    return {
      pathname: "/quiz/[quizId]",
      params: { quizId: categoryId },
    };
  }

  return "/quiz";
}

export function normalizeQuizEntryOrigin(origin: string | undefined): QuizEntryOrigin {
  return origin === "learn" ? "learn" : "quiz";
}
