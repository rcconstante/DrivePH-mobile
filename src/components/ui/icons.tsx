import type { ColorValue, StyleProp, ViewStyle } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";

export type IconProps = {
  color?: ColorValue;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export type IconComponent = (props: IconProps) => React.JSX.Element;

function IconFrame({
  children,
  color = "#061b49",
  size = 24,
  strokeWidth = 1.8,
  style,
}: IconProps & { children: React.ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {children}
    </Svg>
  );
}

export const ArrowLeftIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M19 12H5" />
    <Path d="m12 19-7-7 7-7" />
  </IconFrame>
);

export const ArrowRightIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M5 12h14" />
    <Path d="m12 5 7 7-7 7" />
  </IconFrame>
);

export const CheckIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="m20 6-11 11-5-5" />
  </IconFrame>
);

export const BellIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M10 21h4" />
    <Path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
  </IconFrame>
);

export const SearchIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Circle cx="11" cy="11" r="7" />
    <Path d="m20 20-3.5-3.5" />
  </IconFrame>
);

export const HomeIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="m3 11 9-8 9 8" />
    <Path d="M5 10v10h14V10" />
    <Path d="M9 20v-6h6v6" />
  </IconFrame>
);

export const BookOpenIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M12 7v14" />
    <Path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v19H7.5A3.5 3.5 0 0 0 4 17.5z" />
    <Path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v19h4.5a3.5 3.5 0 0 1 3.5-3.5z" />
  </IconFrame>
);

export const RouteIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Circle cx="6" cy="18" r="3" />
    <Circle cx="18" cy="6" r="3" />
    <Path d="M9 18h5a4 4 0 0 0 0-8H9a3 3 0 0 1 0-6h6" />
  </IconFrame>
);

export const ClipboardListIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Rect x="8" y="2" width="8" height="4" rx="1" />
    <Path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <Path d="M9 12h6" />
    <Path d="M9 16h6" />
    <Path d="M8 12h.01" />
    <Path d="M8 16h.01" />
  </IconFrame>
);

export const UserIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Circle cx="12" cy="8" r="4" />
    <Path d="M4 21a8 8 0 0 1 16 0" />
  </IconFrame>
);

export const CarIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M5 12 7 6h10l2 6" />
    <Rect x="3" y="11" width="18" height="7" rx="2" />
    <Path d="M7 18v2" />
    <Path d="M17 18v2" />
    <Path d="M7 14h.01" />
    <Path d="M17 14h.01" />
  </IconFrame>
);

export const BikeIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Circle cx="6" cy="17" r="3" />
    <Circle cx="18" cy="17" r="3" />
    <Path d="M8 17h4l3-7h2" />
    <Path d="M10 9h3l-2 4" />
    <Path d="M6 17l4-8" />
  </IconFrame>
);

export const TruckIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M3 7h11v10H3z" />
    <Path d="M14 10h4l3 3v4h-7z" />
    <Circle cx="7" cy="18" r="2" />
    <Circle cx="17" cy="18" r="2" />
  </IconFrame>
);

export const BusIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Rect x="5" y="3" width="14" height="16" rx="3" />
    <Path d="M8 7h8" />
    <Path d="M8 11h8" />
    <Path d="M7 19v2" />
    <Path d="M17 19v2" />
    <Path d="M8 15h.01" />
    <Path d="M16 15h.01" />
  </IconFrame>
);

export const ListChecksIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="m3 7 2 2 4-4" />
    <Path d="M11 7h10" />
    <Path d="m3 17 2 2 4-4" />
    <Path d="M11 17h10" />
  </IconFrame>
);

export const WrenchIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.8 2.8-2.1-2.1z" />
  </IconFrame>
);

export const BookmarkIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4z" />
  </IconFrame>
);

export const SproutIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M12 21V10" />
    <Path d="M12 10C8 10 5 7 5 3c4 0 7 3 7 7" />
    <Path d="M12 14c4 0 7-3 7-7-4 0-7 3-7 7" />
  </IconFrame>
);

export const BadgeCheckIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Circle cx="12" cy="12" r="9" />
    <Path d="m8 12 3 3 5-6" />
  </IconFrame>
);

export const RefreshCwIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M21 12a9 9 0 0 0-15-6.7L3 8" />
    <Path d="M3 3v5h5" />
    <Path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    <Path d="M21 21v-5h-5" />
  </IconFrame>
);

export const CircleIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Circle cx="12" cy="12" r="8" />
  </IconFrame>
);

export const TriangleAlertIcon: IconComponent = (props) => (
  <IconFrame {...props}>
    <Path d="M12 3 2 21h20z" />
    <Path d="M12 9v5" />
    <Path d="M12 17h.01" />
  </IconFrame>
);
