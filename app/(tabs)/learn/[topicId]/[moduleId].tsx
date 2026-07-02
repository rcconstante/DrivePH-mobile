import { useLocalSearchParams } from "expo-router";

import { LearnSubmoduleScreen } from "@/features/learn/learn-submodule-screen";

export default function LearnSubmoduleRoute() {
  const { moduleId, topicId } = useLocalSearchParams<{
    moduleId: string;
    topicId: string;
  }>();

  return <LearnSubmoduleScreen moduleId={moduleId} topicId={topicId} />;
}
