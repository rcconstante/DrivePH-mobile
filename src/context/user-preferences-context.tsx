import { createContext, use, useMemo, useState, type PropsWithChildren } from "react";

import { defaultPreferences, type UserPreferences } from "@/features/setup/preferences";

type UserPreferencesContextValue = {
  preferences: UserPreferences;
  updatePreferences: (nextPreferences: Partial<UserPreferences>) => void;
};

const UserPreferencesContext = createContext<UserPreferencesContextValue | null>(null);

export function UserPreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const value = useMemo<UserPreferencesContextValue>(
    () => ({
      preferences,
      updatePreferences: (nextPreferences) => {
        setPreferences((currentPreferences) => ({
          ...currentPreferences,
          ...nextPreferences,
        }));
      },
    }),
    [preferences],
  );

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = use(UserPreferencesContext);

  if (context == null) {
    throw new Error("useUserPreferences must be used within UserPreferencesProvider.");
  }

  return context;
}
