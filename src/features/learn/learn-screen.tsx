import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/layout/app-header";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  getTopicProgress,
  learnCategories,
  learnTopics,
  type LearnCategoryId,
  type LearnTopic,
} from "@/features/learn/data";

export function LearnScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<LearnCategoryId>("all");

  const visibleTopics = useMemo(
    () =>
      selectedCategory === "all"
        ? learnTopics
        : learnTopics.filter((topic) => topic.categoryId === selectedCategory),
    [selectedCategory],
  );

  const overallProgress = useMemo(() => {
    const totals = learnTopics.reduce(
      (summary, topic) => ({
        completedTopics: summary.completedTopics + topic.completedTopics,
        totalTopics: summary.totalTopics + topic.totalTopics,
      }),
      { completedTopics: 0, totalTopics: 0 },
    );

    return {
      ...totals,
      percent: getTopicProgress(totals.completedTopics, totals.totalTopics),
    };
  }, []);

  const handleTopicPress = (topic: LearnTopic) => {
    router.push({
      pathname: "/learn/[topicId]",
      params: { topicId: topic.id },
    });
  };

  return (
    <View style={styles.screen}>
      <AppHeader showNotificationDot showSearch />
      <ScrollView
        testID="learn-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 126,
          },
        ]}
      >
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>Learn</Text>
            <Text style={styles.subtitle}>
              Learn essential topics to become a responsible and confident driver.
            </Text>
          </View>
          <Image
            source={require("../../assets/images/learn-header.png")}
            resizeMode="contain"
            accessibilityLabel="Books with graduation cap and Philippine flag"
            style={styles.heroImage}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Overall progress ${overallProgress.percent}%`}
          style={({ pressed }) => [styles.progressCard, pressed ? styles.cardPressed : null]}
        >
          <View style={styles.progressCopy}>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressPercent}>{overallProgress.percent}%</Text>
            <Text style={styles.progressNote}>Keep learning, you're doing great!</Text>
          </View>
          <View style={styles.progressDetails}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${overallProgress.percent}%` }]} />
            </View>
            <Text style={styles.progressCount}>
              {overallProgress.completedTopics} / {overallProgress.totalTopics} topics completed
            </Text>
          </View>
          <ArrowRightIcon color="#63718b" size={18} strokeWidth={1.9} />
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {learnCategories.map((category) => {
            const selected = selectedCategory === category.id;

            return (
              <Pressable
                key={category.id}
                accessibilityRole="button"
                accessibilityLabel={category.label}
                accessibilityState={{ selected }}
                onPress={() => setSelectedCategory(category.id)}
                style={[styles.categoryButton, selected ? styles.categoryButtonActive : null]}
              >
                <Text style={[styles.categoryLabel, selected ? styles.categoryLabelActive : null]}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.topicList}>
          {visibleTopics.map((topic) => (
            <LearnTopicCard key={topic.id} topic={topic} onPress={() => handleTopicPress(topic)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function LearnTopicCard({ onPress, topic }: { onPress: () => void; topic: LearnTopic }) {
  const percent = getTopicProgress(topic.completedTopics, topic.totalTopics);
  const progressColor = getProgressColor(percent);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${topic.title}, ${percent}% complete`}
      accessibilityHint="Opens mock topic detail"
      onPress={onPress}
      style={({ pressed }) => [styles.topicCard, pressed ? styles.topicCardPressed : null]}
    >
      <View style={[styles.topicIcon, { backgroundColor: topic.iconBackgroundColor }]}>
        <Text style={styles.topicIconText}>{topic.iconLabel}</Text>
      </View>

      <View style={styles.topicCopy}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text style={styles.topicDescription}>{topic.description}</Text>
      </View>

      <View style={styles.topicProgress}>
        <View style={styles.topicProgressHeader}>
          <Text style={styles.topicCount}>
            {topic.completedTopics} / {topic.totalTopics}
          </Text>
          <Text style={[styles.topicPercent, { color: progressColor }]}>{percent}%</Text>
        </View>
        <View style={styles.topicTrack}>
          <View style={[styles.topicFill, { backgroundColor: progressColor, width: `${percent}%` }]} />
        </View>
      </View>

      <ArrowRightIcon color="#63718b" size={18} strokeWidth={1.9} />
    </Pressable>
  );
}

function getProgressColor(percent: number) {
  if (percent >= 60) {
    return "#0757ff";
  }

  if (percent >= 50) {
    return "#16a34a";
  }

  return "#f97316";
}

const styles = StyleSheet.create({
  categoryButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dce7f4",
    borderRadius: 12,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  categoryButtonActive: {
    backgroundColor: "#0757ff",
    borderColor: "#0757ff",
  },
  categoryLabel: {
    color: "#061b49",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  categoryLabelActive: {
    color: "#ffffff",
  },
  categoryList: {
    gap: 10,
    paddingRight: 18,
  },
  content: {
    gap: 12,
    paddingHorizontal: 18,
  },
  hero: {
    minHeight: 132,
    overflow: "hidden",
    position: "relative",
  },
  heroCopy: {
    maxWidth: 190,
    paddingTop: 12,
    zIndex: 1,
  },
  heroImage: {
    bottom: -2,
    height: 118,
    position: "absolute",
    right: -12,
    width: 168,
  },
  progressCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 8px 18px rgba(6, 27, 73, 0.08)",
    flexDirection: "row",
    gap: 10,
    minHeight: 88,
    padding: 14,
  },
  progressCopy: {
    width: 90,
  },
  progressCount: {
    color: "#36445f",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 15,
  },
  progressDetails: {
    flex: 1,
    gap: 7,
  },
  progressFill: {
    backgroundColor: "#0757ff",
    borderRadius: 999,
    height: "100%",
  },
  progressLabel: {
    color: "#36445f",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 15,
  },
  progressNote: {
    color: "#7b8aa4",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 14,
    paddingTop: 4,
  },
  progressPercent: {
    color: "#0757ff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 30,
  },
  progressTrack: {
    backgroundColor: "#e8edf4",
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  screen: {
    backgroundColor: "#f7fbff",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  subtitle: {
    color: "#36445f",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 17,
    paddingTop: 8,
  },
  title: {
    color: "#061b49",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 34,
  },
  cardPressed: {
    opacity: 0.86,
  },
  topicCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 4px 12px rgba(6, 27, 73, 0.06)",
    flexDirection: "row",
    gap: 10,
    minHeight: 88,
    padding: 12,
  },
  topicCardPressed: {
    opacity: 0.86,
  },
  topicCopy: {
    flex: 1,
    gap: 4,
  },
  topicCount: {
    color: "#36445f",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 15,
  },
  topicDescription: {
    color: "#4d5f78",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 15,
  },
  topicFill: {
    borderRadius: 999,
    height: "100%",
  },
  topicIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  topicIconText: {
    color: "#0757ff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  topicList: {
    gap: 10,
  },
  topicPercent: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  topicProgress: {
    gap: 6,
    width: 68,
  },
  topicProgressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  topicTrack: {
    backgroundColor: "#e8edf4",
    borderRadius: 999,
    height: 6,
    overflow: "hidden",
  },
});
