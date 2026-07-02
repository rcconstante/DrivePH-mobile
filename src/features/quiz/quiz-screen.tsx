import { useRouter } from "expo-router";
import { useRef } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRightIcon } from "@/components/ui/icons";
import { CoinBalancePill } from "@/features/coins/components/coin-balance-pill";
import {
  getFeaturedQuizSet,
  getQuizCategoryQuestionCount,
  getQuizSetsByCategoryId,
  quizCategories,
  type QuizCategory,
} from "@/features/quiz/data";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

export function QuizScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  useScrollToTopOnFocus(scrollRef);

  const openQuiz = (quizId: QuizCategory["id"]) => {
    router.push({
      pathname: "/quiz/[quizId]",
      params: { quizId },
    });
  };

  const openFeaturedQuiz = () => {
    const featuredSet = getFeaturedQuizSet();

    if (featuredSet == null) {
      return;
    }

    router.push({
      pathname: "/quiz/[quizId]/[setId]",
      params: {
        origin: "quiz",
        quizId: featuredSet.categoryId,
        setId: featuredSet.id,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        testID="quiz-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 126,
            paddingTop: Math.max(insets.top, 18),
          },
        ]}
      >
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>Quiz</Text>
          <CoinBalancePill />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>
              Test your knowledge{"\n"}
              and earn coins!
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Start quiz"
              onPress={openFeaturedQuiz}
              style={styles.startButton}
            >
              <Text style={styles.startButtonText}>Start Quiz</Text>
              <ChevronRightIcon color="#ffffff" size={16} strokeWidth={2.2} />
            </Pressable>
          </View>
          <Image
            source={require("../../assets/cute-assets/quiz-header.png")}
            resizeMode="contain"
            accessibilityLabel="Quiz clipboard, cone, and pencil"
            style={styles.heroImage}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quiz Categories</Text>
        </View>

        <View style={styles.categoryGrid}>
          {quizCategories.map((category) => (
            <QuizCategoryCard key={category.id} category={category} onPress={() => openQuiz(category.id)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function QuizCategoryCard({ category, onPress }: { category: QuizCategory; onPress: () => void }) {
  const setCount = getQuizSetsByCategoryId(category.id).length;
  const questionCount = getQuizCategoryQuestionCount(category.id);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${category.title}, ${questionCount} questions`}
      onPress={onPress}
      style={({ pressed }) => [styles.categoryCard, pressed ? styles.cardPressed : null]}
    >
      <Image
        source={category.image}
        resizeMode="contain"
        accessibilityLabel={category.imageLabel}
        style={styles.categoryImage}
      />
      <View style={styles.categoryCopy}>
        <Text numberOfLines={1} style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryMeta}>
          {setCount} {setCount === 1 ? "Set" : "Sets"} | {questionCount} Questions
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardPressed: {
    opacity: 0.86,
  },
  categoryCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
    boxShadow: "0 4px 12px rgba(23, 34, 48, 0.06)",
    flexBasis: "47.5%",
    flexDirection: "row",
    flexGrow: 1,
    gap: 8,
    minHeight: 72,
    padding: 10,
  },
  categoryCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryImage: {
    height: 46,
    width: 48,
  },
  categoryMeta: {
    color: "#6d7782",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 13,
  },
  categoryTitle: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
  },
  content: {
    gap: 12,
    paddingHorizontal: 18,
  },
  heroCard: {
    backgroundColor: "#e8f7df",
    borderRadius: 16,
    flexDirection: "row",
    minHeight: 118,
    overflow: "hidden",
    padding: 14,
  },
  heroCopy: {
    flex: 1,
    gap: 11,
    justifyContent: "center",
    zIndex: 1,
  },
  heroImage: {
    bottom: -10,
    height: 124,
    position: "absolute",
    right: 0,
    width: 168,
  },
  heroTitle: {
    color: "#172230",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  screenTitle: {
    color: "#172230",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
  },
  scroll: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
  },
  sectionTitle: {
    color: "#172230",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  startButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#2f973b",
    borderRadius: 999,
    flexDirection: "row",
    gap: 5,
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 14,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
