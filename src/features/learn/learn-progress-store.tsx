import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

import { learnStages, type LearnStageId } from "@/features/learn/data";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { storageKeys } from "@/services/storage-keys";

type CompletedStagesByTopic = Record<string, LearnStageId[]>;

type LearnProgressContextValue = {
  completeItem: (itemId: string, unitIds: string[]) => void;
  completeTopic: (topicId: string) => void;
  getCompletedStageCount: (topicId: string) => number;
  getCompletedStageIds: (topicId: string) => LearnStageId[];
  getCompletedUnitCount: (itemId: string) => number;
  getCompletedUnitIds: (itemId: string) => string[];
  getItemProgressPercent: (itemId: string, totalUnits: number) => number;
  getTopicProgressPercent: (topicId: string, totalStages?: number) => number;
  isItemCompleted: (itemId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  markStageComplete: (topicId: string, stageId: LearnStageId) => void;
  markUnitComplete: (itemId: string, unitId: string) => void;
};

const LearnProgressContext = createContext<LearnProgressContextValue | null>(null);
const emptyCompletedStagesByTopic: CompletedStagesByTopic = {};
const emptyCompletedTopicIds: string[] = [];
const emptyCompletedUnitsByItem: Record<string, string[]> = {};
const emptyCompletedItemIds: string[] = [];

export function LearnProgressProvider({ children }: PropsWithChildren) {
  const [completedStagesByTopic, setCompletedStagesByTopic] = usePersistentState<CompletedStagesByTopic>(
    storageKeys.learnCompletedStages,
    emptyCompletedStagesByTopic,
  );
  const [completedTopicIds, setCompletedTopicIds] = usePersistentState<string[]>(
    storageKeys.learnCompletedTopics,
    emptyCompletedTopicIds,
  );
  const [completedUnitsByItem, setCompletedUnitsByItem] = usePersistentState<Record<string, string[]>>(
    storageKeys.learnCompletedUnits,
    emptyCompletedUnitsByItem,
  );
  const [completedItemIds, setCompletedItemIds] = usePersistentState<string[]>(
    storageKeys.learnCompletedItems,
    emptyCompletedItemIds,
  );

  const getCompletedUnitIds = useCallback(
    (itemId: string) => completedUnitsByItem[itemId] ?? [],
    [completedUnitsByItem],
  );

  const getCompletedUnitCount = useCallback(
    (itemId: string) => getCompletedUnitIds(itemId).length,
    [getCompletedUnitIds],
  );

  const getItemProgressPercent = useCallback(
    (itemId: string, totalUnits: number) => {
      if (totalUnits <= 0) {
        return 0;
      }

      return Math.round((getCompletedUnitCount(itemId) / totalUnits) * 100);
    },
    [getCompletedUnitCount],
  );

  const isItemCompleted = useCallback(
    (itemId: string) => completedItemIds.includes(itemId),
    [completedItemIds],
  );

  const markUnitComplete = useCallback((itemId: string, unitId: string) => {
    setCompletedUnitsByItem((current) => {
      const itemUnitIds = current[itemId] ?? [];

      if (itemUnitIds.includes(unitId)) {
        return current;
      }

      return {
        ...current,
        [itemId]: [...itemUnitIds, unitId],
      };
    });
  }, []);

  const completeItem = useCallback((itemId: string, unitIds: string[]) => {
    setCompletedUnitsByItem((current) => ({
      ...current,
      [itemId]: unitIds,
    }));

    setCompletedItemIds((current) => {
      if (current.includes(itemId)) {
        return current;
      }

      return [...current, itemId];
    });
  }, []);

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
      completeItem,
      completeTopic,
      getCompletedStageCount,
      getCompletedStageIds,
      getCompletedUnitCount,
      getCompletedUnitIds,
      getItemProgressPercent,
      getTopicProgressPercent,
      isItemCompleted,
      isTopicCompleted,
      markStageComplete,
      markUnitComplete,
    }),
    [
      completeItem,
      completeTopic,
      getCompletedStageCount,
      getCompletedStageIds,
      getCompletedUnitCount,
      getCompletedUnitIds,
      getItemProgressPercent,
      getTopicProgressPercent,
      isItemCompleted,
      isTopicCompleted,
      markStageComplete,
      markUnitComplete,
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
