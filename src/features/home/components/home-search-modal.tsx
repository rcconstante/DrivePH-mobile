import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { SearchIcon } from "@/components/ui/icons";
import type { ExploreCard } from "@/features/home/data";

type HomeSearchModalProps = {
  onChangeQuery: (query: string) => void;
  onClose: () => void;
  onSelectResult: (card: ExploreCard) => void;
  query: string;
  results: ExploreCard[];
  visible: boolean;
};

export function HomeSearchModal({
  onChangeQuery,
  onClose,
  onSelectResult,
  query,
  results,
  visible,
}: HomeSearchModalProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchField}>
            <SearchIcon color="#9aa8ba" size={18} strokeWidth={1.8} />
            <TextInput
              accessibilityLabel="Search topics, signs, tips"
              autoFocus
              onChangeText={onChangeQuery}
              placeholder="Search topics, signs, tips..."
              placeholderTextColor="#9aa8ba"
              style={styles.input}
              value={query}
            />
          </View>

          <View style={styles.resultList}>
            {results.length > 0 ? (
              results.map((card) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={card.title}
                  key={card.id}
                  onPress={() => onSelectResult(card)}
                  style={({ pressed }) => [styles.resultRow, pressed ? styles.pressed : null]}
                >
                  <Image
                    source={card.image}
                    resizeMode="contain"
                    accessibilityLabel={card.imageLabel}
                    style={styles.resultImage}
                  />
                  <Text style={styles.resultTitle}>{card.title}</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.emptyText}>No topics found yet.</Text>
            )}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close search"
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(6, 27, 73, 0.34)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fbfcf8",
    borderRadius: 24,
    gap: 14,
    padding: 18,
    width: "100%",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  emptyText: {
    color: "#6d7782",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 18,
    paddingVertical: 12,
    textAlign: "center",
  },
  input: {
    color: "#061b49",
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    height: 46,
    letterSpacing: 0,
    lineHeight: 18,
    padding: 0,
  },
  pressed: {
    opacity: 0.86,
  },
  resultImage: {
    height: 42,
    width: 48,
  },
  resultList: {
    gap: 8,
  },
  resultRow: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 62,
    paddingHorizontal: 12,
  },
  resultTitle: {
    color: "#061b49",
    flex: 1,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 18,
  },
  searchField: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    height: 48,
    paddingHorizontal: 14,
  },
  title: {
    color: "#061b49",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 25,
  },
});
