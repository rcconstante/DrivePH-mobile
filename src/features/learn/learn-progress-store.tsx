import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { learnStages, type LearnStageId } from "@/features/learn/data";

type CompletedStagesByTopic = Record<string, LearnStageId[]>;

type LearnProgressContextValue = {
  completeTopic: (topicId: string) => void;
  getCompletedStageCount: (topicId: string) => number;
  getCompletedStageIds: (topicId: string) => LearnStageId[];
  getTopicProgressPercent: (topicId: string, totalStages?: number) => number;
  isTopicCompleted: (topicId: string) => boolean;
  markStageComplete: (topicId: string, stageId: LearnStageId) => void;
};

const LearnProgressContext = createContext<LearnProgressContextValue | null>(null);

export function LearnProgressProvider({ children }: PropsWithChildren) {
  const [completedStagesByTopic, setCompletedStagesByTopic] = useState<CompletedStagesByTopic>({});
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  const getCompletedStageIds = useCallback(
    (topicId: string) => completedStagesByTopic[topicId] ?? [],
    [completedStagesByTopic],
  );

  const getCompletedStageCount = useCallback(
    (topicId: string) => getCompletedStageIds(topicId).length,
    [getCompletedStageIds],
  );

  const getTopicProgressPercent = useCallback(
    (topicId: string, totalStages = learnStages.length) => {
      if (totalStages <= 0) {
        return 0;
      }

      return Math.round((getCompletedStageCount(topicId) / totalStages) * 100);
    },
    [getCompletedStageCount],
  );

  const isTopicCompleted = useCallback(
    (topicId: string) => completedTopicIds.includes(topicId),
    [completedTopicIds],
  );

  const markStageComplete = useCallback((topicId: string, stageId: LearnStageId) => {
    setCompletedStagesByTopic((current) => {
      const topicStageIds = current[topicId] ?? [];

      if (topicStageIds.includes(stageId)) {
        return current;
      }

      return {
        ...current,
        [topicId]: [...topicStageIds, stageId],
      };
    });
  }, []);

  const completeTopic = useCallback((topicId: string) => {
    setCompletedStagesByTopic((current) => ({
      ...current,
      [topicId]: learnStages.map((stage) => stage.id),
    }));

    setCompletedTopicIds((current) => {
      if (current.includes(topicId)) {
        return current;
      }

      return [...current, topicId];
    });
  }, []);

  const value = useMemo(
    () => ({
      completeTopic,
      getCompletedStageCount,
      getCompletedStageIds,
      getTopicProgressPercent,
      isTopicCompleted,
      markStageComplete,
    }),
    [
      completeTopic,
      getCompletedStageCount,
      getCompletedStageIds,
      getTopicProgressPercent,
      isTopicCompleted,
      markStageComplete,
    ],
  );

  return <LearnProgressContext.Provider value={value}>{children}</LearnProgressContext.Provider>;
}

export function useLearnProgress() {
  const context = useContext(LearnProgressContext);

  if (context == null) {
    throw new Error("useLearnProgress must be used inside LearnProgressProvider");
  }

  return context;
}
