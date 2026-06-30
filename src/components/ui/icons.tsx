import type { ComponentType } from "react";
import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import ArrowLeft from "lucide-react-native/dist/cjs/icons/arrow-left.js";
import ArrowRight from "lucide-react-native/dist/cjs/icons/arrow-right.js";
import BadgeCheck from "lucide-react-native/dist/cjs/icons/badge-check.js";
import BarChart3 from "lucide-react-native/dist/cjs/icons/chart-column.js";
import Bell from "lucide-react-native/dist/cjs/icons/bell.js";
import Bike from "lucide-react-native/dist/cjs/icons/bike.js";
import BookOpen from "lucide-react-native/dist/cjs/icons/book-open.js";
import Bookmark from "lucide-react-native/dist/cjs/icons/bookmark.js";
import Bus from "lucide-react-native/dist/cjs/icons/bus.js";
import Car from "lucide-react-native/dist/cjs/icons/car.js";
import Check from "lucide-react-native/dist/cjs/icons/check.js";
import ChevronRight from "lucide-react-native/dist/cjs/icons/chevron-right.js";
import Circle from "lucide-react-native/dist/cjs/icons/circle.js";
import ClipboardCheck from "lucide-react-native/dist/cjs/icons/clipboard-check.js";
import ClipboardList from "lucide-react-native/dist/cjs/icons/clipboard-list.js";
import House from "lucide-react-native/dist/cjs/icons/house.js";
import ListChecks from "lucide-react-native/dist/cjs/icons/list-checks.js";
import RefreshCw from "lucide-react-native/dist/cjs/icons/refresh-cw.js";
import Road from "lucide-react-native/dist/cjs/icons/road.js";
import Route from "lucide-react-native/dist/cjs/icons/route.js";
import Search from "lucide-react-native/dist/cjs/icons/search.js";
import Settings from "lucide-react-native/dist/cjs/icons/settings.js";
import Sprout from "lucide-react-native/dist/cjs/icons/sprout.js";
import TriangleAlert from "lucide-react-native/dist/cjs/icons/triangle-alert.js";
import Truck from "lucide-react-native/dist/cjs/icons/truck.js";
import User from "lucide-react-native/dist/cjs/icons/user.js";
import Wrench from "lucide-react-native/dist/cjs/icons/wrench.js";

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
export const RouteIcon = createIcon(Route as unknown as LucideNativeIcon);
export const RoadIcon = createIcon(Road as unknown as LucideNativeIcon);
export const ClipboardListIcon = createIcon(ClipboardList as unknown as LucideNativeIcon);
export const ClipboardCheckIcon = createIcon(ClipboardCheck as unknown as LucideNativeIcon);
export const UserIcon = createIcon(User as unknown as LucideNativeIcon);
export const SettingsIcon = createIcon(Settings as unknown as LucideNativeIcon);
export const CarIcon = createIcon(Car as unknown as LucideNativeIcon);
export const BikeIcon = createIcon(Bike as unknown as LucideNativeIcon);
export const TruckIcon = createIcon(Truck as unknown as LucideNativeIcon);
export const BusIcon = createIcon(Bus as unknown as LucideNativeIcon);
export const ListChecksIcon = createIcon(ListChecks as unknown as LucideNativeIcon);
export const WrenchIcon = createIcon(Wrench as unknown as LucideNativeIcon);
export const BookmarkIcon = createIcon(Bookmark as unknown as LucideNativeIcon);
export const SproutIcon = createIcon(Sprout as unknown as LucideNativeIcon);
export const BadgeCheckIcon = createIcon(BadgeCheck as unknown as LucideNativeIcon);
export const BarChartIcon = createIcon(BarChart3 as unknown as LucideNativeIcon);
export const RefreshCwIcon = createIcon(RefreshCw as unknown as LucideNativeIcon);
export const CircleIcon = createIcon(Circle as unknown as LucideNativeIcon);
export const TriangleAlertIcon = createIcon(TriangleAlert as unknown as LucideNativeIcon);
