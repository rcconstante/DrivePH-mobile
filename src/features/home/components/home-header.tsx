import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandLogo } from "@/components/ui/brand-logo";
import { BellIcon } from "@/components/ui/icons";

type HomeHeaderProps = {
  coinBalance: number;
  hasUnreadNotification?: boolean;
  onCoinPress: () => void;
  onNotificationPress: () => void;
};

export function HomeHeader({
  coinBalance,
  hasUnreadNotification = false,
  onCoinPress,
  onNotificationPress,
}: HomeHeaderProps) {
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${coinBalance} coins`}
          onPress={onCoinPress}
          style={({ pressed }) => [styles.coinPill, pressed ? styles.buttonPressed : null]}
        >
          <Image
            source={require("../../../assets/cute-assets/coin.png")}
            resizeMode="contain"
            accessibilityLabel="Coin"
            style={styles.coinIcon}
          />
          <Text style={styles.coinText}>{coinBalance}</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={onNotificationPress}
          style={({ pressed }) => [styles.iconButton, pressed ? styles.buttonPressed : null]}
        >
          <BellIcon color="#061b49" size={20} strokeWidth={1.8} />
          {hasUnreadNotification ? <View style={styles.notificationDot} /> : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  coinIcon: {
    height: 20,
    width: 20,
  },
  coinPill: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    height: 34,
    paddingLeft: 7,
    paddingRight: 10,
  },
  coinText: {
    color: "#172230",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#fbfcf8",
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
    borderColor: "#fbfcf8",
    borderRadius: 5,
    borderWidth: 1,
    height: 10,
    position: "absolute",
    right: 8,
    top: 8,
    width: 10,
  },
});
