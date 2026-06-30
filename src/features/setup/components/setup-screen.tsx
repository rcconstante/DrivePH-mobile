import { useRouter } from "expo-router";
import type { PropsWithChildren } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type ImageSourcePropType,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BarChartIcon,
  CarIcon,
  CheckIcon,
  type IconComponent,
} from "@/components/ui/icons";

type SetupScreenProps = PropsWithChildren<{
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  heroImage: ImageSourcePropType;
  heroImageLabel: string;
  primaryLabel: string;
  primaryDisabled?: boolean;
  primaryIcon?: "arrow" | "check";
  onPrimaryPress: () => void;
  showBackButton?: boolean;
}>;

const stepIcons: Record<number, IconComponent> = {
  1: CarIcon,
  2: BadgeCheckIcon,
  3: BarChartIcon,
};

export function SetupScreen({
  children,
  currentStep,
  heroImage,
  heroImageLabel,
  onPrimaryPress,
  primaryDisabled = false,
  primaryIcon = "arrow",
  primaryLabel,
  showBackButton,
  subtitle,
  title,
  totalSteps,
}: SetupScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const canGoBack = showBackButton ?? currentStep > 1;
  const StepIcon = stepIcons[currentStep] ?? CarIcon;

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
        <View style={styles.progressHeader}>
          <Text style={styles.stepLabel}>
            Step {currentStep} of {totalSteps}
          </Text>
          <View style={styles.progressRow}>
            <View style={styles.stepIconCircle}>
              <StepIcon color="#ffffff" size={22} strokeWidth={2.3} />
            </View>
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

        <View style={styles.heroRow}>
          <View style={styles.heading}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <Image
            source={heroImage}
            resizeMode="contain"
            accessibilityLabel={heroImageLabel}
            style={styles.heroImage}
          />
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
                pressed ? styles.buttonPressed : null,
              ]}
            >
              <ArrowLeftIcon color="#172230" size={18} strokeWidth={2.1} />
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
              pressed && !primaryDisabled ? styles.buttonPressed : null,
              primaryDisabled ? styles.primaryButtonDisabled : null,
            ]}
          >
            <Text style={styles.primaryButtonLabel}>{primaryLabel}</Text>
            {primaryIcon === "check" ? (
              <CheckIcon color="#ffffff" size={20} strokeWidth={2.4} />
            ) : (
              <ArrowRightIcon color="#ffffff" size={20} strokeWidth={2.1} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

type SelectionCardProps = {
  image: ImageSourcePropType;
  imageLabel: string;
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectionCard({
  description,
  image,
  imageLabel,
  label,
  onPress,
  selected,
}: SelectionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.optionCard,
        selected ? styles.optionCardSelected : null,
        pressed ? styles.optionCardPressed : null,
      ]}
    >
      <Image
        source={image}
        resizeMode="contain"
        accessibilityLabel={imageLabel}
        style={styles.optionImage}
      />
      <View style={styles.optionCopy}>
        <Text style={[styles.optionLabel, selected ? styles.optionLabelSelected : null]}>
          {label}
        </Text>
        {description != null ? <Text style={styles.optionDescription}>{description}</Text> : null}
      </View>
      <View style={[styles.checkMark, selected ? styles.checkMarkSelected : null]}>
        {selected ? <CheckIcon color="#ffffff" size={14} strokeWidth={2.5} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.86,
  },
  checkMark: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#d7dfdd",
    borderRadius: 12,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  checkMarkSelected: {
    backgroundColor: "#2f973b",
    borderColor: "#2f973b",
  },
  footer: {
    backgroundColor: "#fbfcf8",
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  footerActions: {
    flexDirection: "row",
    gap: 14,
  },
  header: {
    backgroundColor: "#fbfcf8",
    gap: 16,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  heading: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    minWidth: 0,
    paddingBottom: 4,
  },
  heroImage: {
    height: 116,
    marginRight: -4,
    width: 142,
  },
  heroRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 8,
    minHeight: 126,
  },
  optionCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 4px 12px rgba(23, 34, 48, 0.06)",
    flexDirection: "row",
    gap: 12,
    minHeight: 84,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionCardPressed: {
    opacity: 0.9,
  },
  optionCardSelected: {
    backgroundColor: "#f4fbf0",
    borderColor: "#3da847",
  },
  optionCopy: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  optionDescription: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 15,
  },
  optionImage: {
    height: 58,
    width: 74,
  },
  optionLabel: {
    color: "#172230",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  optionLabelSelected: {
    color: "#278835",
  },
  options: {
    gap: 10,
  },
  optionsContent: {
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  optionsScroll: {
    flex: 1,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 999,
    boxShadow: "0 8px 14px rgba(47, 151, 59, 0.24)",
    flex: 1,
    flexDirection: "row",
    gap: 10,
    height: 54,
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    backgroundColor: "#9acda0",
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: "center",
  },
  progressFill: {
    backgroundColor: "#2f973b",
    borderRadius: 999,
    height: "100%",
  },
  progressHeader: {
    gap: 8,
  },
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  progressTrack: {
    backgroundColor: "#e5ebe7",
    borderRadius: 999,
    flex: 1,
    height: 8,
    overflow: "hidden",
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 999,
    borderWidth: 1,
    boxShadow: "0 5px 10px rgba(23, 34, 48, 0.05)",
    flexDirection: "row",
    gap: 7,
    height: 54,
    justifyContent: "center",
    paddingHorizontal: 16,
    minWidth: 94,
  },
  secondaryButtonLabel: {
    color: "#172230",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  stepIconCircle: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 21,
    boxShadow: "0 7px 12px rgba(47, 151, 59, 0.24)",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  stepLabel: {
    color: "#2f973b",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  subtitle: {
    color: "#344154",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 17,
  },
  title: {
    color: "#172230",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 31,
  },
});
