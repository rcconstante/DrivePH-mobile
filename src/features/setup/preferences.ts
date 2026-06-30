import {
  BadgeCheckIcon,
  BikeIcon,
  BusIcon,
  CarIcon,
  CircleIcon,
  ListChecksIcon,
  RefreshCwIcon,
  SproutIcon,
  TruckIcon,
  type IconComponent,
} from "@/components/ui/icons";

export type VehicleId = "car" | "motorcycle" | "truck" | "bus";

export type GoalId =
  | "student-permit"
  | "non-professional-license"
  | "professional-license"
  | "licensed"
  | "renewal";

export type ExperienceLevelId = "beginner" | "intermediate" | "experienced";

export type UserPreferences = {
  vehicles: VehicleId[];
  goal: GoalId;
  experienceLevel: ExperienceLevelId | null;
};

export type VehicleOption = {
  id: VehicleId;
  icon: IconComponent;
  iconColor: string;
  label: string;
  description: string;
};

export type GoalOption = {
  id: GoalId;
  icon: IconComponent;
  iconColor: string;
  label: string;
  description: string;
  summaryLabel: string;
};

export type ExperienceOption = {
  id: ExperienceLevelId;
  icon: IconComponent;
  iconColor: string;
  label: string;
  description: string;
};

export type MultipleVehicleOption = {
  icon: IconComponent;
  iconColor: string;
  label: string;
  description: string;
};

export const vehicleOptions: VehicleOption[] = [
  {
    id: "car",
    icon: CarIcon,
    iconColor: "#ef4444",
    label: "Car",
    description: "Private cars, sedans, and daily driving.",
  },
  {
    id: "motorcycle",
    icon: BikeIcon,
    iconColor: "#0757ff",
    label: "Motorcycle",
    description: "Two-wheel basics, safety, and lane discipline.",
  },
  {
    id: "truck",
    icon: TruckIcon,
    iconColor: "#22a35a",
    label: "Truck",
    description: "Larger vehicle awareness and professional prep.",
  },
  {
    id: "bus",
    icon: BusIcon,
    iconColor: "#f5a400",
    label: "Bus",
    description: "Passenger vehicle safety and road positioning.",
  },
];

export const multipleVehicleOption: MultipleVehicleOption = {
  icon: ListChecksIcon,
  iconColor: "#0757ff",
  label: "Multiple Vehicles",
  description: "Learn across cars, motorcycles, trucks, and buses.",
};

export const goalOptions: GoalOption[] = [
  {
    id: "student-permit",
    icon: SproutIcon,
    iconColor: "#22a35a",
    label: "I'm getting a Student Permit",
    description: "Start with LTO basics, signs, and permit requirements.",
    summaryLabel: "Student Permit",
  },
  {
    id: "non-professional-license",
    icon: CarIcon,
    iconColor: "#0757ff",
    label: "I'm preparing for my Non-Professional License",
    description: "Focus on exam topics, traffic rules, and everyday driving.",
    summaryLabel: "Non-Professional License",
  },
  {
    id: "professional-license",
    icon: TruckIcon,
    iconColor: "#22a35a",
    label: "I'm applying for a Professional License",
    description: "Prioritize professional requirements and heavier vehicles.",
    summaryLabel: "Professional License",
  },
  {
    id: "licensed",
    icon: BadgeCheckIcon,
    iconColor: "#0757ff",
    label: "I already have a license",
    description: "Refresh rules, penalties, and safer road habits.",
    summaryLabel: "Licensed Driver",
  },
  {
    id: "renewal",
    icon: RefreshCwIcon,
    iconColor: "#f59f00",
    label: "I'm renewing my license",
    description: "Review renewal steps, requirements, and updated rules.",
    summaryLabel: "License Renewal",
  },
];

export const experienceOptions: ExperienceOption[] = [
  {
    id: "beginner",
    icon: CircleIcon,
    iconColor: "#22a35a",
    label: "Beginner",
    description: "New to driving or still building confidence.",
  },
  {
    id: "intermediate",
    icon: CircleIcon,
    iconColor: "#f5a400",
    label: "Intermediate",
    description: "You know the basics and want guided practice.",
  },
  {
    id: "experienced",
    icon: CircleIcon,
    iconColor: "#0757ff",
    label: "Experienced",
    description: "You want refreshers, exams, and rule updates.",
  },
];

export const defaultPreferences: UserPreferences = {
  vehicles: ["car"],
  goal: "student-permit",
  experienceLevel: null,
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
