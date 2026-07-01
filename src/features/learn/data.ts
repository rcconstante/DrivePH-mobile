import type { ImageSourcePropType } from "react-native";

export type LearnCategoryId = "all" | "student-permit" | "license-types" | "rules";

export type LearnTopicCategoryId = Exclude<LearnCategoryId, "all">;

export type LearnCategory = {
  id: LearnCategoryId;
  label: string;
};

export type LearnTopic = {
  id: string;
  categoryId: LearnTopicCategoryId;
  completedTopics: number;
  description: string;
  image: ImageSourcePropType;
  imageLabel: string;
  title: string;
  totalTopics: number;
};

export type LearnLesson = {
  id: string;
  title: string;
  body: string;
};

export const learnCategories: LearnCategory[] = [
  { id: "all", label: "All" },
  { id: "student-permit", label: "Student Permit" },
  { id: "license-types", label: "License Types" },
  { id: "rules", label: "Rules" },
];

export const learnTopics: LearnTopic[] = [
  {
    id: "student-permit",
    categoryId: "student-permit",
    completedTopics: 4,
    description: "Requirements, process and restrictions",
    image: require("../../assets/cute-assets/student-permit.png") as ImageSourcePropType,
    imageLabel: "Student permit card",
    title: "Student Permit",
    totalTopics: 6,
  },
  {
    id: "drivers-license-types",
    categoryId: "license-types",
    completedTopics: 3,
    description: "Know the different license categories in the PH",
    image: require("../../assets/cute-assets/car-non.png") as ImageSourcePropType,
    imageLabel: "Driver license card and car",
    title: "Driver's License Types",
    totalTopics: 6,
  },
  {
    id: "road-signs-guide",
    categoryId: "rules",
    completedTopics: 5,
    description: "Meanings of common road signs",
    image: require("../../assets/cute-assets/parking-sign.png") as ImageSourcePropType,
    imageLabel: "Road sign",
    title: "Road Signs Guide",
    totalTopics: 10,
  },
  {
    id: "traffic-rules-law",
    categoryId: "rules",
    completedTopics: 6,
    description: "Important rules every driver must know",
    image: require("../../assets/cute-assets/driving-warning.png") as ImageSourcePropType,
    imageLabel: "Traffic warning",
    title: "Traffic Rules & Law",
    totalTopics: 12,
  },
];

export const getTopicProgress = (completedTopics: number, totalTopics: number) =>
  totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

export const getLearnTopicById = (topicId: string) =>
  learnTopics.find((topic) => topic.id === topicId);

export const getMockLessonsForTopic = (topic: LearnTopic): LearnLesson[] => [
  {
    id: `${topic.id}-overview`,
    title: `${topic.title} Overview`,
    body: "Test this is mock test content. Real lessons will be added here later.",
  },
  {
    id: `${topic.id}-practice`,
    title: "Practice Notes",
    body: "Test this is mock test content. Add short reminders and examples here.",
  },
  {
    id: `${topic.id}-review`,
    title: "Quick Review",
    body: "Test this is mock test content. Use this as a summary before quiz practice.",
  },
];
