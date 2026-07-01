import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon, CheckIcon } from "@/components/ui/icons";
import {
  getLearnTopicById,
  getMockLessonsForTopic,
  getTopicProgress,
  type LearnLesson,
} from "@/features/learn/data";

type LearnTopicScreenProps = {
  topicId: string;
};

export function LearnTopicScreen({ topicId }: LearnTopicScreenProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topic = getLearnTopicById(topicId);

  if (topic == null) {
    return (
      <View style={styles.screen}>
        <View style={[styles.notFound, { paddingTop: Math.max(insets.top, 18) }]}>
          <Text style={styles.title}>Topic not found</Text>
          <Text style={styles.subtitle}>This mock learning topic does not exist.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const lessons = getMockLessonsForTopic(topic);
  const percent = getTopicProgress(topic.completedTopics, topic.totalTopics);

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="learn-topic-screen"
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
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeftIcon color="#4caf50" size={18} strokeWidth={1.9} />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <View style={styles.topicHeader}>
          <Image
            source={topic.image}
            resizeMode="contain"
            accessibilityLabel={topic.imageLabel}
            style={styles.topicImage}
          />
          <View style={styles.topicHeaderCopy}>
            <Text style={styles.title}>{topic.title}</Text>
            <Text style={styles.subtitle}>{topic.description}</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Mock Progress</Text>
            <Text style={styles.progressPercent}>{percent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
          <Text style={styles.progressCount}>
            {topic.completedTopics} / {topic.totalTopics} mock topics completed
          </Text>
        </View>

        <View style={styles.lessonList}>
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function LessonCard({ lesson }: { lesson: LearnLesson }) {
  return (
    <View style={styles.lessonCard}>
      <View style={styles.lessonCheck}>
        <CheckIcon color="#4caf50" size={16} strokeWidth={2} />
      </View>
      <View style={styles.lessonCopy}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonBody}>{lesson.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 7,
    minHeight: 36,
  },
  backButtonText: {
    color: "#4caf50",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  lessonBody: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 17,
  },
  lessonCard: {
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  lessonCheck: {
    alignItems: "center",
    backgroundColor: "#eef9ef",
    borderRadius: 12,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  lessonCopy: {
    flex: 1,
    gap: 5,
  },
  lessonList: {
    gap: 10,
  },
  lessonTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  notFound: {
    gap: 12,
    padding: 18,
  },
  primaryButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#4caf50",
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
    paddingHorizontal: 18,
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
    gap: 10,
    padding: 14,
  },
  progressCount: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  progressFill: {
    backgroundColor: "#4caf50",
    borderRadius: 999,
    height: "100%",
  },
  progressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressPercent: {
    color: "#4caf50",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 23,
  },
  progressTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  progressTrack: {
    backgroundColor: "#e8edf4",
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  subtitle: {
    color: "#4d5f78",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 17,
  },
  title: {
    color: "#172230",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 25,
  },
  topicHeader: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  topicHeaderCopy: {
    flex: 1,
    gap: 5,
  },
  topicImage: {
    height: 58,
    width: 66,
  },
});
