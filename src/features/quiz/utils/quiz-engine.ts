import type { QuizQuestion, QuizSet } from "@/features/quiz/data";
import type { QuizAttemptRecord } from "@/features/quiz/quiz-progress-store";

export const PASSING_PERCENT = 75;

export type QuizAnswerRecord = {
  correct: boolean;
  correctChoiceId: string;
  correctLabel: string;
  explanation: string;
  questionId: string;
  questionPrompt: string;
  selectedChoiceId: string;
  selectedLabel: string;
};

type RandomSource = () => number;

export function buildAnswerRecords(
  questions: QuizQuestion[],
  answersByQuestionId: Record<string, string>,
) {
  return questions
    .map((question) => {
      const selectedChoiceId = answersByQuestionId[question.id];
      const selectedChoice = question.choices.find((choice) => choice.id === selectedChoiceId);
      const correctChoice = question.choices.find((choice) => choice.id === question.answerId);

      if (correctChoice == null) {
        return null;
      }

      if (selectedChoiceId == null || selectedChoice == null) {
        return {
          questionId: question.id,
          questionPrompt: question.prompt,
          selectedChoiceId: "",
          selectedLabel: "No answer selected",
          correctChoiceId: correctChoice.id,
          correctLabel: correctChoice.label,
          correct: false,
          explanation: question.explanation,
        };
      }

      return {
        questionId: question.id,
        questionPrompt: question.prompt,
        selectedChoiceId,
        selectedLabel: selectedChoice.label,
        correctChoiceId: correctChoice.id,
        correctLabel: correctChoice.label,
        correct: selectedChoiceId === question.answerId,
        explanation: question.explanation,
      };
    })
    .filter((record): record is QuizAnswerRecord => record != null);
}

export function buildQuestionOrder({
  limit,
  questions,
  random = Math.random,
  randomize,
}: {
  limit: number | undefined;
  questions: QuizQuestion[];
  random?: RandomSource;
  randomize: boolean;
}) {
  const questionIds = questions.map((question) => question.id);
  const orderedIds = randomize ? shuffleItems(questionIds, random) : questionIds;

  return orderedIds.slice(0, limit ?? orderedIds.length);
}

export function clampIndex(index: number, itemCount: number) {
  if (itemCount <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index, itemCount - 1));
}

export function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function getQuizDurationSeconds(
  quizSet: Pick<QuizSet, "durationMinutes" | "estimatedMinutes"> | null | undefined,
  fallbackQuestionCount: number,
) {
  if (quizSet?.durationMinutes != null) {
    return quizSet.durationMinutes * 60;
  }

  const estimatedMinutes = parseEstimatedMinutes(quizSet?.estimatedMinutes);

  if (estimatedMinutes > 0) {
    return estimatedMinutes * 60;
  }

  return Math.max(fallbackQuestionCount, 5) * 60;
}

export function getQuizScore(records: QuizAnswerRecord[]) {
  return records.filter((record) => record.correct).length;
}

export function getQuizScorePercent(score: number, totalQuestions: number) {
  if (totalQuestions <= 0) {
    return 0;
  }

  return Math.round((score / totalQuestions) * 100);
}

export function getRestoredQuestionOrder(
  savedAttempt: QuizAttemptRecord | null,
  fallbackOrder: string[],
  questions: QuizQuestion[],
) {
  if (savedAttempt == null || savedAttempt.questionOrder.length === 0) {
    return fallbackOrder;
  }

  const validQuestionIds = new Set(questions.map((question) => question.id));
  const restoredOrder = savedAttempt.questionOrder.filter((questionId) => validQuestionIds.has(questionId));

  return restoredOrder.length > 0 ? restoredOrder : fallbackOrder;
}

export function isPassingScore(score: number, totalQuestions: number) {
  return getQuizScorePercent(score, totalQuestions) >= PASSING_PERCENT;
}

export function shuffleItems<TItem>(items: TItem[], random: RandomSource = Math.random) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const currentItem = shuffled[index]!;
    shuffled[index] = shuffled[swapIndex]!;
    shuffled[swapIndex] = currentItem;
  }

  return shuffled;
}

function parseEstimatedMinutes(value: string | undefined) {
  if (value == null) {
    return 0;
  }

  const matches = value.match(/\d+/g);

  if (matches == null || matches.length === 0) {
    return 0;
  }

  return Number(matches[matches.length - 1]);
}
