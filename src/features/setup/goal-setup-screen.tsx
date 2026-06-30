import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { useUserPreferences } from "@/context/user-preferences-context";
import { SelectionCard, SetupScreen } from "@/features/setup/components/setup-screen";
import { goalOptions, type GoalId } from "@/features/setup/preferences";

export function GoalSetupScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useUserPreferences();
  const [selectedGoal, setSelectedGoal] = useState<GoalId>(preferences.goal);

  const handleContinue = useCallback(() => {
    updatePreferences({ goal: selectedGoal });
    router.push("/setup/experience");
  }, [router, selectedGoal, updatePreferences]);

  return (
    <SetupScreen
      currentStep={2}
      totalSteps={3}
      title="What's your goal?"
      subtitle="Where are you on your driving journey?"
      primaryLabel="Continue"
      onPrimaryPress={handleContinue}
    >
      {goalOptions.map((goal) => (
        <SelectionCard
          key={goal.id}
          icon={goal.icon}
          iconColor={goal.iconColor}
          label={goal.label}
          description={goal.description}
          selected={selectedGoal === goal.id}
          onPress={() => setSelectedGoal(goal.id)}
        />
      ))}
    </SetupScreen>
  );
}
