import type { ImageSourcePropType } from "react-native";

export type VehicleId = "car" | "motorcycle" | "truck" | "bus";

export type GoalId =
  | "student-permit"
  | "non-professional-license"
  | "professional-license"
  | "licensed";

export type ExperienceLevelId = "beginner" | "intermediate" | "experienced";

export type UserPreferences = {
  vehicles: VehicleId[];
  goal: GoalId;
  experienceLevel: ExperienceLevelId | null;
};

export type SetupHero = {
  image: ImageSourcePropType;
  imageLabel: string;
};

export type VehicleOption = {
  id: VehicleId;
  image: ImageSourcePropType;
  imageLabel: string;
  label: string;
  description: string;
};

export type GoalOption = {
  id: GoalId;
  image: ImageSourcePropType;
  imageLabel: string;
  label: string;
  description: string;
  summaryLabel: string;
};

export type ExperienceOption = {
  id: ExperienceLevelId;
  image: ImageSourcePropType;
  imageLabel: string;
  label: string;
  description: string;
};

export const setupHeroes = {
  vehicle: {
    image: require("../../assets/cute-assets/choose-vechile.png") as ImageSourcePropType,
    imageLabel: "Green car on a road with map pin",
  },
  goal: {
    image: require("../../assets/cute-assets/goal.png") as ImageSourcePropType,
    imageLabel: "Checklist and target goal",
  },
  experience: {
    image: require("../../assets/cute-assets/exp-level.png") as ImageSourcePropType,
    imageLabel: "Driving confidence meter and steering wheel",
  },
} satisfies Record<string, SetupHero>;

export const vehicleOptions: VehicleOption[] = [
  {
    id: "car",
    image: require("../../assets/cute-assets/car.png") as ImageSourcePropType,
    imageLabel: "Green car",
    label: "Car",
    description: "Private cars, sedans, and daily driving.",
  },
  {
    id: "motorcycle",
    image: require("../../assets/cute-assets/motorcycle.png") as ImageSourcePropType,
    imageLabel: "Blue motorcycle",
    label: "Motorcycle",
    description: "Two-wheel basics, safety, and lane discipline.",
  },
  {
    id: "truck",
    image: require("../../assets/cute-assets/truck.png") as ImageSourcePropType,
    imageLabel: "Green truck",
    label: "Truck",
    description: "Larger vehicle awareness and professional prep.",
  },
  {
    id: "bus",
    image: require("../../assets/cute-assets/bus.png") as ImageSourcePropType,
    imageLabel: "Yellow bus",
    label: "Bus",
    description: "Passenger vehicle safety and road positioning.",
  },
];

export const goalOptions: GoalOption[] = [
  {
    id: "student-permit",
    image: require("../../assets/cute-assets/student-permit.png") as ImageSourcePropType,
    imageLabel: "Student permit card",
    label: "I'm getting a Student Permit",
    description: "Start with LTO basics, signs, and permit requirements.",
    summaryLabel: "Student Permit",
  },
  {
    id: "non-professional-license",
    image: require("../../assets/cute-assets/car-non.png") as ImageSourcePropType,
    imageLabel: "Blue car and driving controls",
    label: "I'm preparing for my Non-Professional License",
    description: "Focus on exam topics, traffic rules, and everyday driving.",
    summaryLabel: "Non-Professional License",
  },
  {
    id: "professional-license",
    image: require("../../assets/cute-assets/shield.png") as ImageSourcePropType,
    imageLabel: "Green professional license shield",
    label: "I'm applying for a Professional License",
    description: "Prioritize professional requirements and heavier vehicles.",
    summaryLabel: "Professional License",
  },
  {
    id: "licensed",
    image: require("../../assets/cute-assets/already.png") as ImageSourcePropType,
    imageLabel: "License refresh symbol",
    label: "I already have a license",
    description: "Refresh rules, penalties, and safer road habits.",
    summaryLabel: "Licensed Driver",
  },
];

export const experienceOptions: ExperienceOption[] = [
  {
    id: "beginner",
    image: require("../../assets/cute-assets/plant.png") as ImageSourcePropType,
    imageLabel: "Small green plant",
    label: "Beginner",
    description: "New to driving or still building confidence.",
  },
  {
    id: "intermediate",
    image: require("../../assets/cute-assets/intermediate.png") as ImageSourcePropType,
    imageLabel: "Traffic cone",
    label: "Intermediate",
    description: "You know the basics and want guided practice.",
  },
  {
    id: "experienced",
    image: require("../../assets/cute-assets/experienced.png") as ImageSourcePropType,
    imageLabel: "Blue award ribbon",
    label: "Experienced",
    description: "You want refreshers, exams, and rule updates.",
  },
];

export const defaultPreferences: UserPreferences = {
  vehicles: ["car"],
  goal: "student-permit",
  experienceLevel: "beginner",
};

export const getVehicleLabel = (vehicleId: VehicleId) =>
  vehicleOptions.find((vehicle) => vehicle.id === vehicleId)?.label ?? vehicleId;

export const getGoalSummaryLabel = (goalId: GoalId) =>
  goalOptions.find((goal) => goal.id === goalId)?.summaryLabel ?? goalId;

export const getExperienceLabel = (experienceLevelId: ExperienceLevelId | null) =>
  experienceLevelId == null
    ? "Not selected"
    : experienceOptions.find((option) => option.id === experienceLevelId)?.label ?? experienceLevelId;

export const formatVehicles = (vehicles: VehicleId[]) => vehicles.map(getVehicleLabel).join(", ");
