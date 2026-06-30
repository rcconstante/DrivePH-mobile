import { useLocalSearchParams } from "expo-router";

import { LearnTopicScreen } from "@/features/learn/learn-topic-screen";

export default function LearnTopicRoute() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();

  return <LearnTopicScreen topicId={topicId} />;
}
