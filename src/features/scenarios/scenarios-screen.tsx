import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryFilter } from "@/components/common/category-filter";
import {
  BookmarkIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { CoinBalancePill } from "@/features/coins/components/coin-balance-pill";
import {
  difficultyTheme,
  scenarioCategories,
  scenarios,
  type Scenario,
  type ScenarioCategoryId,
} from "@/features/scenarios/data";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

export function ScenariosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ScenarioCategoryId>("all");
  useScrollToTopOnFocus(scrollRef);

  const visibleScenarios = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return scenarios.filter((scenario) => {
      const matchesCategory =
        selectedCategory === "all" || scenario.categoryId === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${scenario.title} ${scenario.description}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <View style={styles.screen}>
      <View style={[styles.fixedHeader, { paddingTop: Math.max(insets.top, 18) }]}>
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>Scenarios</Text>
          <CoinBalancePill />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>
              Practice.{"\n"}
              Decide.{"\n"}
              Drive Safely.
            </Text>
            <Text style={styles.heroText}>Learn by real-life situations and make better decisions.</Text>
          </View>
          <Image
            source={require("../../assets/scenarios-assets/header.png")}
            resizeMode="contain"
            accessibilityLabel="Car driving through a city road scenario"
            style={styles.heroImage}
          />
        </View>

        <View style={styles.searchBox}>
          <SearchIcon color="#8a97ad" size={18} strokeWidth={1.9} />
          <TextInput
            accessibilityLabel="Search scenarios"
            onChangeText={setQuery}
            placeholder="Search scenarios..."
            placeholderTextColor="#8a97ad"
            style={styles.searchInput}
            value={query}
          />
        </View>

        <CategoryFilter
          items={scenarioCategories}
          onSelect={setSelectedCategory}
          selectedId={selectedCategory}
        />
      </View>

      <ScrollView
        ref={scrollRef}
        testID="scenarios-screen"
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 152,
            paddingTop: 12,
          },
        ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Scenarios</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        <View style={styles.scenarioList}>
          {visibleScenarios.length > 0 ? (
            visibleScenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                onPress={() =>
                  router.push({
                    pathname: "/scenarios/[scenarioId]",
                    params: { scenarioId: scenario.id },
                  })
                }
              />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No scenarios found</Text>
              <Text style={styles.emptyText}>Try another category or search term.</Text>
            </View>
          )}
        </View>

        <View style={styles.challengeCard}>
          <View style={styles.challengeTopRow}>
            <Image
              source={require("../../assets/scenarios-assets/trophy.png")}
              resizeMode="contain"
              accessibilityLabel="Trophy reward"
              style={styles.challengeImage}
            />
            <View style={styles.challengeCopy}>
              <Text style={styles.challengeTitle}>Test Your Skills</Text>
              <Text style={styles.challengeText}>Complete scenarios and earn coins and badges.</Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Start challenge"
            onPress={() =>
              router.push({
                pathname: "/scenarios/[scenarioId]",
                params: { scenarioId: scenarios[0]?.id ?? "right-of-way-uncontrolled-intersection" },
              })
            }
            style={({ pressed }) => [styles.challengeButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.challengeButtonText}>Start</Text>
            <ChevronRightIcon color="#ffffff" size={16} strokeWidth={2.2} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function ScenarioCard({ onPress, scenario }: { onPress: () => void; scenario: Scenario }) {
  const theme = difficultyTheme[scenario.difficulty];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={scenario.title}
      onPress={onPress}
      style={({ pressed }) => [styles.scenarioCard, pressed ? styles.pressed : null]}
    >
      <Image
        source={scenario.image}
        resizeMode="cover"
        accessibilityLabel={scenario.imageLabel}
        style={styles.scenarioImage}
      />
      <View style={styles.scenarioCopy}>
        <View style={styles.cardTopRow}>
          <Text numberOfLines={2} style={styles.scenarioTitle}>{scenario.title}</Text>
          <BookmarkIcon color="#a4afc1" size={19} strokeWidth={1.9} />
        </View>
        <Text numberOfLines={2} style={styles.scenarioDescription}>{scenario.description}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.difficultyPill, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.difficultyText, { color: theme.color }]}>{scenario.difficulty}</Text>
          </View>
          <Text style={styles.metaDivider}>|</Text>
          <Text style={styles.stepsText}>{scenario.steps} Steps</Text>
          <View style={styles.chevronCircle}>
            <ChevronRightIcon color="#2f973b" size={18} strokeWidth={2.4} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  challengeButton: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 14,
    flexDirection: "row",
    gap: 5,
    height: 42,
    justifyContent: "center",
    width: "100%",
  },
  challengeButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  challengeCard: {
    alignItems: "stretch",
    backgroundColor: "#effbf2",
    borderColor: "#bce9c3",
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 12,
  },
  challengeCopy: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  challengeImage: {
    height: 46,
    width: 58,
  },
  challengeTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  challengeText: {
    color: "#5d6875",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 14,
  },
  challengeTitle: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  chevronCircle: {
    alignItems: "center",
    backgroundColor: "#effbf2",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    marginLeft: "auto",
    width: 30,
  },
  fixedHeader: {
    backgroundColor: "#fbfcf8",
    gap: 12,
    paddingHorizontal: 18,
    paddingBottom: 10,
    zIndex: 2,
  },
  difficultyPill: {
    alignItems: "center",
    borderRadius: 999,
    height: 22,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 14,
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
    padding: 16,
  },
  emptyText: {
    color: "#6d7782",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  emptyTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  heroCard: {
    backgroundColor: "#e8f7df",
    borderColor: "#cfeecf",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 116,
    overflow: "hidden",
    padding: 14,
  },
  heroCopy: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
    zIndex: 1,
  },
  heroImage: {
    bottom: -8,
    height: 124,
    position: "absolute",
    right: -8,
    width: 166,
  },
  heroText: {
    color: "#52627e",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 15,
    maxWidth: 158,
  },
  heroTitle: {
    color: "#061b49",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
  },
  metaDivider: {
    color: "#a0aabe",
    fontSize: 10,
    fontWeight: "900",
    lineHeight: 14,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
  pressed: {
    opacity: 0.86,
  },
  scenarioCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0 5px 14px rgba(23, 34, 48, 0.06)",
    flexDirection: "row",
    minHeight: 112,
    overflow: "hidden",
  },
  scenarioCopy: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
    minWidth: 0,
    padding: 10,
  },
  scenarioDescription: {
    color: "#5d6875",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 14,
  },
  scenarioImage: {
    height: "100%",
    width: 112,
  },
  scenarioList: {
    gap: 10,
  },
  listContent: {
    gap: 12,
    paddingHorizontal: 18,
  },
  scenarioTitle: {
    color: "#061b49",
    flex: 1,
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
    color: "#061b49",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
  },
  scroll: {
    flex: 1,
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    height: 46,
    paddingHorizontal: 14,
    width: "100%",
  },
  searchInput: {
    color: "#061b49",
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    height: 44,
    letterSpacing: 0,
    lineHeight: 18,
    padding: 0,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#061b49",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  seeAll: {
    color: "#2f973b",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  stepsText: {
    color: "#5d6875",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
