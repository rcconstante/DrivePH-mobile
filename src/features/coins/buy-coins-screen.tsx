import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon, CheckIcon } from "@/components/ui/icons";
import { useCoins } from "@/features/coins/coin-store";
import { coinPackages, type CoinPackage } from "@/features/coins/data";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

export function BuyCoinsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const { purchasePackage } = useCoins();
  const [pendingPackage, setPendingPackage] = useState<CoinPackage | null>(null);
  const [completedPackage, setCompletedPackage] = useState<CoinPackage | null>(null);
  useScrollToTopOnFocus(scrollRef);

  const confirmPurchase = () => {
    if (pendingPackage == null) {
      return;
    }

    const packageId = pendingPackage.id;
    setPendingPackage(null);
    const completedPurchase = purchasePackage(packageId);

    if (completedPurchase != null) {
      setCompletedPackage(completedPurchase);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        testID="buy-coins-screen"
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
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.iconButton}>
            <ArrowLeftIcon color="#172230" size={20} strokeWidth={2} />
          </Pressable>
          <Text style={styles.screenTitle}>Buy Coins</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View coin history"
            onPress={() => router.push("/coin-history")}
            style={({ pressed }) => [styles.historyButton, pressed ? styles.cardPressed : null]}
          >
            <Text style={styles.historyButtonText}>History</Text>
          </Pressable>
        </View>

        <View style={styles.unlockCard}>
          <View style={styles.unlockCopy}>
            <Text style={styles.unlockTitle}>Coins unlock more learning & rewards!</Text>
            <Text style={styles.unlockText}>Use coins for premium lessons, quizzes, and bonus rewards.</Text>
          </View>
          <Image
            source={require("../../assets/cute-assets/coins.png")}
            resizeMode="contain"
            accessibilityLabel="Coins"
            style={styles.unlockImage}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Coin Packages</Text>
        </View>

        <View style={styles.packageGrid}>
          {coinPackages.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}, ${item.price}`}
              onPress={() => setPendingPackage(item)}
              style={({ pressed }) => [
                styles.packageCard,
                item.id === "500" ? styles.packageCardFeatured : null,
                pressed ? styles.cardPressed : null,
              ]}
            >
              {item.badge != null ? (
                <View style={[styles.badge, item.id === "500" ? styles.badgeGreen : styles.badgeGold]}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              ) : null}
              <Image source={item.image} resizeMode="contain" accessibilityLabel={item.title} style={styles.packageImage} />
              <Text style={styles.packageTitle}>{item.title}</Text>
              <Text style={styles.packageSubtitle}>{item.subtitle}</Text>
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text accessibilityLabel="Best value" style={styles.kingEmoji}>👑</Text>
          <Text style={styles.sectionTitle}>Best Value - Go Unlimited!</Text>
        </View>

        <View style={styles.membershipCard}>
          <Image
            source={require("../../assets/cute-assets/plan.png")}
            resizeMode="contain"
            accessibilityLabel="Premium membership plan"
            style={styles.planImage}
          />
          <View style={styles.planCopy}>
            <Text style={styles.planEyebrow}>Unlimited Access</Text>
            <Text style={styles.planTitle}>Premium Membership</Text>
            {["Unlock all lessons & materials", "Unlimited quizzes & practice tests", "Earn 2x more coins"].map((benefit) => (
              <View key={benefit} style={styles.benefitRow}>
                <CheckIcon color="#4caf50" size={13} strokeWidth={2.3} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
          <View style={styles.planAction}>
            <View style={styles.planPriceRow}>
              <Text style={styles.planPrice}>P199.00</Text>
              <Text style={styles.planPeriod}> / month</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Subscribe now" style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe Now</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.securePayment}>
          <View style={styles.secureIcon}>
            <CheckIcon color="#ffffff" size={13} strokeWidth={2.5} />
          </View>
          <Text style={styles.secureText}>Secure payment</Text>
        </View>
      </ScrollView>

      <PurchaseModal
        mode="confirm"
        onClose={() => setPendingPackage(null)}
        onConfirm={confirmPurchase}
        packageItem={pendingPackage}
        visible={pendingPackage != null}
      />

      <PurchaseModal
        mode="success"
        onClose={() => setCompletedPackage(null)}
        packageItem={completedPackage}
        visible={completedPackage != null}
      />
    </View>
  );
}

function PurchaseModal({
  mode,
  onClose,
  onConfirm,
  packageItem,
  visible,
}: {
  mode: "confirm" | "success";
  onClose: () => void;
  onConfirm?: () => void;
  packageItem: CoinPackage | null;
  visible: boolean;
}) {
  if (packageItem == null) {
    return null;
  }

  const success = mode === "success";

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.purchaseModal}>
          <View style={[styles.modalIcon, success ? styles.modalIconSuccess : null]}>
            {success ? (
              <CheckIcon color="#ffffff" size={22} strokeWidth={2.4} />
            ) : (
              <Image
                source={packageItem.image}
                resizeMode="contain"
                accessibilityLabel={packageItem.title}
                style={styles.modalCoinImage}
              />
            )}
          </View>
          <Text style={styles.modalTitle}>
            {success ? "Purchase Successful" : "Confirm Purchase"}
          </Text>
          <Text style={styles.modalText}>
            {success
              ? `${packageItem.title} was added to your balance.`
              : `Buy ${packageItem.title} for ${packageItem.price}? This demo purchase will complete immediately.`}
          </Text>
          <View style={styles.modalActions}>
            {success ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close purchase confirmation"
                onPress={onClose}
                style={({ pressed }) => [styles.modalPrimaryButton, pressed ? styles.cardPressed : null]}
              >
                <Text style={styles.modalPrimaryText}>Done</Text>
              </Pressable>
            ) : (
              <>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Cancel purchase"
                  onPress={onClose}
                  style={({ pressed }) => [styles.modalSecondaryButton, pressed ? styles.cardPressed : null]}
                >
                  <Text style={styles.modalSecondaryText}>Cancel</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Confirm purchase"
                  onPress={onConfirm}
                  style={({ pressed }) => [styles.modalPrimaryButton, pressed ? styles.cardPressed : null]}
                >
                  <Text style={styles.modalPrimaryText}>Confirm</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    borderRadius: 999,
    minHeight: 20,
    justifyContent: "center",
    paddingHorizontal: 8,
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 2,
  },
  badgeGold: {
    backgroundColor: "#ffcc35",
  },
  badgeGreen: {
    backgroundColor: "#4caf50",
    left: 10,
    right: 10,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 10,
    textTransform: "uppercase",
  },
  benefitRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  benefitText: {
    color: "#5d6875",
    flex: 1,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 14,
  },
  cardPressed: {
    opacity: 0.86,
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 12,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  historyButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  historyButtonText: {
    color: "#2f973b",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  kingEmoji: {
    fontSize: 16,
    lineHeight: 20,
  },
  membershipCard: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderColor: "#bce9c3",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 12,
  },
  packageCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0 4px 12px rgba(23, 34, 48, 0.06)",
    flexBasis: "30.8%",
    flexGrow: 1,
    gap: 5,
    minHeight: 150,
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 10,
    position: "relative",
  },
  packageCardFeatured: {
    backgroundColor: "#f7fff5",
    borderColor: "#4caf50",
  },
  packageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  packageImage: {
    alignSelf: "center",
    height: 50,
    width: 68,
  },
  packageSubtitle: {
    color: "#5d6875",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 12,
    textAlign: "center",
  },
  packageTitle: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: "center",
  },
  planAction: {
    alignItems: "flex-end",
    gap: 3,
    minWidth: 96,
  },
  planCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  planEyebrow: {
    alignSelf: "flex-start",
    backgroundColor: "#dff7e3",
    borderRadius: 999,
    color: "#2f973b",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    textTransform: "uppercase",
  },
  planImage: {
    height: 70,
    width: 66,
  },
  planPeriod: {
    color: "#5d6875",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  planPrice: {
    color: "#2f973b",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  planPriceRow: {
    alignItems: "baseline",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  planTitle: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  pricePill: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 10,
    height: 34,
    justifyContent: "center",
    marginTop: 5,
    width: "100%",
  },
  priceText: {
    color: "#2f973b",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  screenTitle: {
    color: "#172230",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  sectionTitle: {
    color: "#172230",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  subscribeButton: {
    alignItems: "center",
    backgroundColor: "#4caf50",
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    minWidth: 104,
    paddingHorizontal: 12,
  },
  subscribeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 13,
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  modalCoinImage: {
    height: 54,
    width: 74,
  },
  modalIcon: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 22,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  modalIconSuccess: {
    backgroundColor: "#4caf50",
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(6, 27, 73, 0.38)",
    flex: 1,
    justifyContent: "center",
    padding: 22,
  },
  modalPrimaryButton: {
    alignItems: "center",
    backgroundColor: "#4caf50",
    borderRadius: 999,
    flex: 1,
    height: 42,
    justifyContent: "center",
  },
  modalPrimaryText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  modalSecondaryButton: {
    alignItems: "center",
    backgroundColor: "#eef3f8",
    borderRadius: 999,
    flex: 1,
    height: 42,
    justifyContent: "center",
  },
  modalSecondaryText: {
    color: "#5d6875",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  modalText: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: "center",
  },
  modalTitle: {
    color: "#172230",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  purchaseModal: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    gap: 12,
    padding: 18,
    width: "100%",
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secureIcon: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 9,
    height: 18,
    justifyContent: "center",
    width: 18,
  },
  securePayment: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
    paddingBottom: 2,
    paddingTop: 4,
  },
  secureText: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  unlockCard: {
    alignItems: "center",
    backgroundColor: "#eaf4ff",
    borderColor: "#cfe6ff",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    overflow: "hidden",
    padding: 14,
  },
  unlockCopy: {
    flex: 1,
    gap: 5,
    minWidth: 0,
  },
  unlockImage: {
    height: 72,
    width: 86,
  },
  unlockText: {
    color: "#5d6875",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
  },
  unlockTitle: {
    color: "#2f973b",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
  },
});
