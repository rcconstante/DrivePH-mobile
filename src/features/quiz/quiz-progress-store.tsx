import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type QuizProgressRecord = {
  bestScore: number;
  completedQuestions: number;
  totalQuestions: number;
};

type QuizProgressContextValue = {
  getQuizProgress: (setId: string, totalQuestions: number) => QuizProgressRecord;
  getQuizProgressPercent: (setId: string, totalQuestions: number) => number;
  recordQuizResult: (setId: string, score: number, totalQuestions: number) => void;
};

const QuizProgressContext = createContext<QuizProgressContextValue | null>(null);

export function QuizProgressProvider({ children }: PropsWithChildren) {
  const [recordsBySetId, setRecordsBySetId] = useState<Record<string, QuizProgressRecord>>({});

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
      getQuizProgress,
      getQuizProgressPercent,
      recordQuizResult,
    }),
    [getQuizProgress, getQuizProgressPercent, recordQuizResult],
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
