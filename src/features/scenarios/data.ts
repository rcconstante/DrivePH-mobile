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
  duration: string;
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  keyRule: {
    body: string;
    title: string;
  };
  learnings: string[];
  previewNote: string;
  steps: number;
  walkthrough: string[];
  title: string;
  xp: number;
};

export const scenarioCategories: ScenarioCategory[] = [
  {
    id: "all",
    label: "All",
    icon: GridIcon,
    color: "#2f973b",
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
    duration: "5-7 min",
    xp: 100,
    steps: 5,
    image: require("../../assets/scenarios-assets/Right-of-way-at-uncrontrolled-Intersection.png") as ImageSourcePropType,
    imageLabel: "Cars approaching an uncontrolled intersection",
    learnings: [
      "Identify who has the right of way",
      "Apply right-of-way rules correctly",
      "Make safe and confident decisions",
    ],
    previewNote: "There are no traffic signs or signals. Determine the correct order of who goes first.",
    keyRule: {
      title: "When vehicles arrive at an uncontrolled intersection at the same time:",
      body: "The vehicle on the right has the right of way. Always slow down and confirm other drivers are yielding before proceeding.",
    },
    walkthrough: ["Learn", "Examples", "Practice", "Quiz", "Summary"],
  },
  {
    id: "parallel-parking",
    categoryId: "parking",
    title: "Parallel Parking",
    description: "Step-by-step guide to parallel parking on the right side of the road.",
    difficulty: "Medium",
    duration: "7-9 min",
    xp: 120,
    steps: 7,
    image: require("../../assets/scenarios-assets/Parallel-parking.png") as ImageSourcePropType,
    imageLabel: "Car parking beside a curb",
    learnings: [
      "Position your vehicle correctly",
      "Use mirrors and reference points",
      "Finish without blocking traffic",
    ],
    previewNote: "Practice positioning, reversing angle, and wheel correction for a safe parallel park.",
    keyRule: {
      title: "Parallel parking requires controlled movement:",
      body: "Signal, check mirrors and blind spots, reverse slowly, and avoid touching other vehicles or the curb.",
    },
    walkthrough: ["Learn", "Setup", "Maneuver", "Practice", "Summary"],
  },
  {
    id: "driving-heavy-rain",
    categoryId: "weather",
    title: "Driving in Heavy Rain",
    description: "Tips on maintaining control and staying safe in heavy rain conditions.",
    difficulty: "Hard",
    duration: "6-8 min",
    xp: 140,
    steps: 6,
    image: require("../../assets/scenarios-assets/Driving-in-heavy-rain.png") as ImageSourcePropType,
    imageLabel: "Car driving in heavy rain",
    learnings: [
      "Reduce speed and increase distance",
      "Avoid sudden steering and braking",
      "Respond safely to low visibility",
    ],
    previewNote: "Rain reduces visibility and tire grip. Choose the safest response before conditions worsen.",
    keyRule: {
      title: "Heavy rain demands defensive driving:",
      body: "Slow down, keep headlights on, increase following distance, and avoid flooded roads.",
    },
    walkthrough: ["Learn", "Hazards", "Practice", "Quiz", "Summary"],
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

export const getScenarioById = (scenarioId: string) =>
  scenarios.find((scenario) => scenario.id === scenarioId);
