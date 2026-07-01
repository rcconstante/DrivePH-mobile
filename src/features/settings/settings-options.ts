import type { ImageSourcePropType } from "react-native";

export type AppearanceOptionId = "light" | "dark" | "system";

export type AppearanceOption = {
  description: string;
  id: AppearanceOptionId;
  label: string;
};

export const appearanceOptions: AppearanceOption[] = [
  {
    id: "light",
    label: "Light",
    description: "Bright default app appearance.",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Darker colors for low-light use.",
  },
  {
    id: "system",
    label: "System",
    description: "Follow your device setting.",
  },
];

export type LanguageOptionId =
  | "english-ph"
  | "filipino"
  | "cebuano"
  | "english-us"
  | "spanish"
  | "chinese-simplified"
  | "japanese"
  | "korean";

export type LanguageOption = {
  countryLabel: string;
  flagImage: ImageSourcePropType;
  id: LanguageOptionId;
  label: string;
  recommended?: boolean;
  nativeLabel: string;
};

const philippinesFlag = require("../../assets/icons/country-flag/philippines.png") as ImageSourcePropType;
const unitedStatesFlag = require("../../assets/icons/country-flag/unitedstates.png") as ImageSourcePropType;
const spainFlag = require("../../assets/icons/country-flag/espanol.png") as ImageSourcePropType;
const chinaFlag = require("../../assets/icons/country-flag/china.png") as ImageSourcePropType;
const japanFlag = require("../../assets/icons/country-flag/japan.png") as ImageSourcePropType;
const koreaFlag = require("../../assets/icons/country-flag/korea.png") as ImageSourcePropType;

export const languageOptions: LanguageOption[] = [
  {
    id: "english-ph",
    flagImage: philippinesFlag,
    label: "English",
    nativeLabel: "English",
    countryLabel: "English (Philippines)",
    recommended: true,
  },
  {
    id: "filipino",
    flagImage: philippinesFlag,
    label: "Filipino",
    nativeLabel: "Filipino",
    countryLabel: "Filipino / Tagalog (Philippines)",
  },
  {
    id: "cebuano",
    flagImage: philippinesFlag,
    label: "Cebuano / Bisaya",
    nativeLabel: "Bisaya",
    countryLabel: "Cebuano / Bisaya (Philippines)",
  },
  {
    id: "english-us",
    flagImage: unitedStatesFlag,
    label: "English",
    nativeLabel: "English",
    countryLabel: "English (United States)",
  },
  {
    id: "spanish",
    flagImage: spainFlag,
    label: "Spanish",
    nativeLabel: "Español",
    countryLabel: "Spanish",
  },
  {
    id: "chinese-simplified",
    flagImage: chinaFlag,
    label: "Chinese",
    nativeLabel: "中文",
    countryLabel: "Chinese (Simplified)",
  },
  {
    id: "japanese",
    flagImage: japanFlag,
    label: "Japanese",
    nativeLabel: "日本語",
    countryLabel: "Japanese",
  },
  {
    id: "korean",
    flagImage: koreaFlag,
    label: "Korean",
    nativeLabel: "한국어",
    countryLabel: "Korean",
  },
];

export type NotificationSettingId =
  | "daily-reminders"
  | "lesson-updates"
  | "quiz-rewards"
  | "coin-rewards"
  | "app-news";

export type NotificationSetting = {
  description: string;
  id: NotificationSettingId;
  label: string;
};

export const notificationSettings: NotificationSetting[] = [
  {
    id: "daily-reminders",
    label: "Daily Reminders",
    description: "Practice prompts and lesson reminders.",
  },
  {
    id: "lesson-updates",
    label: "Lesson Updates",
    description: "New learning topics and guide updates.",
  },
  {
    id: "quiz-rewards",
    label: "Quiz Rewards",
    description: "Quiz results and earned rewards.",
  },
  {
    id: "coin-rewards",
    label: "Coin Rewards",
    description: "Coin bonuses and balance updates.",
  },
  {
    id: "app-news",
    label: "App News",
    description: "Important DrivePH Guide announcements.",
  },
];
