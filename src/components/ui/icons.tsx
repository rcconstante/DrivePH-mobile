import type { ComponentType } from "react";
import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  Car,
  Check,
  ChevronRight,
  ClipboardCheck,
  CloudRain,
  Earth,
  FileText,
  Grid2x2,
  House,
  Info,
  LifeBuoy,
  Map,
  Moon,
  Plus,
  RefreshCw,
  Road,
  Search,
  Settings,
  Signpost,
  Siren,
  SlidersHorizontal,
  SquareParking,
  Sun,
  TrafficCone,
} from "lucide-react-native";

export type IconProps = {
  color?: ColorValue;
  fill?: ColorValue;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export type IconComponent = (props: IconProps) => React.JSX.Element;

type LucideNativeIcon = ComponentType<{
  color?: ColorValue;
  fill?: ColorValue;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}>;

const createIcon =
  (Icon: LucideNativeIcon): IconComponent =>
  ({ color = "#061b49", fill = "none", size = 24, strokeWidth = 1.8, style }) => (
    <Icon
      color={color}
      fill={fill}
      size={size}
      strokeWidth={strokeWidth}
      style={style}
    />
  );

export const ArrowLeftIcon = createIcon(ArrowLeft as unknown as LucideNativeIcon);
export const ArrowRightIcon = createIcon(ArrowRight as unknown as LucideNativeIcon);
export const ChevronRightIcon = createIcon(ChevronRight as unknown as LucideNativeIcon);
export const CheckIcon = createIcon(Check as unknown as LucideNativeIcon);
export const BellIcon = createIcon(Bell as unknown as LucideNativeIcon);
export const SearchIcon = createIcon(Search as unknown as LucideNativeIcon);
export const HomeIcon = createIcon(House as unknown as LucideNativeIcon);
export const BookOpenIcon = createIcon(BookOpen as unknown as LucideNativeIcon);
export const RoadIcon = createIcon(Road as unknown as LucideNativeIcon);
export const ClipboardCheckIcon = createIcon(ClipboardCheck as unknown as LucideNativeIcon);
export const SettingsIcon = createIcon(Settings as unknown as LucideNativeIcon);
export const CarIcon = createIcon(Car as unknown as LucideNativeIcon);
export const BadgeCheckIcon = createIcon(BadgeCheck as unknown as LucideNativeIcon);
export const BarChartIcon = createIcon(BarChart3 as unknown as LucideNativeIcon);
export const BookmarkIcon = createIcon(Bookmark as unknown as LucideNativeIcon);
export const CloudRainIcon = createIcon(CloudRain as unknown as LucideNativeIcon);
export const EarthIcon = createIcon(Earth as unknown as LucideNativeIcon);
export const FileTextIcon = createIcon(FileText as unknown as LucideNativeIcon);
export const GridIcon = createIcon(Grid2x2 as unknown as LucideNativeIcon);
export const InfoIcon = createIcon(Info as unknown as LucideNativeIcon);
export const LifeBuoyIcon = createIcon(LifeBuoy as unknown as LucideNativeIcon);
export const MapIcon = createIcon(Map as unknown as LucideNativeIcon);
export const MoonIcon = createIcon(Moon as unknown as LucideNativeIcon);
export const PlusIcon = createIcon(Plus as unknown as LucideNativeIcon);
export const RefreshIcon = createIcon(RefreshCw as unknown as LucideNativeIcon);
export const SignpostIcon = createIcon(Signpost as unknown as LucideNativeIcon);
export const SirenIcon = createIcon(Siren as unknown as LucideNativeIcon);
export const SlidersHorizontalIcon = createIcon(SlidersHorizontal as unknown as LucideNativeIcon);
export const SquareParkingIcon = createIcon(SquareParking as unknown as LucideNativeIcon);
export const SunIcon = createIcon(Sun as unknown as LucideNativeIcon);
export const TrafficConeIcon = createIcon(TrafficCone as unknown as LucideNativeIcon);
