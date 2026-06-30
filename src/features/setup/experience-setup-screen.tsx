import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { useUserPreferences } from "@/context/user-preferences-context";
import { SelectionCard, SetupScreen } from "@/features/setup/components/setup-screen";
import { experienceOptions, type ExperienceLevelId } from "@/features/setup/preferences";

export function ExperienceSetupScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useUserPreferences();
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevelId | null>(
    preferences.experienceLevel,
  );

  const handleFinish = useCallback(() => {
    updatePreferences({ experienceLevel: selectedExperience });
    router.replace("/home");
  }, [router, selectedExperience, updatePreferences]);

  return (
    <SetupScreen
      currentStep={3}
      totalSteps={3}
      title="Experience Level"
      subtitle="How confident are you behind the wheel?"
      primaryLabel="Finish"
      onPrimaryPress={handleFinish}
    >
      {experienceOptions.map((experience) => (
        <SelectionCard
          key={experience.id}
          icon={experience.icon}
          iconColor={experience.iconColor}
          label={experience.label}
          description={experience.description}
          selected={selectedExperience === experience.id}
          onPress={() => setSelectedExperience(experience.id)}
        />
      ))}
    </SetupScreen>
  );
}
