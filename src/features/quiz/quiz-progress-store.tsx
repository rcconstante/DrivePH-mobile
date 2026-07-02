import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

import { usePersistentState } from "@/hooks/use-persistent-state";
import { storageKeys } from "@/services/storage-keys";

type QuizProgressRecord = {
  bestScore: number;
  completedQuestions: number;
  totalQuestions: number;
};

export type QuizAttemptRecord = {
  allowBack: boolean;
  answersByQuestionId: Record<string, string>;
  autoCheck: boolean;
  currentIndex: number;
  questionOrder: string[];
  remainingSeconds: number;
  selectedChoiceId: string | null;
  submitted: boolean;
  updatedAt: number;
};

type QuizProgressContextValue = {
  clearQuizAttempt: (setId: string) => void;
  getQuizAttempt: (setId: string) => QuizAttemptRecord | null;
  getQuizProgress: (setId: string, totalQuestions: number) => QuizProgressRecord;
  getQuizProgressPercent: (setId: string, totalQuestions: number) => number;
  recordQuizResult: (setId: string, score: number, totalQuestions: number) => void;
  saveQuizAttempt: (setId: string, attempt: QuizAttemptRecord) => void;
};

const QuizProgressContext = createContext<QuizProgressContextValue | null>(null);
const emptyProgressRecords: Record<string, QuizProgressRecord> = {};
const emptyAttemptRecords: Record<string, QuizAttemptRecord> = {};

export function QuizProgressProvider({ children }: PropsWithChildren) {
  const [recordsBySetId, setRecordsBySetId] = usePersistentState<Record<string, QuizProgressRecord>>(
    storageKeys.quizProgress,
    emptyProgressRecords,
  );
  const [attemptsBySetId, setAttemptsBySetId] = usePersistentState<Record<string, QuizAttemptRecord>>(
    storageKeys.quizAttempts,
    emptyAttemptRecords,
  );

  const getQuizAttempt = useCallback(
    (setId: string) => attemptsBySetId[setId] ?? null,
    [attemptsBySetId],
  );

  const saveQuizAttempt = useCallback((setId: string, attempt: QuizAttemptRecord) => {
    setAttemptsBySetId((current) => ({
      ...current,
      [setId]: attempt,
    }));
  }, []);

  const clearQuizAttempt = useCallback((setId: string) => {
    setAttemptsBySetId((current) => {
      if (current[setId] == null) {
        return current;
      }

      const next = { ...current };
      delete next[setId];
      return next;
    });
  }, []);

  const getQuizProgress = useCallback(
    (setId: string, totalQuestions: number) =>
      recordsBySetId[setId] ?? {
        bestScore: 0,
        completedQuestions: 0,
        totalQuestions,
      },
    [recordsBySetId],
  );

  const getQuizProgressPercent = useCallback(
    (setId: string, totalQuestions: number) => {
      if (totalQuestions <= 0) {
        return 0;
      }

      return Math.round((getQuizProgress(setId, totalQuestions).completedQuestions / totalQuestions) * 100);
    },
    [getQuizProgress],
  );

  const recordQuizResult = useCallback((setId: string, score: number, totalQuestions: number) => {
    setRecordsBySetId((current) => {
      const currentRecord = current[setId];

      return {
        ...current,
        [setId]: {
          bestScore: Math.max(score, currentRecord?.bestScore ?? 0),
          completedQuestions: totalQuestions,
          totalQuestions,
        },
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      clearQuizAttempt,
      getQuizAttempt,
      getQuizProgress,
      getQuizProgressPercent,
      recordQuizResult,
      saveQuizAttempt,
    }),
    [
      clearQuizAttempt,
      getQuizAttempt,
      getQuizProgress,
      getQuizProgressPercent,
      recordQuizResult,
      saveQuizAttempt,
    ],
  );

  return <QuizProgressContext.Provider value={value}>{children}</QuizProgressContext.Provider>;
}

export function useQuizProgress() {
  const context = useContext(QuizProgressContext);

  if (context == null) {
    throw new Error("useQuizProgress must be used inside QuizProgressProvider");
  }

  return context;
}
