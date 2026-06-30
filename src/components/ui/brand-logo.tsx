import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

type BrandLogoProps = {
  align?: "left" | "center";
  size?: "compact" | "large";
  subtitle?: "guide" | "tagline" | "none";
  style?: StyleProp<ViewStyle>;
};

export function BrandLogo({
  align = "left",
  size = "compact",
  subtitle = "guide",
  style,
}: BrandLogoProps) {
  const isLarge = size === "large";

  return (
    <View style={[styles.container, align === "center" ? styles.centered : null, style]}>
      <View style={[styles.lockup, align === "center" ? styles.lockupCentered : null]}>
        <Text style={[styles.wordmark, isLarge ? styles.wordmarkLarge : styles.wordmarkCompact]}>
          Drive
          <Text style={styles.wordmarkAccent}>PH</Text>
        </Text>
        {subtitle !== "none" ? (
          <Text
            style={[
              styles.subtitle,
              isLarge ? styles.subtitleLarge : styles.subtitleCompact,
              subtitle === "tagline" ? styles.tagline : null,
            ]}
          >
            {subtitle === "tagline" ? "LEARN. DRIVE. GO FAR." : "GUIDE"}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  centered: {
    alignItems: "center",
  },
  lockup: {
    alignItems: "flex-start",
  },
  lockupCentered: {
    alignItems: "center",
  },
  wordmark: {
    color: "#0757ff",
    fontWeight: "900",
    letterSpacing: 0,
  },
  wordmarkCompact: {
    fontSize: 24,
    lineHeight: 28,
  },
  wordmarkLarge: {
    fontSize: 40,
    lineHeight: 46,
  },
  wordmarkAccent: {
    color: "#ef3340",
  },
  subtitle: {
    color: "#061b49",
    fontWeight: "800",
    letterSpacing: 4,
    textAlign: "left",
  },
  subtitleCompact: {
    fontSize: 9,
    lineHeight: 11,
  },
  subtitleLarge: {
    fontSize: 13,
    lineHeight: 16,
  },
  tagline: {
    color: "#7b8aa4",
    letterSpacing: 1.4,
  },
});
