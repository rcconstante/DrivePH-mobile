import type { ColorValue } from "react-native";

import { type IconComponent } from "@/components/ui/icons";

type TabBarIconProps = {
  color: ColorValue;
  focused?: boolean;
  icon: IconComponent;
  size: number;
};

export function TabBarIcon({ color, focused = false, icon: Icon, size }: TabBarIconProps) {
  return (
    <Icon
      color={color}
      fill={focused ? color : "none"}
      size={size}
      strokeWidth={focused ? 2 : 1.8}
    />
  );
}
