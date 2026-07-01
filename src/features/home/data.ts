import type { ImageSourcePropType } from "react-native";

export type ExploreRoute = "/learn" | "/quiz" | "/scenarios" | "/settings/index";

export type ExploreCard = {
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  route: ExploreRoute;
  title: string;
};

export type HomeNotification = {
  description: string;
  id: string;
  title: string;
};

export const exploreCards: ExploreCard[] = [
  {
    id: "road-signs",
    image: require("../../assets/cute-assets/parking-sign.png") as ImageSourcePropType,
    imageLabel: "Road sign",
    route: "/learn",
    title: "Road Signs",
  },
  {
    id: "lto-quiz",
    image: require("../../assets/cute-assets/lto-quiz.png") as ImageSourcePropType,
    imageLabel: "LTO quiz clipboard",
    route: "/quiz",
    title: "LTO Quiz",
  },
  {
    id: "driving-situations",
    image: require("../../assets/cute-assets/driving-warning.png") as ImageSourcePropType,
    imageLabel: "Driving warning sign",
    route: "/scenarios",
    title: "Driving Situations",
  },
  {
    id: "car-care",
    image: require("../../assets/cute-assets/meintenance.png") as ImageSourcePropType,
    imageLabel: "Maintenance tools",
    route: "/learn",
    title: "Car Care",
  },
  {
    id: "emergency-guide",
    image: require("../../assets/cute-assets/emergency.png") as ImageSourcePropType,
    imageLabel: "Emergency kit",
    route: "/scenarios",
    title: "Emergency Guide",
  },
  {
    id: "saved",
    image: require("../../assets/cute-assets/bookmark.png") as ImageSourcePropType,
    imageLabel: "Bookmark",
    route: "/settings/index",
    title: "Saved",
  },
];

export const homeNotifications: HomeNotification[] = [
  {
    id: "daily",
    title: "Daily practice is ready",
    description: "Take a quick road signs review and earn coins.",
  },
  {
    id: "lesson",
    title: "New beginner tip",
    description: "Parking basics were added to your recommended lessons.",
  },
  {
    id: "coins",
    title: "Coins bonus",
    description: "Complete one quiz today to claim your reward.",
  },
];
