import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  type IconComponent,
} from "@/components/ui/icons";

type SetupScreenProps = PropsWithChildren<{
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryDisabled?: boolean;
  onPrimaryPress: () => void;
  showBackButton?: boolean;
}>;

export function SetupScreen({
  children,
  currentStep,
  onPrimaryPress,
  primaryDisabled = false,
  primaryLabel,
  showBackButton,
  subtitle,
  title,
  totalSteps,
}: SetupScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const canGoBack = showBackButton ?? currentStep > 1;

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          {
            paddingTop: Math.max(insets.top, 18),
          },
        ]}
      >
        <View style={styles.topBar}>
          <View style={styles.progressWrap}>
            <Text style={styles.stepLabel}>
              Step {currentStep} of {totalSteps}
            </Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentStep / totalSteps) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.heading}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.optionsScroll}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContent}
      >
        <View style={styles.options}>{children}</View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        <View style={styles.footerActions}>
          {canGoBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed ? styles.secondaryButtonPressed : null,
              ]}
            >
              <ArrowLeftIcon color="#0757ff" size={21} strokeWidth={1.9} />
              <Text style={styles.secondaryButtonLabel}>Back</Text>
            </Pressable>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={primaryLabel}
            disabled={primaryDisabled}
            onPress={onPrimaryPress}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && !primaryDisabled ? styles.primaryButtonPressed : null,
              primaryDisabled ? styles.primaryButtonDisabled : null,
            ]}
          >
            <Text style={styles.primaryButtonLabel}>{primaryLabel}</Text>
            <ArrowRightIcon color="#ffffff" size={22} strokeWidth={1.9} style={styles.primaryButtonIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

type SelectionCardProps = {
  icon: IconComponent;
  iconColor: string;
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectionCard({
  description,
  icon: Icon,
  iconColor,
  label,
  onPress,
  selected,
}: SelectionCardProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionCard,
        selected ? styles.optionCardSelected : null,
        pressed ? styles.optionCardPressed : null,
      ]}
    >
      <View style={styles.optionIconWrap}>
        <Icon color={iconColor} size={28} strokeWidth={1.9} />
      </View>
      <View style={styles.optionCopy}>
        <Text style={styles.optionLabel}>{label}</Text>
        {description != null ? <Text style={styles.optionDescription}>{description}</Text> : null}
      </View>
      <View style={[styles.checkMark, selected ? styles.checkMarkSelected : null]}>
        {selected ? <CheckIcon color="#ffffff" size={15} strokeWidth={2.1} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },
  header: {
    gap: 28,
    paddingBottom: 18,
    paddingHorizontal: 22,
  },
  optionsScroll: {
    flex: 1,
  },
  optionsContent: {
    paddingBottom: 20,
    paddingHorizontal: 22,
  },
  topBar: {
    alignItems: "center",
    width: "100%",
  },
  progressWrap: {
    gap: 8,
    width: "100%",
  },
  stepLabel: {
    color: "#63718b",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 18,
  },
  progressTrack: {
    backgroundColor: "#dde6f2",
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#0757ff",
    borderRadius: 999,
    height: "100%",
  },
  heading: {
    gap: 12,
  },
  title: {
    color: "#061b49",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 40,
  },
  subtitle: {
    color: "#63718b",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 24,
  },
  options: {
    gap: 12,
  },
  optionCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    minHeight: 84,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionCardSelected: {
    backgroundColor: "#eef5ff",
    borderColor: "#0757ff",
  },
  optionCardPressed: {
    opacity: 0.86,
  },
  optionIconWrap: {
    alignItems: "center",
    backgroundColor: "#f1f6fc",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  optionCopy: {
    flex: 1,
    gap: 4,
  },
  optionLabel: {
    color: "#061b49",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 21,
  },
  optionDescription: {
    color: "#63718b",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 18,
  },
  checkMark: {
    alignItems: "center",
    borderColor: "#ccd8e7",
    borderRadius: 12,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  checkMarkSelected: {
    backgroundColor: "#0757ff",
    borderColor: "#0757ff",
  },
  footer: {
    backgroundColor: "#f7fbff",
    paddingHorizontal: 22,
    paddingTop: 18,
  },
  footerActions: {
    flexDirection: "row",
    gap: 12,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dce7f4",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    height: 58,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  secondaryButtonPressed: {
    opacity: 0.86,
  },
  secondaryButtonLabel: {
    color: "#0757ff",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 21,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#0757ff",
    borderRadius: 999,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    height: 58,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  primaryButtonPressed: {
    opacity: 0.86,
  },
  primaryButtonDisabled: {
    backgroundColor: "#9bb9ff",
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  primaryButtonIcon: {
    marginTop: 1,
  },
});
