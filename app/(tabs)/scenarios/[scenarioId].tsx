import { useLocalSearchParams } from "expo-router";

import { ScenarioDetailScreen } from "@/features/scenarios/scenario-detail-screen";

export default function ScenarioDetailRoute() {
  const { scenarioId } = useLocalSearchParams<{ scenarioId: string }>();

  return <ScenarioDetailScreen scenarioId={scenarioId} />;
}
