import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  BellIcon,
  BookOpenIcon,
  ChevronRightIcon,
  FileTextIcon,
  InfoIcon,
  LifeBuoyIcon,
  SettingsIcon,
  type IconComponent,
} from "@/components/ui/icons";

type SettingsIconRowItem = {
  color: string;
  description: string;
  icon: IconComponent;
  id: string;
  title: string;
};

const preferenceRows: SettingsIconRowItem[] = [
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage alerts and reminders",
    icon: BellIcon,
    color: "#4caf50",
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Light mode",
    icon: SettingsIcon,
    color: "#7c5cff",
  },
  {
    id: "language",
    title: "Language",
    description: "English",
    icon: BookOpenIcon,
    color: "#4b8df7",
  },
];

const supportRows: SettingsIconRowItem[] = [
  {
    id: "help",
    title: "Help & Support",
    description: "Get help and contact us",
    icon: LifeBuoyIcon,
    color: "#7c5cff",
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Read app terms and policies",
    icon: FileTextIcon,
    color: "#ef5b7a",
  },
];

const aboutRows: SettingsIconRowItem[] = [
  {
    id: "about",
    title: "About App",
    description: "DrivePH Guide v1.0.0",
    icon: InfoIcon,
    color: "#2f80ed",
  },
];

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

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Preferences</Text>
          <View style={styles.cardGroup}>
            {preferenceRows.map((item) => (
              <SettingsRow key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Coins & Rewards</Text>
          <View style={styles.cardGroup}>
            <AssetRow
              image={require("../../assets/cute-assets/coins.png")}
              imageLabel="Coins"
              title="Coins"
              description="View balance, earn coins, and history"
              onPress={() => router.push("/coins")}
            />
            <AssetRow
              image={require("../../assets/cute-assets/gift.png")}
              imageLabel="Gift"
              title="Rewards"
              description="Unlock premium content and bonuses"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Support</Text>
          <View style={styles.cardGroup}>
            {supportRows.map((item) => (
              <SettingsRow key={item.id} item={item} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About</Text>
          <View style={styles.cardGroup}>
            {aboutRows.map((item) => (
              <SettingsRow key={item.id} item={item} onPress={() => router.push("/about")} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SettingsRow({ item, onPress }: { item: SettingsIconRowItem; onPress?: () => void }) {
  const Icon = item.icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]}
    >
      <View style={[styles.rowIconBox, { backgroundColor: item.color }]}>
        <Icon color="#ffffff" size={20} strokeWidth={2} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowDescription}>{item.description}</Text>
      </View>
      <ChevronRightIcon color="#8f9aa6" size={18} strokeWidth={2} />
    </Pressable>
  );
}

type AssetRowProps = {
  description: string;
  image: number;
  imageLabel: string;
  onPress?: () => void;
  title: string;
};

function AssetRow({ description, image, imageLabel, onPress, title }: AssetRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]}
    >
      <Image source={image} resizeMode="contain" accessibilityLabel={imageLabel} style={styles.assetIcon} />
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <ChevronRightIcon color="#8f9aa6" size={18} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  assetIcon: {
    height: 40,
    width: 40,
  },
  cardGroup: {
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
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rowCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  rowDescription: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 15,
  },
  rowIconBox: {
    alignItems: "center",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  rowPressed: {
    opacity: 0.86,
  },
  rowTitle: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    color: "#7b8591",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 14,
    textTransform: "uppercase",
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
