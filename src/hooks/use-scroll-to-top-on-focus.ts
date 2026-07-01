import { useFocusEffect } from "expo-router";
import { useCallback, type RefObject } from "react";
import type { ScrollView } from "react-native";

export function useScrollToTopOnFocus(scrollRef: RefObject<ScrollView | null>) {
  useFocusEffect(
    useCallback(() => {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ animated: false, y: 0 });
      });
    }, [scrollRef]),
  );
}
