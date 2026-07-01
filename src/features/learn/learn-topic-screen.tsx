import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, type ImageSourcePropType } from "react-native";
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
  getLearnDetailByTopicId,
  getLearnTopicById,
  learnStages,
  type LearnCheckpointChoice,
  type LearnContentSection,
  type LearnStepId,
} from "@/features/learn/data";
import { useLearnProgress } from "@/features/learn/learn-progress-store";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

type LearnTopicScreenProps = {
  topicId: string;
};

export function LearnTopicScreen({ topicId }: LearnTopicScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const { earnCoins } = useCoins();
  const {
    completeTopic,
    getCompletedStageIds,
    getTopicProgressPercent,
    isTopicCompleted,
    markStageComplete,
  } = useLearnProgress();
  const topic = getLearnTopicById(topicId);
  const detail = getLearnDetailByTopicId(topicId);
  const completedStageIds = topic == null ? [] : getCompletedStageIds(topic.id);
  const [activeStepIndex, setActiveStepIndex] = useState(() => {
    const nextIncompleteIndex = learnStages.findIndex(
      (stage) => !completedStageIds.includes(stage.id),
    );

    return nextIncompleteIndex === -1 ? learnStages.length - 1 : nextIncompleteIndex;
  });
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useScrollToTopOnFocus(scrollRef);

  if (topic == null || detail == null) {
    return (
      <View style={styles.screen}>
        <FloatingDetailHeader showCoins={false} />
        <View style={[styles.notFound, { paddingTop: Math.max(insets.top, 18) + 70 }]}>
          <Text style={styles.title}>Topic not found</Text>
          <Text style={styles.subtitle}>This learning topic is not available.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Return to Learn</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const completed = isTopicCompleted(topic.id);
  const activeStep = learnStages[activeStepIndex] ?? learnStages[0]!;
  const selectedChoice = detail.checkpoint.choices.find((choice) => choice.id === selectedChoiceId);
  const progressPercent = getTopicProgressPercent(topic.id, learnStages.length);
  const isCorrect = checked && selectedChoice?.correct === true;
  const isWrong = checked && selectedChoice != null && !selectedChoice.correct;

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ animated: false, y: 0 });
    });
  };

  const goToStep = (stepIndex: number) => {
    setActiveStepIndex(stepIndex);
    setChecked(false);
    setSelectedChoiceId(null);
    scrollToTop();
  };

  const handlePrimaryPress = () => {
    if (activeStep.id === "overview") {
      markStageComplete(topic.id, "overview");
      goToStep(1);
      return;
    }

    if (activeStep.id === "content") {
      markStageComplete(topic.id, "content");
      goToStep(2);
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

    const alreadyCompleted = isTopicCompleted(topic.id);
    markStageComplete(topic.id, "checkpoint");
    completeTopic(topic.id);

    if (!alreadyCompleted) {
      earnCoins({
        sourceId: `lesson-${topic.id}`,
        title: "Lesson Completed",
        description: topic.title,
        amount: 15,
      });
    }
  };

  const primaryLabel = getPrimaryLabel({
    activeStepId: activeStep.id,
    checked,
    completed,
    selectedChoice,
  });

  const primaryDisabled = activeStep.id === "checkpoint" && selectedChoice == null && !completed;

  return (
    <View style={styles.screen}>
      <FloatingDetailHeader />
      <ScrollView
        ref={scrollRef}
        testID="learn-topic-screen"
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
            <Text style={styles.progressTitle}>{activeStep.label}</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressCount}>
              {completedStageIds.length}/{learnStages.length}
            </Text>
          </View>
        </View>

        {activeStep.id === "overview" ? (
          <LessonOverview topicImage={topic.image} topicImageLabel={topic.imageLabel} detail={detail} />
        ) : activeStep.id === "content" ? (
          <LessonContent sections={detail.sections} />
        ) : (
          <LessonCheckpoint
            checked={checked}
            choices={detail.checkpoint.choices}
            explanation={detail.checkpoint.explanation}
            isCorrect={isCorrect || completed}
            isWrong={isWrong}
            onSelectChoice={setSelectedChoiceId}
            prompt={detail.checkpoint.prompt}
            selectedChoiceId={selectedChoiceId}
            successBody={detail.checkpoint.successBody}
            successTitle={detail.checkpoint.successTitle}
          />
        )}

        <View style={styles.footer}>
          {activeStep.id !== "overview" && !completed ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous lesson step"
              onPress={() => goToStep(activeStepIndex - 1)}
              style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
            >
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={primaryLabel}
            disabled={primaryDisabled || completed}
            onPress={handlePrimaryPress}
            style={({ pressed }) => [
              styles.primaryButton,
              primaryDisabled || completed ? styles.primaryButtonDisabled : null,
              pressed && !primaryDisabled && !completed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
            {!completed ? <ArrowRightIcon color="#ffffff" size={18} strokeWidth={2.2} /> : null}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function LessonOverview({
  detail,
  topicImage,
  topicImageLabel,
}: {
  detail: NonNullable<ReturnType<typeof getLearnDetailByTopicId>>;
  topicImage: ImageSourcePropType;
  topicImageLabel: string;
}) {
  return (
    <View style={styles.lessonBlock}>
      <View style={styles.heroCard}>
        <View style={styles.heroCopy}>
          <Text style={styles.tag}>{detail.overview.tag}</Text>
          <Text style={styles.title}>{detail.overview.title}</Text>
          <Text style={styles.subtitle}>{detail.overview.subtitle}</Text>
        </View>
        <Image
          source={topicImage}
          resizeMode="contain"
          accessibilityLabel={topicImageLabel}
          style={styles.heroImage}
        />
      </View>

      <InfoPanel
        icon="book"
        title="Definition"
        body={detail.overview.definition}
      />

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View style={styles.panelIcon}>
            <CheckIcon color="#ffffff" size={16} strokeWidth={2.4} />
          </View>
          <Text style={styles.panelTitle}>Purpose</Text>
        </View>
        <View style={styles.bulletList}>
          {detail.overview.purposeBullets.map((bullet) => (
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
        icon="note"
        title="Important Reminder"
        body={detail.overview.reminder}
        muted
      />
    </View>
  );
}

function LessonContent({ sections }: { sections: LearnContentSection[] }) {
  return (
    <View style={styles.lessonBlock}>
      {sections.map((section) => (
        <View key={section.id} style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionCopy}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            {section.image != null ? (
              <Image
                source={section.image}
                resizeMode="contain"
                accessibilityLabel={section.imageLabel ?? section.title}
                style={styles.sectionImage}
              />
            ) : null}
          </View>

          <View style={styles.cardList}>
            {section.cards.map((card, index) => (
              <View key={card.id} style={styles.infoCard}>
                <View style={styles.numberBadge}>
                  <Text style={styles.numberBadgeText}>{index + 1}</Text>
                </View>
                <View style={styles.cardCopy}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  {card.meta != null ? <Text style={styles.cardMeta}>{card.meta}</Text> : null}
                  <Text style={styles.cardBody}>{card.body}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function LessonCheckpoint({
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
  choices: LearnCheckpointChoice[];
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
        <Text style={styles.checkpointTitle}>Check Your Understanding</Text>
        <Text style={styles.checkpointSubtitle}>Answer this before completing the lesson.</Text>
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
  icon: "book" | "note";
  muted?: boolean;
  title: string;
}) {
  const Icon = icon === "book" ? ClipboardCheckIcon : BookOpenIcon;

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

function getPrimaryLabel({
  activeStepId,
  checked,
  completed,
  selectedChoice,
}: {
  activeStepId: LearnStepId;
  checked: boolean;
  completed: boolean;
  selectedChoice: LearnCheckpointChoice | undefined;
}) {
  if (completed) {
    return "Lesson Completed";
  }

  if (activeStepId === "overview") {
    return "Start Lesson";
  }

  if (activeStepId === "content") {
    return "Continue";
  }

  if (!checked) {
    return "Check Answer";
  }

  return selectedChoice?.correct === true ? "Complete Lesson +15 Coins" : "Try Again";
}

const styles = StyleSheet.create({
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
  cardBody: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  cardCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  cardList: {
    gap: 10,
  },
  cardMeta: {
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    textTransform: "uppercase",
  },
  cardTitle: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
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
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: "#fbfcf8",
    flexDirection: "row",
    gap: 8,
    minHeight: 150,
  },
  heroCopy: {
    flex: 1,
    gap: 7,
    minWidth: 0,
  },
  heroImage: {
    height: 112,
    width: 124,
  },
  infoCard: {
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.05)",
    flexDirection: "row",
    gap: 10,
    minHeight: 78,
    padding: 12,
  },
  lessonBlock: {
    gap: 12,
  },
  notFound: {
    gap: 12,
    padding: 18,
  },
  numberBadge: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 11,
    height: 22,
    justifyContent: "center",
    marginTop: 1,
    width: 22,
  },
  numberBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 14,
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
  primaryButtonDisabled: {
    opacity: 0.48,
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
  progressCount: {
    color: "#2f973b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
    minWidth: 28,
    textAlign: "right",
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
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
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
    flex: 1,
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
  section: {
    gap: 10,
  },
  sectionCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  sectionImage: {
    height: 68,
    width: 76,
  },
  sectionSubtitle: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  sectionTitle: {
    color: "#2f973b",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 20,
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
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#dff4df",
    borderRadius: 999,
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  title: {
    color: "#061b49",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 27,
  },
});
