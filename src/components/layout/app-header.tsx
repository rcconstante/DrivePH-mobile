import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandLogo } from "@/components/ui/brand-logo";
import { BellIcon, SearchIcon } from "@/components/ui/icons";

type AppHeaderProps = {
  showNotificationDot?: boolean;
  showSearch?: boolean;
};

export function AppHeader({ showNotificationDot = false, showSearch = false }: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: Math.max(insets.top + 10, 22),
        },
      ]}
    >
      <BrandLogo size="compact" subtitle="guide" />
      <View style={styles.actions}>
        {showSearch ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Search" style={styles.iconButton}>
            <SearchIcon color="#061b49" size={21} strokeWidth={1.8} />
          </Pressable>
        ) : null}
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" style={styles.iconButton}>
          <BellIcon color="#061b49" size={20} strokeWidth={1.8} />
          {showNotificationDot ? <View style={styles.notificationDot} /> : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#f7fbff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 18,
  },
  iconButton: {
    alignItems: "center",
    height: 42,
    justifyContent: "center",
    position: "relative",
    width: 42,
  },
  notificationDot: {
    backgroundColor: "#ef3340",
    borderColor: "#f7fbff",
    borderRadius: 5,
    borderWidth: 1,
    height: 10,
    position: "absolute",
    right: 8,
    top: 8,
    width: 10,
  },
});
