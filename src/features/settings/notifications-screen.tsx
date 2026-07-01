import { useState } from "react";
import { Switch } from "react-native";

import { SettingsPage, SettingsRow, SettingsSection } from "@/components/settings/settings-page";
import { BellIcon } from "@/components/ui/icons";
import {
  notificationSettings,
  type NotificationSettingId,
} from "@/features/settings/settings-options";

const initialNotificationState: Record<NotificationSettingId, boolean> = {
  "daily-reminders": true,
  "lesson-updates": true,
  "quiz-rewards": true,
  "coin-rewards": true,
  "app-news": false,
};

export function NotificationsScreen() {
  const [settings, setSettings] = useState(initialNotificationState);

  const updateSetting = (settingId: NotificationSettingId, enabled: boolean) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [settingId]: enabled,
    }));
  };

  return (
    <SettingsPage
      testID="notifications-screen"
      title="Notifications"
      subtitle="Control which updates can notify you."
    >
      <SettingsSection title="Alerts">
        {notificationSettings.map((item) => (
          <SettingsRow
            accessory={
              <Switch
                accessibilityLabel={`${item.label} notifications`}
                ios_backgroundColor="#d6dde7"
                onValueChange={(enabled) => updateSetting(item.id, enabled)}
                thumbColor="#ffffff"
                trackColor={{ false: "#d6dde7", true: "#83d88d" }}
                value={settings[item.id]}
              />
            }
            color="#4caf50"
            description={item.description}
            icon={BellIcon}
            key={item.id}
            title={item.label}
          />
        ))}
      </SettingsSection>
    </SettingsPage>
  );
}
