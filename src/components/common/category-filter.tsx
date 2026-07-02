import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { colors } from "@/theme";

type CategoryFilterItem<TId extends string> = {
  id: TId;
  label: string;
};

type CategoryFilterProps<TId extends string> = {
  items: CategoryFilterItem<TId>[];
  onSelect: (id: TId) => void;
  selectedId: TId;
};

export function CategoryFilter<TId extends string>({
  items,
  onSelect,
  selectedId,
}: CategoryFilterProps<TId>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {items.map((item) => {
        const selected = selectedId === item.id;

        return (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected }}
            onPress={() => onSelect(item.id)}
            style={({ pressed }) => [
              styles.button,
              selected ? styles.buttonActive : null,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={[styles.label, selected ? styles.labelActive : null]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    height: 31,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textSubtle,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 14,
  },
  labelActive: {
    color: "#ffffff",
  },
  list: {
    gap: 8,
    paddingRight: 18,
  },
  pressed: {
    opacity: 0.86,
  },
});
