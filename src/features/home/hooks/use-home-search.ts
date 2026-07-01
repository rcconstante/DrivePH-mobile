import { useMemo, useState } from "react";

import { exploreCards } from "@/features/home/data";

export function useHomeSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length === 0) {
      return exploreCards;
    }

    return exploreCards.filter((card) =>
      `${card.title} ${card.imageLabel}`.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return {
    query,
    results,
    setQuery,
  };
}
