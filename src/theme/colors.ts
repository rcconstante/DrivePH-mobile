import { Color } from "expo-router";
import type { ColorValue } from "react-native";
import { Platform } from "react-native";

export const colors = {
  borderSoft: "#e6ece8",
  background: Platform.select({
    ios: Color.ios.systemBackground,
    android: Color.android.dynamic.surface,
    default: "#ffffff",
  })!,
  card: "#ffffff",
  danger: "#ef4444",
  foreground: Platform.select({
    ios: Color.ios.label,
    android: Color.android.dynamic.onSurface,
    default: "#111827",
  })!,
  ink: "#061b49",
  mutedForeground: Platform.select({
    ios: Color.ios.secondaryLabel,
    android: Color.android.dynamic.onSurfaceVariant,
    default: "#4b5563",
  })!,
  primaryBorder: "#cfeecf",
  primarySoft: "#effbf2",
  screen: "#fbfcf8",
  text: "#172230",
  textMuted: "#4d5f78",
  textSubtle: "#6d7782",
  border: Platform.select({
    ios: Color.ios.separator,
    android: Color.android.dynamic.outlineVariant,
    default: "#d1d5db",
  })!,
  primary: Platform.select({
    ios: Color.ios.systemGreen,
    android: "#2f973b",
    default: "#2f973b",
  })!,
} satisfies Record<string, ColorValue>;
