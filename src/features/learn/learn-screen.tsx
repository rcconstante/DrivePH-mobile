import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryFilter } from "@/components/common/category-filter";
import { ChevronRightIcon } from "@/components/ui/icons";
import { CoinBalancePill } from "@/features/coins/components/coin-balance-pill";
import {
  getLearnDetailByTopicId,
  getLearnSubmoduleProgressId,
  getTopicStageCount,
  learnCategories,
  learnTopics,
  type LearnCategoryId,
  type LearnTopic,
} from "@/features/learn/data";
import { useLearnProgress } from "@/features/learn/learn-progress-store";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

export function LearnScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const {
    getCompletedStageCount,
    getTopicProgressPercent,
    isItemCompleted,
  } = useLearnProgress();
  const [selectedCategory, setSelectedCategory] = useState<LearnCategoryId>("all");
  useScrollToTopOnFocus(scrollRef);

  const visibleTopics = useMemo(
    () =>
      selectedCategory === "all"
        ? learnTopics
        : learnTopics.filter((topic) => topic.categoryId === selectedCategory),
    [selectedCategory],
  );

  const handleTopicPress = (topic: LearnTopic) => {
    router.push({
      pathname: "/learn/[topicId]",
      params: { topicId: topic.id },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.fixedHeader, { paddingTop: Math.max(insets.top, 18) }]}>
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>Learn</Text>
          <CoinBalancePill />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>
              Understand.{"\n"}
              Learn.{"\n"}
              Drive Safely.
            </Text>
            <Text style={styles.heroText}>Everything you need to know, in one place.</Text>
          </View>
          <Image
            source={require("../../assets/cute-assets/learn-header.png")}
            resizeMode="contain"
            accessibilityLabel="Driver license card and arrow"
            style={styles.heroImage}
          />
        </View>

        <CategoryFilter
          items={learnCategories}
          onSelect={setSelectedCategory}
          selectedId={selectedCategory}
        />
      </View>

      <ScrollView
        ref={scrollRef}
        testID="learn-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 126,
            paddingTop: 12,
          },
        ]}
      >
        <View style={styles.topicList}>
          {visibleTopics.map((topic) => {
            const detail = getLearnDetailByTopicId(topic.id);
            const isModuleTopic = detail?.showSubmoduleList === true;
            const totalStages = isModuleTopic ? detail.sections.length : getTopicStageCount();
            const completedStages = isModuleTopic
              ? detail.sections.filter((section) =>
                isItemCompleted(getLearnSubmoduleProgressId(topic.id, section.id)),
              ).length
              : getCompletedStageCount(topic.id);
            const progressPercent = isModuleTopic
              ? totalStages === 0
                ? 0
                : Math.round((completedStages / totalStages) * 100)
              : getTopicProgressPercent(topic.id, totalStages);

            return (
              <LearnTopicCard
                key={topic.id}
                completedStages={completedStages}
                progressLabel={isModuleTopic ? "submodules" : "steps"}
                onPress={() => handleTopicPress(topic)}
                progressPercent={progressPercent}
                topic={topic}
                totalStages={totalStages}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function LearnTopicCard({
  completedStages,
  onPress,
  progressLabel,
  progressPercent,
  topic,
  totalStages,
}: {
  completedStages: number;
  onPress: () => void;
  progressLabel: string;
  progressPercent: number;
  topic: LearnTopic;
  totalStages: number;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${topic.title}, ${completedStages} of ${totalStages} stages completed`}
      accessibilityHint="Opens topic detail"
      onPress={onPress}
      style={({ pressed }) => [styles.topicCard, pressed ? styles.cardPressed : null]}
    >
      <Image
        source={topic.image}
        resizeMode="contain"
        accessibilityLabel={topic.imageLabel}
        style={styles.topicImage}
      />

      <View style={styles.topicCopy}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text numberOfLines={2} style={styles.topicDescription}>
          {topic.description}
        </Text>
        <View style={styles.topicTrack}>
          <View style={styles.topicProgressBar}>
            <View style={[styles.topicFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.topicCount}>
            {completedStages}/{totalStages} {progressLabel}
          </Text>
        </View>
      </View>

      <View style={styles.topicMeta}>
        <ChevronRightIcon color="#8f9aa6" size={20} strokeWidth={2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardPressed: {
    opacity: 0.86,
  },
  fixedHeader: {
    backgroundColor: "#fbfcf8",
    gap: 12,
    paddingHorizontal: 18,
    paddingBottom: 10,
    zIndex: 2,
  },
  heroCard: {
    backgroundColor: "#6abf58",
    borderRadius: 16,
    flexDirection: "row",
    minHeight: 122,
    overflow: "hidden",
    padding: 14,
  },
  heroCopy: {
    flex: 1,
    gap: 7,
    justifyContent: "center",
    zIndex: 1,
  },
  heroImage: {
    bottom: -6,
    height: 116,
    position: "absolute",
    right: 0,
    width: 156,
  },
  heroText: {
    color: "#efffed",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 14,
    maxWidth: 156,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
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
  listContent: {
    paddingHorizontal: 18,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
    boxShadow: "0 4px 12px rgba(23, 34, 48, 0.06)",
    flexDirection: "row",
    gap: 12,
    minHeight: 84,
    padding: 10,
  },
  topicCopy: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  topicCount: {
    color: "#6d7782",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 13,
  },
  topicDescription: {
    color: "#5d6875",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 14,
  },
  topicFill: {
    backgroundColor: "#4caf50",
    borderRadius: 999,
    height: "100%",
  },
  topicImage: {
    height: 58,
    width: 66,
  },
  topicList: {
    gap: 10,
  },
  topicMeta: {
    alignItems: "center",
    gap: 12,
  },
  topicTitle: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  topicTrack: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    marginTop: 2,
    width: 112,
  },
  topicProgressBar: {
    backgroundColor: "#e7ece8",
    borderRadius: 999,
    flex: 1,
    height: 5,
    overflow: "hidden",
  },
});
