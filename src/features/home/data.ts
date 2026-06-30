import {
  BookmarkIcon,
  ClipboardListIcon,
  ListChecksIcon,
  RouteIcon,
  TriangleAlertIcon,
  WrenchIcon,
  type IconComponent,
} from "@/components/ui/icons";

export type ExploreCard = {
  id: string;
  icon: IconComponent;
  title: string;
  description: string;
  accentColor: string;
};

export const exploreCards: ExploreCard[] = [
  {
    id: "road-signs",
    icon: RouteIcon,
    title: "Road Signs",
    description: "Learn signs and meanings.",
    accentColor: "#2f80ed",
  },
  {
    id: "lto-quiz",
    icon: ClipboardListIcon,
    title: "LTO Quiz",
    description: "Practice and pass your exam.",
    accentColor: "#34c759",
  },
  {
    id: "driving-situations",
    icon: TriangleAlertIcon,
    title: "Driving Situations",
    description: "Understand common road scenarios.",
    accentColor: "#ffb703",
  },
  {
    id: "car-care",
    icon: WrenchIcon,
    title: "Car Care",
    description: "Basic maintenance checklist.",
    accentColor: "#7c3aed",
  },
  {
    id: "emergency-guide",
    icon: ListChecksIcon,
    title: "Emergency Guide",
    description: "What to do in case of emergencies.",
    accentColor: "#ef4444",
  },
  {
    id: "saved",
    icon: BookmarkIcon,
    title: "Saved",
    description: "Your favorite topics and notes.",
    accentColor: "#14b8a6",
  },
];
