import type { ImageSourcePropType } from "react-native";

export type CoinPackageId = "100" | "500" | "1200" | "2500" | "5000" | "10000";

export type CoinPackage = {
  amount: number;
  badge?: string;
  id: CoinPackageId;
  image: ImageSourcePropType;
  price: string;
  subtitle: string;
  title: string;
};

export const coinPackages: CoinPackage[] = [
  {
    id: "100",
    amount: 100,
    title: "100 Coins",
    subtitle: "Starter Pack",
    price: "P49.00",
    image: require("../../assets/cute-assets/100coins.png") as ImageSourcePropType,
  },
  {
    id: "500",
    amount: 500,
    title: "500 Coins",
    subtitle: "Value Pack",
    price: "P199.00",
    badge: "Most Popular",
    image: require("../../assets/cute-assets/500coins.png") as ImageSourcePropType,
  },
  {
    id: "1200",
    amount: 1200,
    title: "1,200 Coins",
    subtitle: "Premium Pack",
    price: "P399.00",
    badge: "20% Off",
    image: require("../../assets/cute-assets/1200coins.png") as ImageSourcePropType,
  },
  {
    id: "2500",
    amount: 2500,
    title: "2,500 Coins",
    subtitle: "Pro Pack",
    price: "P699.00",
    badge: "30% Off",
    image: require("../../assets/cute-assets/2500coins.png") as ImageSourcePropType,
  },
  {
    id: "5000",
    amount: 5000,
    title: "5,000 Coins",
    subtitle: "Master Pack",
    price: "P1,199.00",
    badge: "33% Off",
    image: require("../../assets/cute-assets/5000coins.png") as ImageSourcePropType,
  },
  {
    id: "10000",
    amount: 10000,
    title: "10,000 Coins",
    subtitle: "Ultimate Pack",
    price: "P1,999.00",
    badge: "33% Off",
    image: require("../../assets/cute-assets/10000coins.png") as ImageSourcePropType,
  },
];

export const getCoinPackageById = (packageId: CoinPackageId) =>
  coinPackages.find((item) => item.id === packageId);
