import type { BottomTabBarProps, BottomTabNavigationOptions } from "expo-router/js-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";

const activeColor = "#0757ff";
const inactiveColor = "#7b8aa4";

function getLabel(
  label: BottomTabNavigationOptions["tabBarLabel"],
  title: string | undefined,
  routeName: string,
) {
  return typeof label === "string" ? label : title ?? routeName;
}

export function FloatingTabBar({ descriptors, insets, navigation, state }: BottomTabBarProps) {
  return (
    <View style={[styles.container, { bottom: Math.max(insets.bottom, 16) + 12 }]}>
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        if (descriptor == null) {
          return null;
        }

        const options = descriptor.options;
        const focused = state.index === index;
        const color = focused ? activeColor : inactiveColor;
        const label = getLabel(options.tabBarLabel, options.title, route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            onLongPress={onLongPress}
            onPress={onPress}
            style={({ pressed }) => [
              styles.item,
              focused ? styles.itemActive : null,
              pressed ? styles.itemPressed : null,
            ]}
          >
            <View style={styles.iconSlot}>
              {options.tabBarIcon?.({
                color,
                focused,
                size: focused ? 23 : 22,
              })}
            </View>
            <Text
              numberOfLines={1}
              style={[styles.label, focused ? styles.labelActive : styles.labelInactive]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 999,
    borderWidth: 1,
    boxShadow: "0 10px 24px rgba(6, 27, 73, 0.12)",
    flexDirection: "row",
    gap: 4,
    height: 74,
    justifyContent: "space-between",
    left: 24,
    padding: 8,
    position: "absolute",
    right: 24,
  },
  item: {
    alignItems: "center",
    borderColor: "transparent",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    gap: 2,
    height: 58,
    justifyContent: "center",
    minWidth: 0,
  },
  itemActive: {
    backgroundColor: "#eaf2ff",
    borderColor: "#cfe0ff",
  },
  itemPressed: {
    opacity: 0.86,
  },
  iconSlot: {
    alignItems: "center",
    height: 25,
    justifyContent: "center",
    width: "100%",
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 13,
    maxWidth: "100%",
    textAlign: "center",
  },
  labelActive: {
    color: activeColor,
  },
  labelInactive: {
    color: inactiveColor,
  },
});
