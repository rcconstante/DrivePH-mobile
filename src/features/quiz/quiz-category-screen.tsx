import { useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FloatingDetailHeader } from "@/components/navigation/floating-detail-header";
import { ChevronRightIcon } from "@/components/ui/icons";
import {
  getQuizCategoryById,
  getQuizSetsByCategoryId,
  type QuizCategoryId,
  type QuizSet,
} from "@/features/quiz/data";
import { useQuizProgress } from "@/features/quiz/quiz-progress-store";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

type QuizCategoryScreenProps = {
  quizId: string;
};

export function QuizCategoryScreen({ quizId }: QuizCategoryScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const category = getQuizCategoryById(quizId);
  const quizSets = useMemo(
    () => (category == null ? [] : getQuizSetsByCategoryId(category.id)),
    [category],
  );

  useScrollToTopOnFocus(scrollRef);

  if (category == null) {
    return (
      <View style={styles.screen}>
        <FloatingDetailHeader showCoins={false} />
        <View style={[styles.notFound, { paddingTop: Math.max(insets.top, 18) + 70 }]}>
          <Text style={styles.title}>Category not found</Text>
          <Text style={styles.subtitle}>This quiz category is not available.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Return to Quiz</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const openQuizSet = (quizSet: QuizSet) => {
    router.push({
      pathname: "/quiz/[quizId]/[setId]",
      params: {
        origin: "quiz",
        quizId: quizSet.categoryId,
        setId: quizSet.id,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <FloatingDetailHeader />
      <ScrollView
        ref={scrollRef}
        testID="quiz-category-screen"
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
            <Text style={styles.eyebrow}>QUIZ CATEGORY</Text>
            <Text style={styles.title}>{category.title}</Text>
            <Text style={styles.subtitle}>{category.description}</Text>
          </View>
          <Image
            source={category.image}
            resizeMode="contain"
            accessibilityLabel={category.imageLabel}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose a Quiz Set</Text>
          <Text style={styles.sectionMeta}>{quizSets.length} sets</Text>
        </View>

        <View style={styles.setList}>
          {quizSets.map((quizSet) => (
            <QuizSetCard
              key={quizSet.id}
              onPress={() => openQuizSet(quizSet)}
              quizSet={quizSet}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function QuizSetCard({ onPress, quizSet }: { onPress: () => void; quizSet: QuizSet }) {
  const { getQuizProgress, getQuizProgressPercent } = useQuizProgress();
  const totalQuestions = quizSet.questions.length;
  const progress = getQuizProgress(quizSet.id, totalQuestions);
  const progressPercent = getQuizProgressPercent(quizSet.id, totalQuestions);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${quizSet.title}, ${totalQuestions} questions`}
      onPress={onPress}
      style={({ pressed }) => [styles.setCard, pressed ? styles.pressed : null]}
    >
      <Image
        source={quizSet.image}
        resizeMode="contain"
        accessibilityLabel={quizSet.imageLabel}
        style={styles.setImage}
      />
      <View style={styles.setCopy}>
        <Text numberOfLines={1} style={styles.setTitle}>{quizSet.title}</Text>
        <Text numberOfLines={2} style={styles.setDescription}>{quizSet.description}</Text>
        <View style={styles.progressRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressCount}>
            {progress.completedQuestions}/{totalQuestions}
          </Text>
        </View>
        <Text style={styles.setMeta}>
          {quizSet.estimatedMinutes} | Best {progress.bestScore}/{totalQuestions}
        </Text>
      </View>
      <View style={styles.chevronCircle}>
        <ChevronRightIcon color="#2f973b" size={18} strokeWidth={2.3} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chevronCircle: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    width: 30,
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
  heroCard: {
    alignItems: "center",
    backgroundColor: "#e8f7df",
    borderColor: "#cfeecf",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 116,
    overflow: "hidden",
    padding: 14,
  },
  heroCopy: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  heroImage: {
    height: 84,
    width: 92,
  },
  notFound: {
    gap: 12,
    padding: 18,
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
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  progressCount: {
    color: "#2f973b",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
    minWidth: 34,
    textAlign: "right",
  },
  progressFill: {
    backgroundColor: "#2f973b",
    borderRadius: 999,
    height: "100%",
  },
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  progressTrack: {
    backgroundColor: "#e5ebe7",
    borderRadius: 999,
    flex: 1,
    height: 6,
    overflow: "hidden",
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionMeta: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "800",
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
  setCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.06)",
    flexDirection: "row",
    gap: 11,
    minHeight: 98,
    padding: 11,
  },
  setCopy: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  setDescription: {
    color: "#5d6875",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 14,
  },
  setImage: {
    height: 58,
    width: 62,
  },
  setList: {
    gap: 10,
  },
  setMeta: {
    color: "#6d7782",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 13,
  },
  setTitle: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
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
});
