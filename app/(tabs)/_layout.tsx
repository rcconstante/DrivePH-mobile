import { Tabs } from "expo-router/js-tabs";

import { FloatingTabBar } from "@/components/navigation/floating-tab-bar";
import { TabBarIcon } from "@/components/navigation/tab-bar-icon";
import {
  BookOpenIcon,
  ClipboardListIcon,
  HomeIcon,
  RouteIcon,
  UserIcon,
} from "@/components/ui/icons";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarAccessibilityLabel: "Home tab",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon color={color} focused={focused} icon={HomeIcon} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarAccessibilityLabel: "Learn tab",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon color={color} focused={focused} icon={BookOpenIcon} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="scenarios"
        options={{
          title: "Scenarios",
          tabBarAccessibilityLabel: "Scenarios tab",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon color={color} focused={focused} icon={RouteIcon} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          tabBarAccessibilityLabel: "Quiz tab",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon color={color} focused={focused} icon={ClipboardListIcon} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarAccessibilityLabel: "Profile tab",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon color={color} focused={focused} icon={UserIcon} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
