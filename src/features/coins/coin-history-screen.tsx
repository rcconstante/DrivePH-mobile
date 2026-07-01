import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon, CheckIcon, ClipboardCheckIcon } from "@/components/ui/icons";

const transactions = [
  {
    id: "quiz-completed",
    title: "Quiz Completed",
    description: "Traffic Signs Quiz",
    amount: "+10",
    icon: CheckIcon,
    color: "#4caf50",
  },
  {
    id: "daily-check-in",
    title: "Daily Check-in",
    description: "Daily reward claimed",
    amount: "+5",
    icon: ClipboardCheckIcon,
    color: "#7c5cff",
  },
  {
    id: "lesson-completed",
    title: "Lesson Completed",
    description: "Road Signs Guide",
    amount: "+15",
    icon: CheckIcon,
    color: "#4b8df7",
  },
];

export function CoinHistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="coin-history-screen"
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <ArrowLeftIcon color="#172230" size={20} strokeWidth={2} />
          </Pressable>
          <Text style={styles.screenTitle}>Coin History</Text>
          <View style={styles.iconButtonSpacer} />
        </View>

        <View style={styles.summaryCard}>
          <Image
            source={require("../../assets/cute-assets/coin.png")}
            resizeMode="contain"
            accessibilityLabel="Coin"
            style={styles.summaryCoin}
          />
          <View style={styles.summaryCopy}>
            <Text style={styles.summaryTitle}>250 Coins</Text>
            <Text style={styles.summaryText}>Recent rewards and coin activity.</Text>
          </View>
        </View>

        <View style={styles.listCard}>
          {transactions.map((transaction) => {
            const Icon = transaction.icon;

            return (
              <View key={transaction.id} style={styles.transactionRow}>
                <View style={[styles.transactionIcon, { backgroundColor: transaction.color }]}>
                  <Icon color="#ffffff" size={17} strokeWidth={2.2} />
                </View>
                <View style={styles.transactionCopy}>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                </View>
                <View style={styles.amountRow}>
                  <Text style={styles.amountText}>{transaction.amount}</Text>
                  <Image
                    source={require("../../assets/cute-assets/coin.png")}
                    resizeMode="contain"
                    accessibilityLabel="Coin"
                    style={styles.amountCoin}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  amountCoin: {
    height: 16,
    width: 16,
  },
  amountRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  amountText: {
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
  listCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
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
  summaryCard: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderColor: "#bce9c3",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  summaryCoin: {
    height: 46,
    width: 46,
  },
  summaryCopy: {
    flex: 1,
    gap: 4,
  },
  summaryText: {
    color: "#5d6875",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  summaryTitle: {
    color: "#172230",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 20,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  transactionDescription: {
    color: "#6d7782",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 14,
  },
  transactionIcon: {
    alignItems: "center",
    borderRadius: 10,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  transactionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    minHeight: 62,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  transactionTitle: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
});
