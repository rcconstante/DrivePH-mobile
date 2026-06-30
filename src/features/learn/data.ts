export type LearnCategoryId =
  | "all"
  | "licenses"
  | "road-knowledge"
  | "driving-skills"
  | "vehicle-care";

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
  iconBackgroundColor: string;
  iconLabel: string;
  title: string;
  totalTopics: number;
};

export type LearnLesson = {
  id: string;
  title: string;
  body: string;
};

export const learnCategories: LearnCategory[] = [
  { id: "all", label: "All Topics" },
  { id: "licenses", label: "Licenses" },
  { id: "road-knowledge", label: "Road Knowledge" },
  { id: "driving-skills", label: "Driving Skills" },
  { id: "vehicle-care", label: "Vehicle Care" },
];

export const learnTopics: LearnTopic[] = [
  {
    id: "license-guide",
    categoryId: "licenses",
    completedTopics: 6,
    description: "Test this is mock test for permit and renewal lessons.",
    iconBackgroundColor: "#e7f1ff",
    iconLabel: "LG",
    title: "License Guide",
    totalTopics: 8,
  },
  {
    id: "road-signs",
    categoryId: "road-knowledge",
    completedTopics: 12,
    description: "Test this is mock test for signs and symbols.",
    iconBackgroundColor: "#fff4d7",
    iconLabel: "RS",
    title: "Road Signs",
    totalTopics: 15,
  },
  {
    id: "road-markings",
    categoryId: "road-knowledge",
    completedTopics: 5,
    description: "Test this is mock test for lines and pavement marks.",
    iconBackgroundColor: "#ddf7e8",
    iconLabel: "RM",
    title: "Road Markings",
    totalTopics: 10,
  },
  {
    id: "traffic-rules",
    categoryId: "road-knowledge",
    completedTopics: 8,
    description: "Test this is mock test for road rules and regulations.",
    iconBackgroundColor: "#ebe6ff",
    iconLabel: "TR",
    title: "Traffic Rules",
    totalTopics: 16,
  },
  {
    id: "penalties",
    categoryId: "driving-skills",
    completedTopics: 4,
    description: "Test this is mock test for violations and penalties.",
    iconBackgroundColor: "#ffe8db",
    iconLabel: "PV",
    title: "Penalties & Violations",
    totalTopics: 12,
  },
  {
    id: "vehicle-care",
    categoryId: "vehicle-care",
    completedTopics: 3,
    description: "Test this is mock test for maintenance basics.",
    iconBackgroundColor: "#ffe2f3",
    iconLabel: "VC",
    title: "Vehicle Care",
    totalTopics: 8,
  },
  {
    id: "emergency-guide",
    categoryId: "driving-skills",
    completedTopics: 2,
    description: "Test this is mock test for emergencies and accidents.",
    iconBackgroundColor: "#ffe4e6",
    iconLabel: "EG",
    title: "Emergency Guide",
    totalTopics: 6,
  },
  {
    id: "driving-tips",
    categoryId: "driving-skills",
    completedTopics: 6,
    description: "Test this is mock test for better daily driving habits.",
    iconBackgroundColor: "#e5f1ff",
    iconLabel: "DT",
    title: "Driving Tips",
    totalTopics: 10,
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
    body: "Test this is mock test content. This section will later hold the real lesson overview.",
  },
  {
    id: `${topic.id}-practice`,
    title: "Practice Notes",
    body: "Test this is mock test content. Add short reminders, examples, and checkpoints here.",
  },
  {
    id: `${topic.id}-review`,
    title: "Quick Review",
    body: "Test this is mock test content. Use this area for a summary before the quiz flow.",
  },
];
