import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/layout/app-header";
import { SearchIcon } from "@/components/ui/icons";
import { exploreCards } from "@/features/home/data";

export function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <AppHeader />
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

        <View style={styles.searchBar} accessibilityRole="search">
          <SearchIcon color="#9aa8ba" size={18} strokeWidth={1.8} />
          <Text style={styles.searchText}>Search topics, signs, tips...</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Explore</Text>
        </View>

        <View style={styles.exploreGrid}>
          {exploreCards.map((card) => (
            <ExploreCardItem
              key={card.id}
              accentColor={card.accentColor}
              icon={card.icon}
              title={card.title}
            />
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
    </View>
  );
}

type ExploreCardItemProps = {
  accentColor: string;
  icon: typeof exploreCards[number]["icon"];
  title: string;
};

function ExploreCardItem({ accentColor, icon: Icon, title }: ExploreCardItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [styles.exploreCard, pressed ? styles.cardPressed : null]}
    >
      <View style={[styles.exploreIcon, { backgroundColor: accentColor }]}>
        <Icon color="#ffffff" size={22} strokeWidth={1.9} />
      </View>
      <Text numberOfLines={2} style={styles.exploreTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: 12,
    paddingHorizontal: 18,
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
  exploreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  exploreCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: "31.3%",
    flexGrow: 1,
    gap: 9,
    minHeight: 104,
    paddingHorizontal: 7,
    paddingVertical: 12,
  },
  cardPressed: {
    opacity: 0.86,
  },
  exploreIcon: {
    alignItems: "center",
    borderRadius: 15,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  exploreTitle: {
    color: "#061b49",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: "center",
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
  driverTitle: {
    color: "#061b49",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
  },
  driverDescription: {
    color: "#63718b",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  smallButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#0757ff",
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
  driverImage: {
    height: 134,
    width: 150,
  },
});
