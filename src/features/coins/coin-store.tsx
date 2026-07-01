import { createContext, use, useMemo, useState, type PropsWithChildren } from "react";

import {
  getCoinPackageById,
  type CoinPackage,
  type CoinPackageId,
} from "@/features/coins/data";

export type CoinTransactionType = "earn" | "purchase" | "spend";

export type CoinTransaction = {
  amount: number;
  createdAt: string;
  description: string;
  id: string;
  title: string;
  type: CoinTransactionType;
};

type EarnCoinsInput = {
  amount: number;
  description: string;
  sourceId: string;
  title: string;
};

type CoinStoreValue = {
  balance: number;
  earnCoins: (input: EarnCoinsInput) => boolean;
  purchasePackage: (packageId: CoinPackageId) => CoinPackage | null;
  transactions: CoinTransaction[];
};

const initialTransactions: CoinTransaction[] = [
  {
    id: "seed-welcome",
    title: "Welcome Bonus",
    description: "Starter coins for learning",
    amount: 320,
    createdAt: "Today",
    type: "earn",
  },
];

const CoinStoreContext = createContext<CoinStoreValue | null>(null);

export function CoinProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<CoinTransaction[]>(initialTransactions);

  const balance = useMemo(
    () => transactions.reduce((total, transaction) => total + transaction.amount, 0),
    [transactions],
  );

  const earnCoins = (input: EarnCoinsInput) => {
    const transactionId = `earn-${input.sourceId}`;

    if (transactions.some((transaction) => transaction.id === transactionId)) {
      return false;
    }

    setTransactions((currentTransactions) => [
      {
        id: transactionId,
        title: input.title,
        description: input.description,
        amount: input.amount,
        createdAt: "Today",
        type: "earn",
      },
      ...currentTransactions,
    ]);

    return true;
  };

  const purchasePackage = (packageId: CoinPackageId) => {
    const coinPackage = getCoinPackageById(packageId);

    if (coinPackage == null) {
      return null;
    }

    setTransactions((currentTransactions) => [
      {
        id: `purchase-${coinPackage.id}-${Date.now()}`,
        title: `${coinPackage.title} Purchased`,
        description: `Demo purchase completed for ${coinPackage.price}`,
        amount: coinPackage.amount,
        createdAt: "Today",
        type: "purchase",
      },
      ...currentTransactions,
    ]);

    return coinPackage;
  };

  const value = useMemo<CoinStoreValue>(
    () => ({
      balance,
      earnCoins,
      purchasePackage,
      transactions,
    }),
    [balance, transactions],
  );

  return (
    <CoinStoreContext.Provider value={value}>
      {children}
    </CoinStoreContext.Provider>
  );
}

export function useCoins() {
  const context = use(CoinStoreContext);

  if (context == null) {
    throw new Error("useCoins must be used within CoinProvider.");
  }

  return context;
}
