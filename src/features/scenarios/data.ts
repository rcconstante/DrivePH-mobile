import type { ImageSourcePropType } from "react-native";

import {
  CloudRainIcon,
  GridIcon,
  SignpostIcon,
  SirenIcon,
  SquareParkingIcon,
  TrafficConeIcon,
  type IconComponent,
} from "@/components/ui/icons";

export type ScenarioCategoryId =
  | "all"
  | "intersections"
  | "road-traffic"
  | "parking"
  | "weather"
  | "emergency";

export type ScenarioCategory = {
  color: string;
  icon: IconComponent;
  id: ScenarioCategoryId;
  label: string;
};

export type ScenarioDifficulty = "Easy" | "Medium" | "Hard";

export type Scenario = {
  categoryId: Exclude<ScenarioCategoryId, "all">;
  description: string;
  difficulty: ScenarioDifficulty;
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  steps: number;
  title: string;
};

export const scenarioCategories: ScenarioCategory[] = [
  {
    id: "all",
    label: "All",
    icon: GridIcon,
    color: "#0757ff",
  },
  {
    id: "intersections",
    label: "Intersections",
    icon: SignpostIcon,
    color: "#35a852",
  },
  {
    id: "road-traffic",
    label: "Road & Traffic",
    icon: TrafficConeIcon,
    color: "#f59e0b",
  },
  {
    id: "parking",
    label: "Parking",
    icon: SquareParkingIcon,
    color: "#2f80ed",
  },
  {
    id: "weather",
    label: "Weather",
    icon: CloudRainIcon,
    color: "#7c5cff",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: SirenIcon,
    color: "#ef4444",
  },
];

export const scenarios: Scenario[] = [
  {
    id: "right-of-way-uncontrolled-intersection",
    categoryId: "intersections",
    title: "Right of Way at Uncontrolled Intersection",
    description: "Learn who has the right of way when there are no traffic signs or signals.",
    difficulty: "Easy",
    steps: 5,
    image: require("../../assets/scenarios-assets/Right-of-way-at-uncrontrolled-Intersection.png") as ImageSourcePropType,
    imageLabel: "Cars approaching an uncontrolled intersection",
  },
  {
    id: "parallel-parking",
    categoryId: "parking",
    title: "Parallel Parking",
    description: "Step-by-step guide to parallel parking on the right side of the road.",
    difficulty: "Medium",
    steps: 7,
    image: require("../../assets/scenarios-assets/Parallel-parking.png") as ImageSourcePropType,
    imageLabel: "Car parking beside a curb",
  },
  {
    id: "driving-heavy-rain",
    categoryId: "weather",
    title: "Driving in Heavy Rain",
    description: "Tips on maintaining control and staying safe in heavy rain conditions.",
    difficulty: "Hard",
    steps: 6,
    image: require("../../assets/scenarios-assets/Driving-in-heavy-rain.png") as ImageSourcePropType,
    imageLabel: "Car driving in heavy rain",
  },
];

export const difficultyTheme: Record<ScenarioDifficulty, { backgroundColor: string; color: string }> = {
  Easy: {
    backgroundColor: "#e9f9ed",
    color: "#2f973b",
  },
  Medium: {
    backgroundColor: "#fff3df",
    color: "#f97316",
  },
  Hard: {
    backgroundColor: "#ffe9ed",
    color: "#ef4444",
  },
};
