import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";

import { colors, spacing } from "@/theme";

type ScreenShellProps = PropsWithChildren<{
  testID?: string;
}>;

export function ScreenShell({ children, testID }: ScreenShellProps) {
  useColorScheme();

  return (
    <ScrollView
      testID={testID}
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
});
