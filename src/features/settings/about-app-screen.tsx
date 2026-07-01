import { Image, StyleSheet, Text, View } from "react-native";

import { SettingsPage, SettingsRow, SettingsSection } from "@/components/settings/settings-page";
import { CheckIcon, InfoIcon } from "@/components/ui/icons";

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
  return (
    <SettingsPage testID="about-app-screen" title="About App">
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

      <SettingsSection title="App Details">
        {appDetails.map((item) => (
          <SettingsRow
            color={item.id === "version" ? "#2f80ed" : "#3da847"}
            description={item.value}
            icon={item.id === "version" ? InfoIcon : CheckIcon}
            key={item.id}
            title={item.label}
          />
        ))}
      </SettingsSection>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
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
  logo: {
    height: 48,
    width: 200,
  },
});
