import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { useUserPreferences } from "@/context/user-preferences-context";
import { SelectionCard, SetupScreen } from "@/features/setup/components/setup-screen";
import {
  experienceOptions,
  setupHeroes,
  type ExperienceLevelId,
} from "@/features/setup/preferences";

export function ExperienceSetupScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useUserPreferences();
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevelId>(
    preferences.experienceLevel ?? "beginner",
  );

  const handleFinish = useCallback(() => {
    updatePreferences({ experienceLevel: selectedExperience });
    router.replace("/home");
  }, [router, selectedExperience, updatePreferences]);

  return (
    <SetupScreen
      currentStep={3}
      totalSteps={3}
      title={"Experience\nLevel"}
      subtitle="How confident are you behind the wheel?"
      heroImage={setupHeroes.experience.image}
      heroImageLabel={setupHeroes.experience.imageLabel}
      primaryLabel="Finish"
      primaryIcon="check"
      onPrimaryPress={handleFinish}
    >
      {experienceOptions.map((experience) => (
        <SelectionCard
          key={experience.id}
          image={experience.image}
          imageLabel={experience.imageLabel}
          label={experience.label}
          description={experience.description}
          selected={selectedExperience === experience.id}
          onPress={() => setSelectedExperience(experience.id)}
        />
      ))}
    </SetupScreen>
  );
}
