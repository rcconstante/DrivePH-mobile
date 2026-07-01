import { useRouter, type Href } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/ui/icons";
import { CoinBalancePill } from "@/features/coins/components/coin-balance-pill";

type FloatingDetailHeaderProps = {
  fallbackHref?: Href;
  rightAccessory?: ReactNode;
  showCoins?: boolean;
};

export function FloatingDetailHeader({
  fallbackHref = "/",
  rightAccessory,
  showCoins = true,
}: FloatingDetailHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        {
          paddingTop: Math.max(insets.top, 18),
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={handleBack}
        style={({ pressed }) => [styles.iconButton, pressed ? styles.pressed : null]}
      >
        <ArrowLeftIcon color="#061b49" size={20} strokeWidth={2.2} />
      </Pressable>
      <View style={styles.rightGroup}>
        {rightAccessory}
        {showCoins ? <CoinBalancePill /> : <View style={styles.spacer} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 14,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.08)",
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  pressed: {
    opacity: 0.86,
  },
  spacer: {
    height: 42,
    width: 42,
  },
  rightGroup: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  wrap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 18,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 20,
  },
});
