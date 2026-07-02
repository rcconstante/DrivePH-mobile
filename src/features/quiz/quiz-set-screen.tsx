import { useIsFocused, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeInUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { FloatingDetailHeader } from "@/components/navigation/floating-detail-header";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  RefreshIcon,
} from "@/components/ui/icons";
import { useCoins } from "@/features/coins/coin-store";
import {
  getQuizCategoryById,
  getQuizSetById,
  getQuizSetBySetId,
  type QuizQuestion,
} from "@/features/quiz/data";
import { getQuizReturnHref, type QuizEntryOrigin } from "@/features/quiz/navigation";
import { useQuizProgress, type QuizAttemptRecord } from "@/features/quiz/quiz-progress-store";
import {
  buildAnswerRecords,
  buildQuestionOrder,
  clampIndex,
  formatSeconds,
  getQuizDurationSeconds,
  getQuizScore,
  getQuizScorePercent,
  getRestoredQuestionOrder,
  isPassingScore,
  PASSING_PERCENT,
  type QuizAnswerRecord,
} from "@/features/quiz/utils/quiz-engine";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

type QuizSetScreenProps = {
  origin?: QuizEntryOrigin;
  quizId: string;
  returnModuleId?: string;
  returnTopicId?: string;
  setId: string;
};

const emptyQuestions: QuizQuestion[] = [];

export function QuizSetScreen({
  origin,
  quizId,
  returnModuleId,
  returnTopicId,
  setId,
}: QuizSetScreenProps) {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const latestAttemptRef = useRef<QuizAttemptRecord | null>(null);
  const { earnCoins } = useCoins();
  const {
    clearQuizAttempt,
    getQuizAttempt,
    recordQuizResult,
    saveQuizAttempt,
  } = useQuizProgress();
  const quizSet = getQuizSetById(quizId, setId) ?? getQuizSetBySetId(setId);
  const category = getQuizCategoryById(quizSet?.categoryId ?? quizId);
  const questions = quizSet?.questions ?? emptyQuestions;
  const [questionOrder, setQuestionOrder] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answersByQuestionId, setAnswersByQuestionId] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [allowBack, setAllowBack] = useState(true);
  const [autoCheck, setAutoCheck] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const returnHref = useMemo(
    () =>
      getQuizReturnHref({
        categoryId: category?.id ?? quizId,
        origin: origin ?? "quiz",
        ...(returnModuleId != null ? { returnModuleId } : {}),
        ...(returnTopicId != null ? { returnTopicId } : {}),
      }),
    [category?.id, origin, quizId, returnModuleId, returnTopicId],
  );
  const returnLabel = origin === "learn" && returnTopicId != null
    ? "Back to Module"
    : "Choose Another Set";

  useScrollToTopOnFocus(scrollRef);

  useEffect(() => {
    const nextOrder = buildQuestionOrder({
      limit: quizSet?.questionLimit,
      questions,
      randomize: quizSet?.randomizeByDefault === true,
    });
    const savedAttempt = quizSet == null ? null : getQuizAttempt(quizSet.id);
    const restoredOrder = getRestoredQuestionOrder(savedAttempt, nextOrder, questions);
    const restoredIndex = clampIndex(savedAttempt?.currentIndex ?? 0, restoredOrder.length);

    setQuestionOrder(restoredOrder);
    setCurrentIndex(restoredIndex);
    setSelectedChoiceId(savedAttempt?.selectedChoiceId ?? null);
    setSubmitted(savedAttempt?.submitted ?? false);
    setAnswersByQuestionId(savedAttempt?.answersByQuestionId ?? {});
    setFinished(false);
    setShowReview(false);
    setAllowBack(savedAttempt?.allowBack ?? true);
    setAutoCheck(savedAttempt?.autoCheck ?? false);
    setActionsOpen(false);
    setTimedOut(false);
    setRemainingSeconds(savedAttempt?.remainingSeconds ?? getQuizDurationSeconds(quizSet, restoredOrder.length));
  }, [questions, quizSet?.durationMinutes, quizSet?.id, quizSet?.questionLimit, quizSet?.randomizeByDefault]);

  const questionById = useMemo(
    () => new Map(questions.map((question) => [question.id, question])),
    [questions],
  );

  const orderedQuestions = useMemo(() => {
    if (questionOrder.length === 0) {
      return questions;
    }

    return questionOrder
      .map((questionId) => questionById.get(questionId))
      .filter((question): question is QuizQuestion => question != null);
  }, [questionById, questionOrder, questions]);

  const answerRecords = useMemo(
    () => buildAnswerRecords(orderedQuestions, answersByQuestionId),
    [answersByQuestionId, orderedQuestions],
  );
  const score = getQuizScore(answerRecords);
  const currentQuestion = orderedQuestions[currentIndex];
  const progress = orderedQuestions.length === 0
    ? 0
    : Math.round(((currentIndex + 1) / orderedQuestions.length) * 100);
  const passed = isPassingScore(score, orderedQuestions.length);

  useEffect(() => {
    latestAttemptRef.current = quizSet != null && !finished && questionOrder.length > 0
      ? {
          allowBack,
          answersByQuestionId,
          autoCheck,
          currentIndex,
          questionOrder,
          remainingSeconds,
          selectedChoiceId,
          submitted,
          updatedAt: Date.now(),
        }
      : null;
  }, [
    allowBack,
    answersByQuestionId,
    autoCheck,
    currentIndex,
    finished,
    questionOrder,
    quizSet,
    remainingSeconds,
    selectedChoiceId,
    submitted,
  ]);

  const persistCurrentAttempt = useCallback(() => {
    const latestAttempt = latestAttemptRef.current;

    if (quizSet == null || latestAttempt == null) {
      return;
    }

    saveQuizAttempt(quizSet.id, latestAttempt);
  }, [quizSet, saveQuizAttempt]);

  useEffect(() => {
    if (!isFocused) {
      persistCurrentAttempt();
    }
  }, [isFocused, persistCurrentAttempt]);

  useEffect(
    () => () => {
      persistCurrentAttempt();
    },
    [persistCurrentAttempt],
  );

  const exitQuiz = useCallback(() => {
    persistCurrentAttempt();
    router.replace(returnHref);
  }, [persistCurrentAttempt, returnHref, router]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      exitQuiz();
      return true;
    });

    return () => {
      subscription.remove();
    };
  }, [exitQuiz, isFocused]);

  useEffect(() => {
    if (!isFocused || finished || questionOrder.length === 0 || quizSet == null || remainingSeconds <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setRemainingSeconds((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [finished, isFocused, questionOrder.length, quizSet, remainingSeconds]);

  useEffect(() => {
    if (
      !isFocused ||
      finished ||
      questionOrder.length === 0 ||
      quizSet == null ||
      remainingSeconds !== 0
    ) {
      return;
    }

    latestAttemptRef.current = null;
    clearQuizAttempt(quizSet.id);
    recordQuizResult(quizSet.id, score, orderedQuestions.length);

    if (passed) {
      earnCoins({
        sourceId: `quiz-${quizSet.id}`,
        title: "Assessment Passed",
        description: quizSet.title,
        amount: 10,
      });
    }

    setTimedOut(true);
    setFinished(true);
    setShowReview(false);
  }, [
    clearQuizAttempt,
    earnCoins,
    finished,
    isFocused,
    orderedQuestions.length,
    passed,
    questionOrder.length,
    quizSet,
    recordQuizResult,
    remainingSeconds,
    score,
  ]);

  if (category == null || quizSet == null) {
    return (
      <View style={styles.screen}>
        <FloatingDetailHeader fallbackHref={returnHref} showCoins={false} />
        <View style={[styles.notFound, { paddingTop: Math.max(insets.top, 18) + 70 }]}>
          <Text style={styles.title}>Quiz set not found</Text>
          <Text style={styles.subtitle}>This quiz set is not available.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.replace(returnHref)} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const resetQuestionState = (nextIndex: number) => {
    const nextQuestion = orderedQuestions[nextIndex];
    const nextAnswerId = nextQuestion == null ? undefined : answersByQuestionId[nextQuestion.id];

    setCurrentIndex(nextIndex);
    setSelectedChoiceId(nextAnswerId ?? null);
    setSubmitted(nextAnswerId != null);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ animated: false, y: 0 });
    });
  };

  const submitAnswer = (choiceId = selectedChoiceId) => {
    if (currentQuestion == null || choiceId == null) {
      return;
    }

    setAnswersByQuestionId((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: choiceId,
    }));
    setSelectedChoiceId(choiceId);
    setSubmitted(true);
  };

  const selectAnswer = (choiceId: string) => {
    if (submitted) {
      return;
    }

    if (autoCheck) {
      submitAnswer(choiceId);
      return;
    }

    setSelectedChoiceId(choiceId);
  };

  const finishQuiz = () => {
    latestAttemptRef.current = null;
    clearQuizAttempt(quizSet.id);
    recordQuizResult(quizSet.id, score, orderedQuestions.length);

    if (passed) {
      earnCoins({
        sourceId: `quiz-${quizSet.id}`,
        title: "Assessment Passed",
        description: quizSet.title,
        amount: 10,
      });
    }

    setTimedOut(false);
    setFinished(true);
    setShowReview(false);
  };

  const goNext = () => {
    if (!submitted) {
      submitAnswer();
      return;
    }

    if (currentIndex === orderedQuestions.length - 1) {
      finishQuiz();
      return;
    }

    resetQuestionState(currentIndex + 1);
  };

  const goPrevious = () => {
    if (!allowBack || currentIndex === 0) {
      return;
    }

    resetQuestionState(currentIndex - 1);
  };

  const restartQuiz = (nextOrder = questionOrder) => {
    latestAttemptRef.current = null;
    clearQuizAttempt(quizSet.id);
    setQuestionOrder(nextOrder);
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setSubmitted(false);
    setAnswersByQuestionId({});
    setFinished(false);
    setShowReview(false);
    setTimedOut(false);
    setRemainingSeconds(getQuizDurationSeconds(quizSet, nextOrder.length));
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ animated: false, y: 0 });
    });
  };

  const shuffleQuestions = () => {
    const shuffled = buildQuestionOrder({
      limit: quizSet.questionLimit,
      questions,
      randomize: true,
    });

    if (shuffled.join("|") === questionOrder.join("|") && shuffled.length > 1) {
      shuffled.reverse();
    }

    restartQuiz(shuffled);
    setActionsOpen(false);
  };

  const toggleAllowBack = () => {
    setAllowBack((enabled) => !enabled);
  };

  const toggleAutoCheck = () => {
    setAutoCheck((enabled) => !enabled);
  };

  return (
    <View style={styles.screen}>
      <FloatingDetailHeader
        fallbackHref={returnHref}
        onBack={exitQuiz}
        rightAccessory={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Quiz actions"
            onPress={() => setActionsOpen(true)}
            style={({ pressed }) => [styles.headerActionButton, pressed ? styles.pressed : null]}
          >
            <EllipsisVerticalIcon color="#061b49" size={19} strokeWidth={2.2} />
          </Pressable>
        }
      />
      <QuizActionsModal
        allowBack={allowBack}
        autoCheck={autoCheck}
        onClose={() => setActionsOpen(false)}
        onShuffle={shuffleQuestions}
        onToggleAutoCheck={toggleAutoCheck}
        onToggleBack={toggleAllowBack}
        visible={actionsOpen}
      />
      <ScrollView
        ref={scrollRef}
        testID="quiz-set-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 126,
            paddingTop: Math.max(insets.top, 18) + 66,
          },
        ]}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>{category.title.toUpperCase()}</Text>
            <Text style={styles.title}>{quizSet.title}</Text>
            <Text style={styles.subtitle}>{quizSet.description}</Text>
          </View>
          <Image
            source={quizSet.image}
            resizeMode="contain"
            accessibilityLabel={quizSet.imageLabel}
            style={styles.heroImage}
          />
        </View>

        {finished ? (
          <>
            <QuizResultCard
              onChooseSet={() => router.replace(returnHref)}
              onRetake={() =>
                restartQuiz(buildQuestionOrder({
                  limit: quizSet.questionLimit,
                  questions,
                  randomize: quizSet.randomizeByDefault === true,
                }))
              }
              onToggleReview={() => setShowReview((visible) => !visible)}
              reviewVisible={showReview}
              returnLabel={returnLabel}
              score={score}
              timedOut={timedOut}
              totalQuestions={orderedQuestions.length}
            />
            {showReview ? <ReviewAnswers records={answerRecords} /> : null}
          </>
        ) : currentQuestion != null ? (
          <QuestionCard
            allowBack={allowBack}
            autoCheck={autoCheck}
            canGoPrevious={currentIndex > 0}
            currentIndex={currentIndex}
            onNext={goNext}
            onPrevious={goPrevious}
            onSelect={selectAnswer}
            onSubmit={() => submitAnswer()}
            progress={progress}
            question={currentQuestion}
            remainingSeconds={remainingSeconds}
            selectedChoiceId={selectedChoiceId}
            submitted={submitted}
            totalQuestions={orderedQuestions.length}
          />
        ) : (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>No questions available</Text>
            <Text style={styles.resultText}>Choose another quiz set.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function QuizActionsModal({
  allowBack,
  autoCheck,
  onClose,
  onShuffle,
  onToggleAutoCheck,
  onToggleBack,
  visible,
}: {
  allowBack: boolean;
  autoCheck: boolean;
  onClose: () => void;
  onShuffle: () => void;
  onToggleAutoCheck: () => void;
  onToggleBack: () => void;
  visible: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={[
          styles.modalBackdrop,
          { paddingTop: Math.max(insets.top, 18) + 50 },
        ]}
      >
        <Pressable style={styles.actionsPanel}>
          <Text style={styles.actionsTitle}>Quiz Actions</Text>
          <ActionRow
            description="Randomize the question order and restart this set."
            label="Shuffle Questions"
            onPress={onShuffle}
          />
          <ActionRow
            description="Allow going back to previous questions."
            label={allowBack ? "Disable Back" : "Enable Back"}
            onPress={onToggleBack}
            selected={allowBack}
          />
          <ActionRow
            description="Check the answer immediately after selection."
            label={autoCheck ? "Disable Auto-Check" : "Enable Auto-Check"}
            onPress={onToggleAutoCheck}
            selected={autoCheck}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function ActionRow({
  description,
  label,
  onPress,
  selected,
}: {
  description: string;
  label: string;
  onPress: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionRow,
        selected ? styles.actionRowSelected : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.actionIcon, selected ? styles.actionIconSelected : null]}>
        <RefreshIcon
          color={selected ? "#ffffff" : "#2f973b"}
          size={15}
          strokeWidth={2.3}
        />
      </View>
      <View style={styles.actionCopy}>
        <Text style={styles.actionLabel}>{label}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
    </Pressable>
  );
}

function QuizResultCard({
  onChooseSet,
  onRetake,
  onToggleReview,
  reviewVisible,
  returnLabel,
  score,
  timedOut,
  totalQuestions,
}: {
  onChooseSet: () => void;
  onRetake: () => void;
  onToggleReview: () => void;
  reviewVisible: boolean;
  returnLabel: string;
  score: number;
  timedOut: boolean;
  totalQuestions: number;
}) {
  const percent = getQuizScorePercent(score, totalQuestions);
  const passed = isPassingScore(score, totalQuestions);

  return (
    <View style={styles.resultCard}>
      <ScoreGauge percent={percent} />
      <Text style={styles.resultTitle}>{passed ? "Assessment Passed" : "Assessment Not Passed"}</Text>
      <Text style={[styles.passStatus, passed ? styles.passStatusPassed : styles.passStatusFailed]}>
        Passing score: {PASSING_PERCENT}%
      </Text>
      <Text style={styles.resultText}>
        {timedOut ? "Time expired. Your assessment was submitted automatically. " : ""}
        You scored {score} out of {totalQuestions}. {passed
          ? "Congratulations, you passed the assessment."
          : "Review the missed answers, then retake the assessment."}
      </Text>
      <View style={styles.resultActions}>
        <Pressable accessibilityRole="button" onPress={onToggleReview} style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>{reviewVisible ? "Hide Review" : "Review Answers"}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onChooseSet} style={styles.secondaryAction}>
          <Text style={styles.secondaryActionText}>{returnLabel}</Text>
        </Pressable>
      </View>
      <Pressable accessibilityRole="button" onPress={onRetake} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Retake Assessment</Text>
      </Pressable>
    </View>
  );
}

function ScoreGauge({ percent }: { percent: number }) {
  const arcLength = 220;
  const clampedPercent = Math.max(0, Math.min(percent, 100));

  return (
    <View style={styles.scoreGauge}>
      <Svg width={190} height={104} viewBox="0 0 190 104">
        <Path
          d="M 25 88 A 70 70 0 0 1 165 88"
          fill="none"
          stroke="#e5ebe7"
          strokeLinecap="round"
          strokeWidth={8}
        />
        <Path
          d="M 25 88 A 70 70 0 0 1 165 88"
          fill="none"
          stroke="#2f973b"
          strokeDasharray={`${arcLength} ${arcLength}`}
          strokeDashoffset={arcLength - (arcLength * clampedPercent) / 100}
          strokeLinecap="round"
          strokeWidth={8}
        />
      </Svg>
      <Text style={styles.scoreText}>{clampedPercent}%</Text>
    </View>
  );
}

function ReviewAnswers({ records }: { records: QuizAnswerRecord[] }) {
  return (
    <View style={styles.reviewList}>
      <Text style={styles.sectionTitle}>Answer Review</Text>
      {records.map((record, index) => (
        <View key={record.questionId} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewIndex}>Question {index + 1}</Text>
            <Text style={[styles.reviewStatus, record.correct ? styles.reviewCorrect : styles.reviewWrong]}>
              {record.correct ? "Correct" : "Review"}
            </Text>
          </View>
          <Text style={styles.reviewPrompt}>{record.questionPrompt}</Text>
          <Text style={styles.reviewAnswer}>Your answer: {record.selectedLabel}</Text>
          {!record.correct ? (
            <Text style={styles.reviewAnswer}>Correct answer: {record.correctLabel}</Text>
          ) : null}
          <Text style={styles.reviewExplanation}>{record.explanation}</Text>
        </View>
      ))}
    </View>
  );
}

function QuestionCard({
  allowBack,
  autoCheck,
  canGoPrevious,
  currentIndex,
  onNext,
  onPrevious,
  onSelect,
  onSubmit,
  progress,
  question,
  remainingSeconds,
  selectedChoiceId,
  submitted,
  totalQuestions,
}: {
  allowBack: boolean;
  autoCheck: boolean;
  canGoPrevious: boolean;
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (choiceId: string) => void;
  onSubmit: () => void;
  progress: number;
  question: QuizQuestion;
  remainingSeconds: number;
  selectedChoiceId: string | null;
  submitted: boolean;
  totalQuestions: number;
}) {
  const flipProgress = useSharedValue(0);
  const revealAnswer = submitted && autoCheck;
  const selectedCorrect = revealAnswer && selectedChoiceId === question.answerId;
  const primaryLabel = submitted
    ? currentIndex === totalQuestions - 1
      ? "Finish Quiz"
      : "Next Question"
    : autoCheck
      ? "Choose an Answer"
      : "Submit Answer";

  useEffect(() => {
    flipProgress.value = withTiming(revealAnswer ? 1 : 0, { duration: 240 });
  }, [flipProgress, question.id, revealAnswer]);

  const frontStyle = useAnimatedStyle(() => ({
    opacity: flipProgress.value < 0.5 ? 1 : 0,
    transform: [
      { perspective: 900 },
      { rotateY: `${flipProgress.value * 180}deg` },
    ],
  }));

  const backStyle = useAnimatedStyle(() => ({
    opacity: flipProgress.value >= 0.5 ? 1 : 0,
    transform: [
      { perspective: 900 },
      { rotateY: `${180 + flipProgress.value * 180}deg` },
    ],
  }));

  const toggleCard = () => {
    if (!revealAnswer) {
      return;
    }

    flipProgress.value = withTiming(flipProgress.value >= 0.5 ? 0 : 1, { duration: 220 });
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(220)}
      layout={LinearTransition.springify().damping(18).stiffness(140)}
      style={styles.questionCard}
    >
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {totalQuestions}
        </Text>
        <Text style={styles.timerText}>Time {formatSeconds(remainingSeconds)}</Text>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={revealAnswer ? "Review answer card" : "Question card"}
        disabled={!revealAnswer}
        onPress={toggleCard}
        style={styles.flashCard}
      >
        <Animated.View style={[styles.flashFace, styles.flashFront, frontStyle]}>
          <Text style={styles.cardLabel}>Question</Text>
          {question.image != null ? (
            <Image
              source={question.image}
              resizeMode="contain"
              accessibilityLabel={question.imageLabel ?? "Question image"}
              style={styles.questionImage}
            />
          ) : null}
          <Text style={styles.questionText}>{question.prompt}</Text>
          <Text style={styles.cardHint}>
            {autoCheck
              ? "Auto-check is enabled."
              : submitted
                ? "Answer saved. Results are shown after the assessment."
                : "Choose an answer below."}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.flashFace, styles.flashBack, backStyle]}>
          <Text style={[styles.answerStatus, selectedCorrect ? styles.answerCorrect : styles.answerWrong]}>
            {selectedCorrect ? "Correct" : "Review"}
          </Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
          <Text style={styles.cardHint}>Tap card to flip back.</Text>
        </Animated.View>
      </Pressable>

      <View style={styles.choiceList}>
        {question.choices.map((choice, index) => {
          const selected = selectedChoiceId === choice.id;
          const correct = revealAnswer && choice.id === question.answerId;
          const wrong = revealAnswer && selected && choice.id !== question.answerId;

          return (
            <Animated.View
              key={choice.id}
              entering={FadeInUp.delay(index * 45).duration(180)}
              layout={LinearTransition.duration(160)}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={choice.label}
                accessibilityState={{ selected }}
                disabled={submitted}
                onPress={() => onSelect(choice.id)}
                style={[
                  styles.choiceButton,
                  selected ? styles.choiceButtonSelected : null,
                  correct ? styles.choiceButtonCorrect : null,
                  wrong ? styles.choiceButtonWrong : null,
                ]}
              >
                <Text style={styles.choiceText}>{choice.label}</Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.questionActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous question"
          disabled={!allowBack || !canGoPrevious}
          onPress={onPrevious}
          style={[
            styles.backQuestionButton,
            !allowBack || !canGoPrevious ? styles.actionDisabled : null,
          ]}
        >
          <ArrowLeftIcon color="#2f973b" size={16} strokeWidth={2.2} />
          <Text style={styles.backQuestionText}>Back</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          disabled={selectedChoiceId == null || (autoCheck && !submitted)}
          onPress={submitted ? onNext : onSubmit}
          style={[
            styles.primaryButton,
            styles.questionPrimaryButton,
            selectedChoiceId == null || (autoCheck && !submitted) ? styles.primaryButtonDisabled : null,
          ]}
        >
          <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  actionCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  actionDescription: {
    color: "#60708a",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 14,
  },
  actionDisabled: {
    opacity: 0.45,
  },
  actionIcon: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 12,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  actionIconSelected: {
    backgroundColor: "#2f973b",
  },
  actionLabel: {
    color: "#061b49",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  actionRow: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 62,
    padding: 10,
  },
  actionRowSelected: {
    backgroundColor: "#f7fff7",
    borderColor: "#cfeecf",
  },
  answerCorrect: {
    color: "#2f973b",
  },
  answerStatus: {
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
  answerWrong: {
    color: "#ef4444",
  },
  backQuestionButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#cfeecf",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    height: 46,
    justifyContent: "center",
    paddingHorizontal: 13,
  },
  backQuestionText: {
    color: "#2f973b",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  cardHint: {
    color: "#7b8796",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  cardLabel: {
    color: "#2f973b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
    textTransform: "uppercase",
  },
  choiceButton: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
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
  choiceList: {
    gap: 8,
  },
  choiceText: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 17,
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  eyebrow: {
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
  },
  explanationText: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  flashBack: {
    backgroundColor: "#effbf2",
    borderColor: "#cfeecf",
    position: "absolute",
  },
  flashCard: {
    minHeight: 168,
    position: "relative",
  },
  flashFace: {
    backfaceVisibility: "hidden",
    borderColor: "#dfe8e2",
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    left: 0,
    minHeight: 168,
    padding: 16,
    right: 0,
    top: 0,
  },
  flashFront: {
    backgroundColor: "#ffffff",
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: "#e8f7df",
    borderColor: "#cfeecf",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 112,
    overflow: "hidden",
    padding: 14,
  },
  heroCopy: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  heroImage: {
    height: 88,
    width: 96,
  },
  headerActionButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.08)",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  actionsPanel: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 8px 24px rgba(23, 34, 48, 0.18)",
    gap: 9,
    padding: 12,
    width: 284,
  },
  actionsTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
    paddingHorizontal: 2,
  },
  modalBackdrop: {
    alignItems: "flex-end",
    backgroundColor: "rgba(6, 27, 73, 0.16)",
    flex: 1,
    paddingHorizontal: 18,
  },
  notFound: {
    gap: 12,
    padding: 18,
  },
  passStatus: {
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  passStatusFailed: {
    backgroundColor: "#fff0f2",
    color: "#ef4444",
  },
  passStatusPassed: {
    backgroundColor: "#effbf2",
    color: "#2f973b",
  },
  pressed: {
    opacity: 0.86,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#2f973b",
    borderRadius: 16,
    height: 46,
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
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
  progressText: {
    color: "#60708a",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 15,
  },
  progressTrack: {
    backgroundColor: "#e5ebe7",
    borderRadius: 999,
    height: 7,
    overflow: "hidden",
  },
  questionActions: {
    flexDirection: "row",
    gap: 10,
  },
  questionCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  questionImage: {
    alignSelf: "center",
    height: 112,
    width: "100%",
  },
  questionPrimaryButton: {
    flex: 1,
  },
  questionText: {
    color: "#061b49",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
  },
  resultActions: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  resultCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  resultText: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: "center",
  },
  resultTitle: {
    color: "#061b49",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 23,
    textAlign: "center",
  },
  reviewAnswer: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  reviewCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    gap: 7,
    padding: 13,
  },
  reviewCorrect: {
    color: "#2f973b",
  },
  reviewExplanation: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  reviewHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewIndex: {
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    textTransform: "uppercase",
  },
  reviewList: {
    gap: 10,
  },
  reviewPrompt: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  reviewStatus: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    textTransform: "uppercase",
  },
  reviewWrong: {
    color: "#ef4444",
  },
  scoreGauge: {
    alignItems: "center",
    height: 104,
    justifyContent: "flex-end",
    width: 190,
  },
  scoreText: {
    bottom: 18,
    color: "#061b49",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 23,
    position: "absolute",
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  secondaryAction: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderColor: "#cfeecf",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    height: 42,
    justifyContent: "center",
  },
  secondaryActionText: {
    color: "#2f973b",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
  },
  sectionTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  subtitle: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  title: {
    color: "#061b49",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 24,
  },
  timerText: {
    color: "#2f973b",
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
  },
});
