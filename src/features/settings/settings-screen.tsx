import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SettingsRow, SettingsSection } from "@/components/settings/settings-page";
import {
  BellIcon,
  BookOpenIcon,
  FileTextIcon,
  InfoIcon,
  LifeBuoyIcon,
  SettingsIcon,
} from "@/components/ui/icons";

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="settings-screen"
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
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your app preferences and rewards.</Text>
          </View>
          <Image
            source={require("../../assets/cute-assets/settings.png")}
            resizeMode="contain"
            accessibilityLabel="Settings gear"
            style={styles.heroImage}
          />
        </View>

        <SettingsSection title="Preferences">
          <SettingsRow
            color="#4caf50"
            description="Manage alerts and reminders"
            icon={BellIcon}
            onPress={() => router.push("/notifications")}
            rightLabel="On"
            title="Notifications"
          />
          <SettingsRow
            color="#7c5cff"
            description="Choose app display mode"
            icon={SettingsIcon}
            onPress={() => router.push("/appearance")}
            rightLabel="Light"
            title="Appearance"
          />
          <SettingsRow
            color="#4b8df7"
            description="Choose app language"
            icon={BookOpenIcon}
            onPress={() => router.push("/language")}
            rightLabel="English"
            title="Language"
          />
        </SettingsSection>

        <SettingsSection title="Coins & Rewards">
          <SettingsRow
            description="View balance, earn coins, and history"
            image={require("../../assets/cute-assets/coins.png")}
            imageLabel="Coins"
            onPress={() => router.push("/coins")}
            title="Coins"
          />
          <SettingsRow
            description="Unlock premium content and bonuses"
            image={require("../../assets/cute-assets/gift.png")}
            imageLabel="Gift"
            title="Rewards"
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsRow
            color="#7c5cff"
            description="Get help and contact us"
            icon={LifeBuoyIcon}
            onPress={() => router.push("/help-support")}
            title="Help & Support"
          />
          <SettingsRow
            color="#ef5b7a"
            description="Read app terms and policies"
            icon={FileTextIcon}
            onPress={() => router.push("/terms")}
            title="Terms & Conditions"
          />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingsRow
            color="#2f80ed"
            description="DrivePH Guide v1.0.0"
            icon={InfoIcon}
            onPress={() => router.push("/about")}
            title="About App"
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  hero: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 128,
  },
  heroCopy: {
    flex: 1,
    gap: 8,
  },
  heroImage: {
    height: 118,
    width: 142,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  subtitle: {
    color: "#5d6875",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 18,
    maxWidth: 190,
  },
  title: {
    color: "#172230",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 32,
  },
});
