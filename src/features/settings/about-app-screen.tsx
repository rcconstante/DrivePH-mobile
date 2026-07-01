import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon, CheckIcon, InfoIcon } from "@/components/ui/icons";

const appDetails = [
  {
    id: "version",
    label: "Version",
    value: "1.0.0",
  },
  {
    id: "content",
    label: "Content",
    value: "Driving lessons, quizzes, and road scenarios",
  },
  {
    id: "region",
    label: "Region",
    value: "Philippines",
  },
];

export function AboutAppScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="about-app-screen"
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
          <Text style={styles.screenTitle}>About App</Text>
          <View style={styles.iconButtonSpacer} />
        </View>

        <View style={styles.heroCard}>
          <Image
            source={require("../../assets/images/header-logo.png")}
            resizeMode="contain"
            accessibilityLabel="DrivePH Guide logo"
            style={styles.logo}
          />
          <Text style={styles.heroTitle}>DrivePH Guide</Text>
          <Text style={styles.heroText}>
            Learn, practice, and build safer driving habits with focused lessons and scenario-based guidance.
          </Text>
        </View>

        <View style={styles.card}>
          {appDetails.map((item) => (
            <View key={item.id} style={styles.detailRow}>
              <View style={styles.detailIcon}>
                {item.id === "version" ? (
                  <InfoIcon color="#ffffff" size={17} strokeWidth={2} />
                ) : (
                  <CheckIcon color="#ffffff" size={17} strokeWidth={2.2} />
                )}
              </View>
              <View style={styles.detailCopy}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  detailCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  detailIcon: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 11,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  detailLabel: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 11,
    minHeight: 64,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  detailValue: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  heroCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
    padding: 18,
  },
  heroText: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: "center",
  },
  heroTitle: {
    color: "#172230",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 23,
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
  logo: {
    height: 48,
    width: 200,
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
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
