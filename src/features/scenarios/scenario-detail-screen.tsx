import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FloatingDetailHeader } from "@/components/navigation/floating-detail-header";
import {
  BadgeCheckIcon,
  BookOpenIcon,
  CheckIcon,
  ClipboardCheckIcon,
  InfoIcon,
} from "@/components/ui/icons";
import { useCoins } from "@/features/coins/coin-store";
import {
  difficultyTheme,
  getScenarioById,
  type Scenario,
} from "@/features/scenarios/data";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

type ScenarioDetailScreenProps = {
  scenarioId: string;
};

export function ScenarioDetailScreen({ scenarioId }: ScenarioDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const { earnCoins } = useCoins();
  const [started, setStarted] = useState(false);
  const scenario = getScenarioById(scenarioId);
  useScrollToTopOnFocus(scrollRef);

  if (scenario == null) {
    return (
      <View style={styles.screen}>
        <FloatingDetailHeader showCoins={false} />
        <View style={[styles.notFound, { paddingTop: Math.max(insets.top, 18) + 70 }]}>
          <Text style={styles.title}>Scenario not found</Text>
          <Text style={styles.subtitle}>This driving scenario is not available.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.startButton}>
            <Text style={styles.startButtonText}>Return to Scenarios</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const theme = difficultyTheme[scenario.difficulty];

  const startLesson = () => {
    earnCoins({
      sourceId: `scenario-${scenario.id}`,
      title: "Scenario Completed",
      description: scenario.title,
      amount: 20,
    });
    setStarted(true);
  };

  return (
    <View style={styles.screen}>
      <FloatingDetailHeader />
      <ScrollView
        ref={scrollRef}
        testID="scenario-detail-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 152,
            paddingTop: Math.max(insets.top, 18) + 66,
          },
        ]}
      >
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>SCENARIO</Text>
            <Text style={styles.title}>{scenario.title}</Text>
            <Text style={styles.subtitle}>{scenario.description}</Text>
            <View style={styles.metaRow}>
              <View style={[styles.metaPill, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.metaText, { color: theme.color }]}>{scenario.difficulty}</Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaText}>{scenario.duration}</Text>
              </View>
              <View style={styles.metaPill}>
                <Text style={styles.metaText}>{scenario.xp} XP</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.learnCard}>
          <Text style={styles.sectionTitle}>What you'll learn</Text>
          <View style={styles.learningGrid}>
            {scenario.learnings.map((learning, index) => (
              <LearningItem key={learning} index={index} label={learning} />
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Scenario Preview</Text>
        <View style={styles.previewCard}>
          <Image
            source={scenario.image}
            resizeMode="cover"
            accessibilityLabel={scenario.imageLabel}
            style={styles.previewImage}
          />
          <View style={styles.previewNote}>
            <InfoIcon color="#2f973b" size={18} strokeWidth={2.1} />
            <Text style={styles.previewText}>{scenario.previewNote}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Key Rule</Text>
        <View style={styles.ruleCard}>
          <View style={styles.ruleIcon}>
            <BadgeCheckIcon color="#2f973b" size={22} strokeWidth={2} />
          </View>
          <View style={styles.ruleCopy}>
            <Text style={styles.ruleTitle}>{scenario.keyRule.title}</Text>
            <Text style={styles.ruleText}>{scenario.keyRule.body}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>What's Inside</Text>
        <View style={styles.insideCard}>
          <View style={styles.stepRow}>
            {scenario.walkthrough.map((step, index) => (
              <View key={step} style={styles.stepItem}>
                <View style={[styles.stepCircle, index === 0 ? styles.stepCircleActive : null]}>
                  {index === 0 ? (
                    <BookOpenIcon color="#ffffff" size={16} strokeWidth={2.1} />
                  ) : (
                    <ClipboardCheckIcon color="#8f9aa6" size={15} strokeWidth={1.9} />
                  )}
                </View>
                <Text style={[styles.stepText, index === 0 ? styles.stepTextActive : null]}>
                  {index + 1}. {step}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start lesson"
            onPress={startLesson}
            style={({ pressed }) => [
              styles.startButton,
              started ? styles.startButtonDone : null,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.startButtonText}>
              {started ? "Scenario Started +20 Coins" : "Start Lesson"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function LearningItem({ index, label }: { index: number; label: string }) {
  const iconColor = ["#2f973b", "#4caf50", "#f97316"][index] ?? "#2f973b";
  const Icon = index === 0 ? BookOpenIcon : index === 1 ? CheckIcon : BadgeCheckIcon;

  return (
    <View style={styles.learningItem}>
      <View style={[styles.learningIcon, { backgroundColor: `${iconColor}14` }]}>
        <Icon color={iconColor} size={20} strokeWidth={2.2} />
      </View>
      <Text style={styles.learningText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  eyebrow: {
    color: "#2f973b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
  },
  hero: {
    alignItems: "center",
    backgroundColor: "#e8f7df",
    borderColor: "#cfeecf",
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 160,
    overflow: "hidden",
    padding: 14,
  },
  heroCopy: {
    flex: 1,
    gap: 10,
    minWidth: 0,
    zIndex: 1,
  },
  insideCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    gap: 16,
    padding: 14,
  },
  learnCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
    padding: 14,
  },
  learningGrid: {
    flexDirection: "row",
    gap: 10,
  },
  learningIcon: {
    alignItems: "center",
    borderRadius: 13,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  learningItem: {
    alignItems: "center",
    flex: 1,
    gap: 8,
  },
  learningText: {
    color: "#061b49",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 14,
    textAlign: "center",
  },
  metaPill: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 999,
    borderWidth: 1,
    height: 32,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaText: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
  },
  notFound: {
    gap: 12,
    padding: 18,
  },
  pressed: {
    opacity: 0.86,
  },
  previewCard: {
    backgroundColor: "#ffffff",
    borderColor: "#cfeecf",
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  previewImage: {
    height: 178,
    width: "100%",
  },
  previewNote: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    flexDirection: "row",
    gap: 10,
    padding: 12,
  },
  previewText: {
    color: "#4d5f78",
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  ruleCard: {
    alignItems: "center",
    backgroundColor: "#e8f7df",
    borderColor: "#cfeecf",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  ruleCopy: {
    flex: 1,
    gap: 5,
  },
  ruleIcon: {
    alignItems: "center",
    backgroundColor: "#dcecff",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  ruleText: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  ruleTitle: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  sectionTitle: {
    color: "#061b49",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
  },
  startButtonDone: {
    backgroundColor: "#4caf50",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
  stepCircle: {
    alignItems: "center",
    backgroundColor: "#edf2f8",
    borderRadius: 17,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  stepCircleActive: {
    backgroundColor: "#2f973b",
  },
  stepItem: {
    alignItems: "center",
    flex: 1,
    gap: 6,
  },
  stepRow: {
    flexDirection: "row",
    gap: 6,
  },
  stepText: {
    color: "#718096",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 12,
    textAlign: "center",
  },
  stepTextActive: {
    color: "#2f973b",
  },
  subtitle: {
    color: "#4d5f78",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 19,
  },
  title: {
    color: "#061b49",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 30,
  },
});
