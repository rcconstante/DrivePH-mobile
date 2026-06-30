import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

type BrandLogoProps = {
  align?: "left" | "center";
  size?: "compact" | "large";
  subtitle?: "guide" | "tagline" | "none";
  style?: StyleProp<ViewStyle>;
};

export function BrandLogo({
  align = "left",
  size = "compact",
  style,
}: BrandLogoProps) {
  const isLarge = size === "large";

  return (
    <View style={[styles.container, align === "center" ? styles.centered : null, style]}>
      <Image
        source={require("../../assets/images/header-logo.png")}
        resizeMode="contain"
        accessibilityLabel="RiderPH, Your Road. Your Responsibility."
        style={isLarge ? styles.logoLarge : styles.logoCompact}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
  container: {
    alignItems: "flex-start",
  },
  logoCompact: {
    height: 40,
    width: 172,
  },
  logoLarge: {
    height: 64,
    width: 276,
  },
});
