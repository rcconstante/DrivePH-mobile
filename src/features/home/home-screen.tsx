import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchIcon } from "@/components/ui/icons";
import { HomeHeader } from "@/features/home/components/home-header";
import { HomeNotificationsModal } from "@/features/home/components/home-notifications-modal";
import { HomeSearchModal } from "@/features/home/components/home-search-modal";
import { exploreCards, homeNotifications, type ExploreCard } from "@/features/home/data";
import { useHomeSearch } from "@/features/home/hooks/use-home-search";

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const homeSearch = useHomeSearch();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const handleExplorePress = (card: ExploreCard) => {
    setSearchOpen(false);
    router.push(card.route);
  };

  return (
    <View style={styles.screen}>
      <HomeHeader
        coinBalance={230}
        hasUnreadNotification
        onCoinPress={() => router.push("/coins")}
        onNotificationPress={() => setNotificationsOpen(true)}
        onSearchPress={() => setSearchOpen(true)}
      />

      <ScrollView
        testID="home-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 126,
          },
        ]}
      >
        <ImageBackground
          source={require("../../assets/images/home-car.png")}
          resizeMode="cover"
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>
            Your complete{"\n"}
            driving guide,{"\n"}
            from learning to{"\n"}
            real road.
          </Text>
        </ImageBackground>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search topics"
          onPress={() => setSearchOpen(true)}
          style={({ pressed }) => [styles.searchBar, pressed ? styles.cardPressed : null]}
        >
          <SearchIcon color="#9aa8ba" size={18} strokeWidth={1.8} />
          <Text numberOfLines={1} style={styles.searchText}>
            {homeSearch.query.trim().length > 0
              ? homeSearch.query
              : "Search topics, signs, tips..."}
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Explore</Text>

        <View style={styles.exploreGrid}>
          {exploreCards.map((card) => (
            <ExploreCardItem key={card.id} card={card} onPress={() => handleExplorePress(card)} />
          ))}
        </View>

        <View style={styles.driverCard}>
          <View style={styles.driverCopy}>
            <Text style={styles.driverTitle}>New Driver?</Text>
            <Text style={styles.driverDescription}>
              Start your journey with confidence. We've got you covered.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="View beginner tips"
              onPress={() => router.push("/learn")}
              style={styles.smallButton}
            >
              <Text style={styles.smallButtonText}>View Beginner Tips</Text>
            </Pressable>
          </View>
          <Image
            source={require("../../assets/images/home-driver.png")}
            resizeMode="cover"
            accessibilityLabel="Smiling driver holding a steering wheel"
            style={styles.driverImage}
          />
        </View>
      </ScrollView>

      <HomeSearchModal
        onChangeQuery={homeSearch.setQuery}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleExplorePress}
        query={homeSearch.query}
        results={homeSearch.results}
        visible={isSearchOpen}
      />

      <HomeNotificationsModal
        notifications={homeNotifications}
        onClose={() => setNotificationsOpen(false)}
        visible={isNotificationsOpen}
      />
    </View>
  );
}

type ExploreCardItemProps = {
  card: ExploreCard;
  onPress: () => void;
};

function ExploreCardItem({ card, onPress }: ExploreCardItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={card.title}
      onPress={onPress}
      style={({ pressed }) => [styles.exploreCard, pressed ? styles.cardPressed : null]}
    >
      <Image
        source={card.image}
        resizeMode="contain"
        accessibilityLabel={card.imageLabel}
        style={styles.exploreImage}
      />
      <Text numberOfLines={2} style={styles.exploreTitle}>{card.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardPressed: {
    opacity: 0.86,
  },
  content: {
    gap: 12,
    paddingHorizontal: 18,
  },
  driverCard: {
    alignItems: "center",
    backgroundColor: "#eaf5ff",
    borderRadius: 20,
    flexDirection: "row",
    minHeight: 134,
    overflow: "hidden",
    paddingLeft: 18,
  },
  driverCopy: {
    flex: 1,
    gap: 7,
    zIndex: 1,
  },
  driverDescription: {
    color: "#63718b",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  driverImage: {
    height: 134,
    width: 150,
  },
  driverTitle: {
    color: "#061b49",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
  },
  exploreCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: "31.3%",
    flexGrow: 1,
    gap: 6,
    minHeight: 104,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  exploreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  exploreImage: {
    height: 56,
    width: 68,
  },
  exploreTitle: {
    color: "#061b49",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: "center",
  },
  hero: {
    height: 128,
    justifyContent: "center",
    marginTop: -2,
    overflow: "visible",
    paddingLeft: 2,
  },
  heroTitle: {
    color: "#061b49",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 19,
    maxWidth: 158,
    textShadowColor: "rgba(255, 255, 255, 0.85)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  searchBar: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    height: 48,
    paddingHorizontal: 16,
  },
  searchText: {
    color: "#9aa8ba",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
  },
  sectionTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  smallButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#3da847",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  smallButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 14,
  },
});
