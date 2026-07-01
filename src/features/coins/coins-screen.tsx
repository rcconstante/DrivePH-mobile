import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ArrowLeftIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
} from "@/components/ui/icons";

const earnTasks = [
  {
    id: "quiz",
    title: "Complete a Quiz",
    description: "Earn coins by completing quizzes",
    reward: "+10",
    icon: ClipboardCheckIcon,
    color: "#4caf50",
  },
  {
    id: "lesson",
    title: "Complete a Lesson",
    description: "Finish a lesson and earn coins",
    reward: "+15",
    icon: BookOpenIcon,
    color: "#4b8df7",
  },
  {
    id: "check-in",
    title: "Daily Check-in",
    description: "Check in daily to earn coins",
    reward: "+5",
    icon: CheckIcon,
    color: "#7c5cff",
  },
];

export function CoinsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="coins-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 34,
            paddingTop: Math.max(insets.top, 18),
          },
        ]}
      >
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.iconButton}>
            <ArrowLeftIcon color="#172230" size={20} strokeWidth={2} />
          </Pressable>
          <Text style={styles.screenTitle}>My Coins</Text>
          <View style={styles.iconButtonSpacer} />
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceCopy}>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <View style={styles.balanceRow}>
              <Image
                source={require("../../assets/cute-assets/coin.png")}
                resizeMode="contain"
                accessibilityLabel="Coin"
                style={styles.balanceCoin}
              />
              <Text style={styles.balanceValue}>250</Text>
            </View>
            <Text style={styles.balanceUnit}>Coins</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Buy coins"
              onPress={() => router.push("/buy-coins")}
              style={styles.buyButton}
            >
              <Text style={styles.buyButtonText}>Buy Coins</Text>
              <ChevronRightIcon color="#2f973b" size={16} strokeWidth={2.2} />
            </Pressable>
          </View>
          <Image
            source={require("../../assets/cute-assets/coins.png")}
            resizeMode="contain"
            accessibilityLabel="Stack of coins"
            style={styles.balanceImage}
          />
        </View>

        <View style={styles.infoCard}>
          <Image
            source={require("../../assets/cute-assets/gift.png")}
            resizeMode="contain"
            accessibilityLabel="Gift"
            style={styles.infoImage}
          />
          <View style={styles.infoCopy}>
            <Text style={styles.cardTitle}>About Coins</Text>
            <Text style={styles.cardText}>Use coins to unlock premium content, quizzes, and exclusive features.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earn Coins</Text>
          <View style={styles.listCard}>
            {earnTasks.map((task) => {
              const Icon = task.icon;

              return (
                <View key={task.id} style={styles.taskRow}>
                  <View style={[styles.taskIcon, { backgroundColor: task.color }]}>
                    <Icon color="#ffffff" size={18} strokeWidth={2} />
                  </View>
                  <View style={styles.taskCopy}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskDescription}>{task.description}</Text>
                  </View>
                  <View style={styles.rewardRow}>
                    <Text style={styles.rewardText}>{task.reward}</Text>
                    <Image
                      source={require("../../assets/cute-assets/coin.png")}
                      resizeMode="contain"
                      accessibilityLabel="Coin"
                      style={styles.rewardCoin}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="See all coin transactions"
              onPress={() => router.push("/coin-history")}
            >
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <View style={styles.listCard}>
            <View style={styles.taskRow}>
              <View style={[styles.taskIcon, { backgroundColor: "#4caf50" }]}>
                <CheckIcon color="#ffffff" size={18} strokeWidth={2} />
              </View>
              <View style={styles.taskCopy}>
                <Text style={styles.taskTitle}>Quiz Completed</Text>
                <Text style={styles.taskDescription}>Traffic Signs Quiz</Text>
              </View>
              <Text style={styles.rewardText}>+10</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: "#43a94f",
    borderRadius: 18,
    flexDirection: "row",
    minHeight: 160,
    overflow: "hidden",
    padding: 18,
  },
  balanceCoin: {
    height: 34,
    width: 34,
  },
  balanceCopy: {
    flex: 1,
    gap: 7,
    zIndex: 1,
  },
  balanceImage: {
    bottom: -8,
    height: 156,
    position: "absolute",
    right: -8,
    width: 174,
  },
  balanceLabel: {
    color: "#eaffea",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 17,
  },
  balanceRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  balanceUnit: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  balanceValue: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 48,
  },
  buyButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    flexDirection: "row",
    gap: 4,
    height: 34,
    justifyContent: "center",
    marginTop: 5,
    paddingHorizontal: 14,
  },
  buyButtonText: {
    color: "#2f973b",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
  },
  cardText: {
    color: "#5d6875",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 16,
  },
  cardTitle: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 12,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  iconButtonSpacer: {
    height: 38,
    width: 38,
  },
  infoCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  infoCopy: {
    flex: 1,
    gap: 4,
  },
  infoImage: {
    height: 58,
    width: 58,
  },
  listCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  rewardCoin: {
    height: 16,
    width: 16,
  },
  rewardRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  rewardText: {
    color: "#2f973b",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
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
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#172230",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  seeAll: {
    color: "#2f973b",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  taskCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  taskDescription: {
    color: "#6d7782",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 14,
  },
  taskIcon: {
    alignItems: "center",
    borderRadius: 10,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  taskRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minHeight: 62,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  taskTitle: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
