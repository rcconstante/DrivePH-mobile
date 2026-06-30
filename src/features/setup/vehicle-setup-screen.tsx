import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";

import { useUserPreferences } from "@/context/user-preferences-context";
import { SelectionCard, SetupScreen } from "@/features/setup/components/setup-screen";
import {
  multipleVehicleOption,
  type VehicleId,
  vehicleOptions,
} from "@/features/setup/preferences";

const allVehicleIds = vehicleOptions.map((vehicle) => vehicle.id);

export function VehicleSetupScreen() {
  const router = useRouter();
  const { preferences, updatePreferences } = useUserPreferences();
  const [selectedVehicles, setSelectedVehicles] = useState<VehicleId[]>(preferences.vehicles);

  const hasAllVehicles = selectedVehicles.length === allVehicleIds.length;
  const canContinue = selectedVehicles.length > 0;

  const selectedVehicleSet = useMemo(() => new Set(selectedVehicles), [selectedVehicles]);

  const toggleVehicle = useCallback((vehicleId: VehicleId) => {
    setSelectedVehicles((currentVehicles) => {
      if (currentVehicles.includes(vehicleId)) {
        const nextVehicles = currentVehicles.filter((currentVehicle) => currentVehicle !== vehicleId);
        return nextVehicles.length > 0 ? nextVehicles : currentVehicles;
      }

      return [...currentVehicles, vehicleId];
    });
  }, []);

  const toggleAllVehicles = useCallback(() => {
    setSelectedVehicles((currentVehicles) =>
      currentVehicles.length === allVehicleIds.length ? ["car"] : allVehicleIds,
    );
  }, []);

  const handleContinue = useCallback(() => {
    updatePreferences({ vehicles: selectedVehicles });
    router.push("/setup/goal");
  }, [router, selectedVehicles, updatePreferences]);

  return (
    <SetupScreen
      currentStep={1}
      totalSteps={3}
      title="Choose Your Vehicle"
      subtitle="What are you learning to drive?"
      primaryLabel="Continue"
      primaryDisabled={!canContinue}
      onPrimaryPress={handleContinue}
    >
      {vehicleOptions.map((vehicle) => (
        <SelectionCard
          key={vehicle.id}
          icon={vehicle.icon}
          iconColor={vehicle.iconColor}
          label={vehicle.label}
          description={vehicle.description}
          selected={selectedVehicleSet.has(vehicle.id)}
          onPress={() => toggleVehicle(vehicle.id)}
        />
      ))}
      <SelectionCard
        icon={multipleVehicleOption.icon}
        iconColor={multipleVehicleOption.iconColor}
        label={multipleVehicleOption.label}
        description={multipleVehicleOption.description}
        selected={hasAllVehicles}
        onPress={toggleAllVehicles}
      />
    </SetupScreen>
  );
}
