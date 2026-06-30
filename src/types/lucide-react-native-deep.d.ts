declare module "lucide-react-native/dist/cjs/icons/*.js" {
  import type { ComponentType } from "react";
  import type { ColorValue, StyleProp, ViewStyle } from "react-native";

  const Icon: ComponentType<{
    color?: ColorValue;
    fill?: ColorValue;
    size?: number;
    strokeWidth?: number;
    style?: StyleProp<ViewStyle>;
  }>;

  export default Icon;
}
