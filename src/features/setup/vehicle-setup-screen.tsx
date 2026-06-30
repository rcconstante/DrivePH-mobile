import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { useUserPreferences } from "@/context/user-preferences-context";
import { SelectionCard, SetupScreen } from "@/features/setup/components/setup-screen";
import { setupHeroes, type VehicleId, vehicleOptions } from "@/features/setup/preferences";

export function VehicleSetupScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useUserPreferences();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleId>(
    preferences.vehicles[0] ?? "car",
  );

  const handleContinue = useCallback(() => {
    updatePreferences({ vehicles: [selectedVehicle] });
    router.push("/setup/goal");
  }, [router, selectedVehicle, updatePreferences]);

  return (
    <SetupScreen
      currentStep={1}
      totalSteps={3}
      title={"Choose Your\nVehicle"}
      subtitle="What are you learning to drive?"
      heroImage={setupHeroes.vehicle.image}
      heroImageLabel={setupHeroes.vehicle.imageLabel}
      primaryLabel="Continue"
      onPrimaryPress={handleContinue}
    >
      {vehicleOptions.map((vehicle) => (
        <SelectionCard
          key={vehicle.id}
          image={vehicle.image}
          imageLabel={vehicle.imageLabel}
          label={vehicle.label}
          description={vehicle.description}
          selected={selectedVehicle === vehicle.id}
          onPress={() => setSelectedVehicle(vehicle.id)}
        />
      ))}
    </SetupScreen>
  );
}
