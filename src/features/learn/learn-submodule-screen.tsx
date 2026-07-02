import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FloatingDetailHeader } from "@/components/navigation/floating-detail-header";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  ClipboardCheckIcon,
} from "@/components/ui/icons";
import { useCoins } from "@/features/coins/coin-store";
import {
  getLearnSubmoduleById,
  getLearnSubmoduleProgressId,
  getLearnSubmoduleUnitIds,
  getLearnTopicById,
  type LearnContentSection,
  type LearnInfoCard,
} from "@/features/learn/data";
import { useLearnProgress } from "@/features/learn/learn-progress-store";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

type LearnSubmoduleScreenProps = {
  moduleId: string;
  topicId: string;
};

type SubmoduleStage = "overview" | "content" | "checkpoint";

type CheckpointChoice = {
  correct: boolean;
  id: string;
  label: string;
};

export function LearnSubmoduleScreen({ moduleId, topicId }: LearnSubmoduleScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const { earnCoins } = useCoins();
  const {
    completeItem,
    getCompletedUnitIds,
    getItemProgressPercent,
    isItemCompleted,
    markUnitComplete,
  } = useLearnProgress();
  const topic = getLearnTopicById(topicId);
  const submodule = getLearnSubmoduleById(topicId, moduleId);
  const progressId = getLearnSubmoduleProgressId(topicId, moduleId);
  const completedUnitIds = getCompletedUnitIds(progressId);
  const unitIds = useMemo(
    () => (submodule == null ? [] : getLearnSubmoduleUnitIds(submodule)),
    [submodule],
  );
  const [activeIndex, setActiveIndex] = useState(() => {
    if (submodule == null) {
      return 0;
    }

    const nextIncompleteIndex = submodule.cards.findIndex(
      (card) => !completedUnitIds.includes(card.id),
    );

    return nextIncompleteIndex === -1 ? Math.max(submodule.cards.length - 1, 0) : nextIncompleteIndex;
  });
  const [stage, setStage] = useState<SubmoduleStage>(() => {
    if (submodule == null || !completedUnitIds.includes("overview")) {
      return "overview";
    }

    if (submodule.cards.some((card) => !completedUnitIds.includes(card.id))) {
      return "content";
    }

    return "checkpoint";
  });
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useScrollToTopOnFocus(scrollRef);

  if (topic == null || submodule == null) {
    return (
      <View style={styles.screen}>
        <FloatingDetailHeader fallbackHref="/learn" showCoins={false} />
        <View style={[styles.notFound, { paddingTop: Math.max(insets.top, 18) + 70 }]}>
          <Text style={styles.title}>Submodule not found</Text>
          <Text style={styles.subtitle}>This learning submodule is not available.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Return to Learn</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const activeCard = submodule.cards[activeIndex] ?? submodule.cards[0];
  const completed = isItemCompleted(progressId);
  const overview = buildSubmoduleOverview(submodule);
  const checkpoint = buildSubmoduleCheckpoint(submodule);
  const selectedChoice = checkpoint.choices.find((choice) => choice.id === selectedChoiceId);
  const isCorrect = checked && selectedChoice?.correct === true;
  const isWrong = checked && selectedChoice != null && !selectedChoice.correct;
  const currentUnitId = stage === "overview"
    ? "overview"
    : stage === "checkpoint"
      ? "checkpoint"
      : activeCard?.id ?? "overview";
  const currentUnitIndex = Math.max(unitIds.indexOf(currentUnitId), 0);
  const savedProgress = completed ? 100 : getItemProgressPercent(progressId, unitIds.length);
  const displayProgressPercent = Math.max(
    savedProgress,
    Math.round((currentUnitIndex / Math.max(unitIds.length, 1)) * 100),
  );
  const pageImage = activeCard?.image ?? submodule.image ?? topic.image;
  const pageImageLabel = activeCard?.imageLabel ?? submodule.imageLabel ?? topic.imageLabel;
  const primaryLabel = getPrimaryLabel({
    checked,
    completed,
    selectedChoice,
    stage,
  });
  const primaryDisabled = stage === "checkpoint" && selectedChoice == null && !completed;

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ animated: false, y: 0 });
    });
  };

  const goToStage = (nextStage: SubmoduleStage, nextIndex = activeIndex) => {
    setStage(nextStage);
    setActiveIndex(nextIndex);
    setChecked(false);
    setSelectedChoiceId(null);
    scrollToTop();
  };

  const goPrevious = () => {
    if (stage === "checkpoint") {
      goToStage("content", Math.max(submodule.cards.length - 1, 0));
      return;
    }

    if (stage === "content" && activeIndex > 0) {
      goToStage("content", activeIndex - 1);
      return;
    }

    if (stage === "content") {
      goToStage("overview", 0);
    }
  };

  const handlePrimaryPress = () => {
    if (completed) {
      router.replace({
        pathname: "/learn/[topicId]",
        params: { topicId },
      });
      return;
    }

    if (stage === "overview") {
      markUnitComplete(progressId, "overview");
      goToStage("content", 0);
      return;
    }

    if (stage === "content") {
      if (activeCard != null) {
        markUnitComplete(progressId, activeCard.id);
      }

      if (activeIndex < submodule.cards.length - 1) {
        goToStage("content", activeIndex + 1);
        return;
      }

      goToStage("checkpoint", activeIndex);
      return;
    }

    if (!checked) {
      setChecked(true);
      return;
    }

    if (selectedChoice?.correct !== true) {
      setChecked(false);
      setSelectedChoiceId(null);
      return;
    }

    const alreadyCompleted = isItemCompleted(progressId);
    markUnitComplete(progressId, "checkpoint");
    completeItem(progressId, unitIds);

    if (!alreadyCompleted) {
      earnCoins({
        sourceId: `learn-submodule-${progressId}`,
        title: "Submodule Completed",
        description: submodule.title,
        amount: 5,
      });
    }
  };

  return (
    <View style={styles.screen}>
      <FloatingDetailHeader
        fallbackHref={{
          pathname: "/learn/[topicId]",
          params: { topicId },
        }}
      />
      <ScrollView
        ref={scrollRef}
        testID="learn-submodule-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 132,
            paddingTop: Math.max(insets.top, 18) + 66,
          },
        ]}
      >
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{getProgressTitle(stage, activeIndex, submodule.cards.length)}</Text>
            <Text style={styles.progressPercent}>{displayProgressPercent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${displayProgressPercent}%` }]} />
          </View>
        </View>

        <View style={styles.headerBlock}>
          <Text style={styles.eyebrow}>{topic.title}</Text>
          <Text style={styles.title}>{submodule.title}</Text>
          <Text style={styles.subtitle}>{submodule.subtitle}</Text>
        </View>

        {stage === "overview" ? (
          <SubmoduleOverview
            image={submodule.image ?? topic.image}
            imageLabel={submodule.imageLabel ?? topic.imageLabel}
            overview={overview}
          />
        ) : stage === "content" ? (
          <SubmoduleContent
            body={activeCard?.body ?? ""}
            image={pageImage}
            imageLabel={pageImageLabel}
            title={activeCard?.title ?? submodule.title}
          />
        ) : (
          <SubmoduleCheckpoint
            checked={checked}
            choices={checkpoint.choices}
            explanation={checkpoint.explanation}
            isCorrect={isCorrect || completed}
            isWrong={isWrong}
            onSelectChoice={setSelectedChoiceId}
            prompt={checkpoint.prompt}
            selectedChoiceId={selectedChoiceId}
            successBody={checkpoint.successBody}
            successTitle={checkpoint.successTitle}
          />
        )}

        {completed ? (
          <View style={styles.completedCard}>
            <View style={styles.completedIcon}>
              <CheckIcon color="#ffffff" size={17} strokeWidth={2.4} />
            </View>
            <View style={styles.completedCopy}>
              <Text style={styles.completedTitle}>Submodule completed</Text>
              <Text style={styles.completedText}>You can review the lesson or return to the module list.</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.footer}>
          {stage !== "overview" && !completed ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous submodule step"
              onPress={goPrevious}
              style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
            >
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={primaryLabel}
            disabled={primaryDisabled}
            onPress={handlePrimaryPress}
            style={({ pressed }) => [
              styles.primaryButton,
              primaryDisabled ? styles.buttonDisabled : null,
              pressed && !primaryDisabled ? styles.pressed : null,
            ]}
          >
            <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
            {completed || stage !== "checkpoint" || isCorrect ? (
              <ArrowRightIcon color="#ffffff" size={18} strokeWidth={2.2} />
            ) : null}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function SubmoduleOverview({
  image,
  imageLabel,
  overview,
}: {
  image: LearnInfoCard["image"];
  imageLabel: string;
  overview: ReturnType<typeof buildSubmoduleOverview>;
}) {
  return (
    <View style={styles.lessonBlock}>
      <View style={styles.imageCard}>
        {image != null ? (
          <Image
            source={image}
            resizeMode="contain"
            accessibilityLabel={imageLabel}
            style={styles.lessonImage}
          />
        ) : null}
      </View>

      <InfoPanel
        icon="definition"
        title="Definition"
        body={overview.definition}
      />

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View style={styles.panelIcon}>
            <CheckIcon color="#ffffff" size={16} strokeWidth={2.4} />
          </View>
          <Text style={styles.panelTitle}>Purpose</Text>
        </View>
        <View style={styles.bulletList}>
          {overview.purposeBullets.map((bullet) => (
            <View key={bullet} style={styles.bulletRow}>
              <View style={styles.smallCheck}>
                <CheckIcon color="#2f973b" size={12} strokeWidth={2.5} />
              </View>
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      </View>

      <InfoPanel
        icon="reminder"
        title="Important Reminder"
        body={overview.reminder}
        muted
      />
    </View>
  );
}

function SubmoduleContent({
  body,
  image,
  imageLabel,
  title,
}: {
  body: string;
  image: LearnInfoCard["image"];
  imageLabel: string;
  title: string;
}) {
  return (
    <View style={styles.lessonBlock}>
      <View style={styles.imageCard}>
        {image != null ? (
          <Image
            source={image}
            resizeMode="contain"
            accessibilityLabel={imageLabel}
            style={styles.lessonImage}
          />
        ) : null}
      </View>
      <View style={styles.bodyCard}>
        <Text style={styles.pageTitle}>{title}</Text>
        <Text style={styles.pageBody}>{body}</Text>
      </View>
    </View>
  );
}

function SubmoduleCheckpoint({
  checked,
  choices,
  explanation,
  isCorrect,
  isWrong,
  onSelectChoice,
  prompt,
  selectedChoiceId,
  successBody,
  successTitle,
}: {
  checked: boolean;
  choices: CheckpointChoice[];
  explanation: string;
  isCorrect: boolean;
  isWrong: boolean;
  onSelectChoice: (choiceId: string) => void;
  prompt: string;
  selectedChoiceId: string | null;
  successBody: string;
  successTitle: string;
}) {
  return (
    <View style={styles.lessonBlock}>
      <View style={styles.checkpointHero}>
        <Image
          source={require("../../assets/cute-assets/lto-quiz.png")}
          resizeMode="contain"
          accessibilityLabel="Quiz checkpoint"
          style={styles.checkpointImage}
        />
        <Text style={styles.checkpointTitle}>Quick Checkpoint</Text>
        <Text style={styles.checkpointSubtitle}>Answer this before completing the submodule.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.questionText}>{prompt}</Text>
        <View style={styles.choiceList}>
          {choices.map((choice) => {
            const selected = selectedChoiceId === choice.id;
            const revealCorrect = checked && choice.correct;
            const revealWrong = checked && selected && !choice.correct;

            return (
              <Pressable
                key={choice.id}
                accessibilityRole="button"
                accessibilityLabel={choice.label}
                accessibilityState={{ selected }}
                disabled={checked}
                onPress={() => onSelectChoice(choice.id)}
                style={[
                  styles.choiceButton,
                  selected ? styles.choiceButtonSelected : null,
                  revealCorrect ? styles.choiceButtonCorrect : null,
                  revealWrong ? styles.choiceButtonWrong : null,
                ]}
              >
                <View
                  style={[
                    styles.choiceCircle,
                    selected ? styles.choiceCircleSelected : null,
                    revealCorrect ? styles.choiceCircleCorrect : null,
                  ]}
                >
                  {revealCorrect ? <CheckIcon color="#ffffff" size={13} strokeWidth={2.5} /> : null}
                </View>
                <Text style={styles.choiceText}>{choice.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {isCorrect ? (
        <View style={styles.successCard}>
          <Text style={styles.successTitle}>{successTitle}</Text>
          <Text style={styles.successBody}>{successBody}</Text>
        </View>
      ) : null}

      {isWrong ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Review this one.</Text>
          <Text style={styles.errorBody}>{explanation}</Text>
        </View>
      ) : null}
    </View>
  );
}

function InfoPanel({
  body,
  icon,
  muted,
  title,
}: {
  body: string;
  icon: "definition" | "reminder";
  muted?: boolean;
  title: string;
}) {
  const Icon = icon === "definition" ? ClipboardCheckIcon : BookOpenIcon;

  return (
    <View style={[styles.panel, muted ? styles.panelMuted : null]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelIcon}>
          <Icon color="#ffffff" size={16} strokeWidth={2.2} />
        </View>
        <Text style={styles.panelTitle}>{title}</Text>
      </View>
      <Text style={styles.panelBody}>{body}</Text>
    </View>
  );
}

function buildSubmoduleOverview(submodule: LearnContentSection) {
  return {
    definition:
      `${submodule.title} explains the road-rule decisions behind ${submodule.subtitle.toLowerCase()}`,
    purposeBullets: submodule.cards.slice(0, 3).map((card) => card.title),
    reminder:
      "Use these rules together with posted traffic signs, road markings, signals, and lawful instructions from traffic enforcers.",
  };
}

function buildSubmoduleCheckpoint(submodule: LearnContentSection) {
  const referenceCard = submodule.cards[0];
  const correctLabel = referenceCard == null
    ? "Follow the safe and lawful road-rule action."
    : referenceCard.body;

  return {
    prompt: `Which answer best matches ${submodule.title}?`,
    choices: [
      {
        id: "correct-rule",
        label: correctLabel,
        correct: true,
      },
      {
        id: "optional-rule",
        label: "Treat the rule as optional when traffic looks light.",
        correct: false,
      },
      {
        id: "faster-rule",
        label: "Move faster so other road users adjust to you.",
        correct: false,
      },
    ],
    explanation:
      "Road rules are not optional. Apply the safe rule, check surrounding traffic, and proceed only when the movement is lawful and safe.",
    successTitle: "Correct.",
    successBody:
      "You identified the safe rule for this submodule. Continue to complete the lesson.",
  };
}

function getPrimaryLabel({
  checked,
  completed,
  selectedChoice,
  stage,
}: {
  checked: boolean;
  completed: boolean;
  selectedChoice: CheckpointChoice | undefined;
  stage: SubmoduleStage;
}) {
  if (completed) {
    return "View Submodules";
  }

  if (stage === "overview") {
    return "Start Lesson";
  }

  if (stage === "content") {
    return "Continue";
  }

  if (!checked) {
    return "Check Answer";
  }

  return selectedChoice?.correct === true ? "Complete +5 Coins" : "Try Again";
}

function getProgressTitle(stage: SubmoduleStage, activeIndex: number, totalCards: number) {
  if (stage === "overview") {
    return "Overview";
  }

  if (stage === "checkpoint") {
    return "Checkpoint";
  }

  return `Page ${activeIndex + 1} of ${totalCards}`;
}

const styles = StyleSheet.create({
  bodyCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.05)",
    gap: 8,
    padding: 14,
  },
  bulletList: {
    gap: 9,
  },
  bulletRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  bulletText: {
    color: "#4d5f78",
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  checkpointHero: {
    alignItems: "center",
    backgroundColor: "#e8f7df",
    borderColor: "#cfeecf",
    borderRadius: 18,
    borderWidth: 1,
    gap: 5,
    padding: 18,
  },
  checkpointImage: {
    height: 124,
    width: 136,
  },
  checkpointSubtitle: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: "center",
  },
  checkpointTitle: {
    color: "#2f973b",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  choiceButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 52,
    padding: 12,
  },
  choiceButtonCorrect: {
    backgroundColor: "#effbf2",
    borderColor: "#2f973b",
  },
  choiceButtonSelected: {
    borderColor: "#2f973b",
  },
  choiceButtonWrong: {
    backgroundColor: "#fff0f2",
    borderColor: "#ef4444",
  },
  choiceCircle: {
    borderColor: "#cfd8d3",
    borderRadius: 11,
    borderWidth: 1,
    height: 22,
    width: 22,
  },
  choiceCircleCorrect: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderColor: "#2f973b",
    justifyContent: "center",
  },
  choiceCircleSelected: {
    borderColor: "#2f973b",
  },
  choiceList: {
    gap: 9,
  },
  choiceText: {
    color: "#172230",
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 17,
  },
  completedCard: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderColor: "#cfeecf",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 11,
    padding: 13,
  },
  completedCopy: {
    flex: 1,
    gap: 3,
  },
  completedIcon: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  completedText: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  completedTitle: {
    color: "#2f973b",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  errorBody: {
    color: "#7f1d1d",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  errorCard: {
    backgroundColor: "#fff0f2",
    borderColor: "#fecdd3",
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    padding: 13,
  },
  errorTitle: {
    color: "#b91c1c",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  eyebrow: {
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  headerBlock: {
    gap: 6,
  },
  imageCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 6px 16px rgba(23, 34, 48, 0.06)",
    minHeight: 230,
    overflow: "hidden",
    padding: 8,
  },
  lessonBlock: {
    gap: 12,
  },
  lessonImage: {
    height: 220,
    width: "100%",
  },
  notFound: {
    gap: 12,
    padding: 18,
  },
  pageBody: {
    color: "#4d5f78",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 19,
  },
  pageTitle: {
    color: "#061b49",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 23,
  },
  panel: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.05)",
    gap: 10,
    padding: 14,
  },
  panelBody: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  panelHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  panelIcon: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 14,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  panelMuted: {
    backgroundColor: "#effbf2",
    borderColor: "#cfeecf",
  },
  panelTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.86,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 16,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    height: 50,
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  progressCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    gap: 9,
    padding: 12,
  },
  progressFill: {
    backgroundColor: "#2f973b",
    borderRadius: 999,
    height: "100%",
  },
  progressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressPercent: {
    color: "#2f973b",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  progressTitle: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  progressTrack: {
    backgroundColor: "#e5ebe7",
    borderRadius: 999,
    height: 7,
    overflow: "hidden",
  },
  questionText: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  secondaryButtonText: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  smallCheck: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  subtitle: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  successBody: {
    color: "#225b2b",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  successCard: {
    backgroundColor: "#effbf2",
    borderColor: "#cfeecf",
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    padding: 13,
  },
  successTitle: {
    color: "#2f973b",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  title: {
    color: "#061b49",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 27,
  },
});
