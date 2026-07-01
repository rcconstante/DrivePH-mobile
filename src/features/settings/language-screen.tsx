import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SettingsTopBar } from "@/components/settings/settings-page";
import { CheckIcon, EarthIcon } from "@/components/ui/icons";
import {
  languageOptions,
  type LanguageOption,
  type LanguageOptionId,
} from "@/features/settings/settings-options";

export function LanguageScreen() {
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOptionId>("english-ph");

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="language-screen"
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
        <SettingsTopBar title="" />

        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>Language</Text>
            <Text style={styles.subtitle}>
              Choose your preferred language for the best learning experience.
            </Text>
          </View>
          <Image
            source={require("../../assets/cute-assets/globe.png")}
            resizeMode="contain"
            accessibilityLabel="Globe with translation bubbles"
            style={styles.heroImage}
          />
        </View>

        <View style={styles.languageList}>
          {languageOptions.map((option) => (
            <LanguageOptionRow
              key={option.id}
              option={option}
              onPress={() => setSelectedLanguage(option.id)}
              selected={option.id === selectedLanguage}
            />
          ))}
        </View>

        <View style={styles.comingSoonCard}>
          <View style={styles.comingIcon}>
            <EarthIcon color="#ffffff" size={21} strokeWidth={2.1} />
          </View>
          <View style={styles.comingCopy}>
            <Text style={styles.comingTitle}>More languages coming soon!</Text>
            <Text style={styles.comingText}>
              We are preparing more translations for international drivers.
            </Text>
          </View>
          <Image
            source={require("../../assets/cute-assets/mic.png")}
            resizeMode="contain"
            accessibilityLabel="Announcement speaker"
            style={styles.comingMic}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function LanguageOptionRow({
  onPress,
  option,
  selected,
}: {
  onPress: () => void;
  option: LanguageOption;
  selected: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${option.label}, ${option.countryLabel}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.languageCard,
        selected ? styles.languageCardSelected : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.flagBox}>
        <Image
          source={option.flagImage}
          resizeMode="cover"
          accessibilityLabel={`${option.countryLabel} flag`}
          style={styles.flag}
        />
      </View>

      <View style={styles.languageCopy}>
        <View style={styles.languageTitleRow}>
          <Text style={styles.languageTitle}>{option.nativeLabel}</Text>
          {option.recommended ? (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.languageSubtitle}>{option.countryLabel}</Text>
      </View>

      <View style={[styles.selector, selected ? styles.selectorSelected : null]}>
        {selected ? <CheckIcon color="#ffffff" size={19} strokeWidth={2.4} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  comingCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  comingIcon: {
    alignItems: "center",
    backgroundColor: "#4caf50",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  comingMic: {
    bottom: -4,
    height: 62,
    position: "absolute",
    right: -2,
    width: 62,
  },
  comingSoonCard: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderColor: "#d3ebd7",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.05)",
    flexDirection: "row",
    gap: 12,
    minHeight: 78,
    overflow: "hidden",
    padding: 14,
    paddingRight: 74,
    position: "relative",
  },
  comingText: {
    color: "#5d6875",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  comingTitle: {
    color: "#1f7a2b",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  content: {
    gap: 12,
    paddingHorizontal: 18,
  },
  flag: {
    height: "100%",
    width: "100%",
  },
  flagBox: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 13,
    boxShadow: "0 4px 10px rgba(23, 34, 48, 0.08)",
    height: 48,
    justifyContent: "center",
    overflow: "hidden",
    width: 48,
  },
  hero: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 146,
  },
  heroCopy: {
    flex: 1,
    gap: 8,
    minWidth: 0,
  },
  heroImage: {
    height: 128,
    width: 136,
  },
  languageCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.05)",
    flexDirection: "row",
    gap: 12,
    minHeight: 72,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  languageCardSelected: {
    backgroundColor: "#f7fff7",
    borderColor: "#4caf50",
  },
  languageCopy: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  languageList: {
    gap: 8,
  },
  languageSubtitle: {
    color: "#60708a",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  languageTitle: {
    color: "#061b49",
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  languageTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pressed: {
    opacity: 0.86,
  },
  recommendedBadge: {
    backgroundColor: "#6fbe55",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  recommendedText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  selector: {
    alignItems: "center",
    borderColor: "#d9dee7",
    borderRadius: 14,
    borderWidth: 2,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  selectorSelected: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  subtitle: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
    maxWidth: 186,
  },
  title: {
    color: "#061b49",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 32,
  },
});
