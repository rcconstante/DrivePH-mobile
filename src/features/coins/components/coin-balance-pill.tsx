import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { PlusIcon } from "@/components/ui/icons";
import { useCoins } from "@/features/coins/coin-store";

export function CoinBalancePill() {
  const router = useRouter();
  const { balance } = useCoins();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${balance} coins`}
      onPress={() => router.push("/coins")}
      style={({ pressed }) => [styles.pill, pressed ? styles.pressed : null]}
    >
      <Image
        source={require("../../../assets/cute-assets/coin.png")}
        resizeMode="contain"
        accessibilityLabel="Coin"
        style={styles.coin}
      />
      <Text style={styles.balance}>{balance}</Text>
      <View style={styles.plusCircle}>
        <PlusIcon color="#ffffff" size={14} strokeWidth={2.4} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  balance: {
    color: "#061b49",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  coin: {
    height: 20,
    width: 20,
  },
  pill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 4px 10px rgba(23, 34, 48, 0.06)",
    flexDirection: "row",
    gap: 5,
    height: 34,
    paddingLeft: 7,
    paddingRight: 7,
  },
  plusCircle: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 9,
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  pressed: {
    opacity: 0.86,
  },
});
