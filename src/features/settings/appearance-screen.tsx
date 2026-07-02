import { Pressable, StyleSheet, Text, View } from "react-native";

import { SettingsPage, SettingsSection } from "@/components/settings/settings-page";
import {
  CheckIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  type IconComponent,
} from "@/components/ui/icons";
import {
  appearanceOptions,
  type AppearanceOption,
  type AppearanceOptionId,
} from "@/features/settings/settings-options";
import { usePersistentState } from "@/hooks/use-persistent-state";
import { storageKeys } from "@/services/storage-keys";

const defaultAppearance: AppearanceOptionId = "light";

export function AppearanceScreen() {
  const [selectedAppearance, setSelectedAppearance] =
    usePersistentState<AppearanceOptionId>(storageKeys.settingsAppearance, defaultAppearance);

  return (
    <SettingsPage
      testID="appearance-screen"
      title="Appearance"
      subtitle="Choose how DrivePH Guide should look."
    >
      <AppearancePreview mode={selectedAppearance} />

      <SettingsSection title="Display Mode">
        <View style={styles.optionList}>
          {appearanceOptions.map((option) => (
            <AppearanceOptionCard
              key={option.id}
              option={option}
              onPress={() => setSelectedAppearance(option.id)}
              selected={selectedAppearance === option.id}
            />
          ))}
        </View>
      </SettingsSection>
    </SettingsPage>
  );
}

function AppearancePreview({ mode }: { mode: AppearanceOptionId }) {
  const isDark = mode === "dark";

  return (
    <View style={[styles.previewCard, isDark ? styles.previewCardDark : null]}>
      <View style={styles.previewHeader}>
        <Text style={[styles.previewTitle, isDark ? styles.previewTitleDark : null]}>
          {mode === "system" ? "System Preview" : `${mode === "dark" ? "Dark" : "Light"} Preview`}
        </Text>
        <View style={[styles.previewPill, isDark ? styles.previewPillDark : null]}>
          {isDark ? (
            <MoonIcon color="#ffffff" size={14} strokeWidth={2.2} />
          ) : (
            <SunIcon color="#2f973b" size={14} strokeWidth={2.2} />
          )}
          <Text style={[styles.previewPillText, isDark ? styles.previewPillTextDark : null]}>
            {mode === "system" ? "Auto" : mode}
          </Text>
        </View>
      </View>

      <View style={[styles.previewSurface, isDark ? styles.previewSurfaceDark : null]}>
        <View style={[styles.previewHero, isDark ? styles.previewHeroDark : null]} />
        <View style={styles.previewRows}>
          <View style={[styles.previewLine, isDark ? styles.previewLineDark : null]} />
          <View style={[styles.previewLineShort, isDark ? styles.previewLineDark : null]} />
        </View>
      </View>
    </View>
  );
}

function AppearanceOptionCard({
  onPress,
  option,
  selected,
}: {
  onPress: () => void;
  option: AppearanceOption;
  selected: boolean;
}) {
  const Icon = getAppearanceIcon(option.id);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={option.label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionCard,
        selected ? styles.optionCardSelected : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.optionIcon, option.id === "dark" ? styles.optionIconDark : null]}>
        <Icon
          color={option.id === "dark" ? "#ffffff" : "#2f973b"}
          size={20}
          strokeWidth={2.1}
        />
      </View>
      <View style={styles.optionCopy}>
        <Text style={styles.optionTitle}>{option.label}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
      <View style={[styles.selector, selected ? styles.selectorSelected : null]}>
        {selected ? <CheckIcon color="#ffffff" size={14} strokeWidth={2.5} /> : null}
      </View>
    </Pressable>
  );
}

function getAppearanceIcon(optionId: AppearanceOptionId): IconComponent {
  if (optionId === "light") {
    return SunIcon;
  }

  if (optionId === "dark") {
    return MoonIcon;
  }

  return SettingsIcon;
}

const styles = StyleSheet.create({
  optionCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    gap: 12,
    minHeight: 70,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  optionCardSelected: {
    backgroundColor: "#f7fff7",
  },
  optionCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  optionDescription: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  optionIcon: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 13,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  optionIconDark: {
    backgroundColor: "#172230",
  },
  optionList: {
    overflow: "hidden",
  },
  optionTitle: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.86,
  },
  previewCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.05)",
    gap: 12,
    padding: 14,
  },
  previewCardDark: {
    backgroundColor: "#111827",
    borderColor: "#243042",
  },
  previewHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewHero: {
    backgroundColor: "#e8f7df",
    borderRadius: 12,
    height: 54,
    width: 78,
  },
  previewHeroDark: {
    backgroundColor: "#255c31",
  },
  previewLine: {
    backgroundColor: "#d6e4da",
    borderRadius: 999,
    height: 9,
    width: "88%",
  },
  previewLineDark: {
    backgroundColor: "#324154",
  },
  previewLineShort: {
    backgroundColor: "#d6e4da",
    borderRadius: 999,
    height: 9,
    width: "58%",
  },
  previewPill: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 999,
    flexDirection: "row",
    gap: 5,
    height: 28,
    paddingHorizontal: 10,
  },
  previewPillDark: {
    backgroundColor: "#233044",
  },
  previewPillText: {
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    textTransform: "capitalize",
  },
  previewPillTextDark: {
    color: "#ffffff",
  },
  previewRows: {
    flex: 1,
    gap: 9,
    justifyContent: "center",
  },
  previewSurface: {
    alignItems: "center",
    backgroundColor: "#fbfcf8",
    borderColor: "#edf2ef",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 96,
    padding: 12,
  },
  previewSurfaceDark: {
    backgroundColor: "#172230",
    borderColor: "#26364b",
  },
  previewTitle: {
    color: "#061b49",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
  previewTitleDark: {
    color: "#ffffff",
  },
  selector: {
    alignItems: "center",
    borderColor: "#d9dee7",
    borderRadius: 11,
    borderWidth: 2,
    height: 22,
    justifyContent: "center",
    width: 22,
  },
  selectorSelected: {
    backgroundColor: "#3da847",
    borderColor: "#3da847",
  },
});
