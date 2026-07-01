import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRightIcon } from "@/components/ui/icons";
import { CoinBalancePill } from "@/features/coins/components/coin-balance-pill";
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

  const handleTopicPress = (topic: LearnTopic) => {
    router.push({
      pathname: "/learn/[topicId]",
      params: { topicId: topic.id },
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="learn-screen"
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

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${topic.title}, ${topic.completedTopics} of ${topic.totalTopics}`}
      accessibilityHint="Opens mock topic detail"
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
          <View style={[styles.topicFill, { width: `${percent}%` }]} />
        </View>
      </View>

      <View style={styles.topicMeta}>
        <Text style={styles.topicCount}>
          {topic.completedTopics}/{topic.totalTopics}
        </Text>
        <ChevronRightIcon color="#8f9aa6" size={20} strokeWidth={2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardPressed: {
    opacity: 0.86,
  },
  categoryButton: {
    alignItems: "center",
    backgroundColor: "#f1f3f2",
    borderRadius: 999,
    height: 31,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  categoryButtonActive: {
    backgroundColor: "#4caf50",
  },
  categoryLabel: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 14,
  },
  categoryLabelActive: {
    color: "#ffffff",
  },
  categoryList: {
    gap: 8,
    paddingRight: 18,
  },
  content: {
    gap: 12,
    paddingHorizontal: 18,
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
    backgroundColor: "#e7ece8",
    borderRadius: 999,
    height: 5,
    marginTop: 2,
    overflow: "hidden",
    width: 86,
  },
});
