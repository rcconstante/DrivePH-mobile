import type { ImageSourcePropType } from "react-native";

import { ltoReviewerQuestions } from "@/features/quiz/lto-reviewer-questions";

export type QuizCategoryId =
  | "lto-reviewer"
  | "road-signs"
  | "traffic-rules"
  | "safe-driving"
  | "license-types";

export type QuizCategory = {
  description: string;
  id: QuizCategoryId;
  image: ImageSourcePropType;
  imageLabel: string;
  title: string;
};

export type QuizQuestion = {
  answerId: string;
  choices: Array<{
    id: string;
    label: string;
  }>;
  explanation: string;
  id: string;
  image?: ImageSourcePropType;
  imageLabel?: string;
  prompt: string;
};

export type QuizSet = {
  categoryId: QuizCategoryId;
  description: string;
  estimatedMinutes: string;
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  questions: QuizQuestion[];
  title: string;
};

const roadSignImage = require("../../assets/cute-assets/parking-sign.png") as ImageSourcePropType;
const trafficRulesImage = require("../../assets/cute-assets/driving-warning.png") as ImageSourcePropType;
const safeDrivingImage = require("../../assets/cute-assets/shield.png") as ImageSourcePropType;
const licenseImage = require("../../assets/cute-assets/student-permit.png") as ImageSourcePropType;
const reviewerImage = require("../../assets/cute-assets/lto-quiz.png") as ImageSourcePropType;

export const quizCategories: QuizCategory[] = [
  {
    id: "lto-reviewer",
    image: reviewerImage,
    imageLabel: "LTO quiz reviewer",
    title: "LTO Reviewer",
    description: "100 reviewer questions split into two practice sets.",
  },
  {
    id: "road-signs",
    image: roadSignImage,
    imageLabel: "Road sign",
    title: "Road Signs",
    description: "Traffic lights, sign shapes, and road markings.",
  },
  {
    id: "traffic-rules",
    image: trafficRulesImage,
    imageLabel: "Traffic light and warning",
    title: "Traffic Rules",
    description: "Right of way, lanes, overtaking, and parking rules.",
  },
  {
    id: "safe-driving",
    image: safeDrivingImage,
    imageLabel: "Safety shield",
    title: "Safe Driving",
    description: "Defensive driving, fatigue, visibility, and hazard response.",
  },
  {
    id: "license-types",
    image: licenseImage,
    imageLabel: "License card",
    title: "License Types",
    description: "Student Permit, Non-Pro, Professional, and license duties.",
  },
];

const getReviewerQuestion = (number: number) =>
  ltoReviewerQuestions.find((question) => question.id === `lto-reviewer-${String(number).padStart(3, "0")}`);

const pickReviewerQuestions = (numbers: number[]) =>
  numbers
    .map((number) => getReviewerQuestion(number))
    .filter((question): question is QuizQuestion => question != null);

export const quizSets: QuizSet[] = [
  {
    id: "part-1",
    categoryId: "lto-reviewer",
    title: "LTO Reviewer Part 1",
    description: "Questions 1-50 from the LTO reviewer file.",
    estimatedMinutes: "20-25 min",
    image: reviewerImage,
    imageLabel: "LTO reviewer clipboard",
    questions: ltoReviewerQuestions.slice(0, 50),
  },
  {
    id: "part-2",
    categoryId: "lto-reviewer",
    title: "LTO Reviewer Part 2",
    description: "Questions 51-100 from the LTO reviewer file.",
    estimatedMinutes: "20-25 min",
    image: reviewerImage,
    imageLabel: "LTO reviewer clipboard",
    questions: ltoReviewerQuestions.slice(50, 100),
  },
  {
    id: "traffic-lights",
    categoryId: "road-signs",
    title: "Traffic Lights",
    description: "Red, yellow, green, and arrow traffic light meanings.",
    estimatedMinutes: "4-6 min",
    image: roadSignImage,
    imageLabel: "Traffic light quiz",
    questions: pickReviewerQuestions([13, 22, 31, 32, 33, 34, 35, 36]),
  },
  {
    id: "sign-shapes",
    categoryId: "road-signs",
    title: "Sign Shapes & Colors",
    description: "Recognize regulatory, warning, and information signs.",
    estimatedMinutes: "3-5 min",
    image: roadSignImage,
    imageLabel: "Road sign quiz",
    questions: pickReviewerQuestions([28, 29, 30]),
  },
  {
    id: "road-markings",
    categoryId: "road-signs",
    title: "Road Markings",
    description: "White lines, yellow lines, arrows, and overtaking markings.",
    estimatedMinutes: "5-7 min",
    image: roadSignImage,
    imageLabel: "Road marking quiz",
    questions: pickReviewerQuestions([16, 23, 37, 38, 39, 41, 50, 66, 71, 74]),
  },
  {
    id: "right-of-way",
    categoryId: "traffic-rules",
    title: "Right of Way",
    description: "Intersections, stop signs, roundabouts, and giving way.",
    estimatedMinutes: "5-7 min",
    image: trafficRulesImage,
    imageLabel: "Traffic rules quiz",
    questions: pickReviewerQuestions([7, 18, 19, 20, 47, 59, 73]),
  },
  {
    id: "lane-overtaking",
    categoryId: "traffic-rules",
    title: "Lane & Overtaking",
    description: "Safe overtaking, lane use, lane changes, and hand signals.",
    estimatedMinutes: "7-9 min",
    image: trafficRulesImage,
    imageLabel: "Lane rules quiz",
    questions: pickReviewerQuestions([2, 6, 14, 15, 21, 37, 38, 39, 43, 44, 45, 64]),
  },
  {
    id: "parking-violations",
    categoryId: "traffic-rules",
    title: "Parking & Violations",
    description: "Parking rules, enforcement, required documents, and penalties.",
    estimatedMinutes: "6-8 min",
    image: trafficRulesImage,
    imageLabel: "Parking and violation quiz",
    questions: pickReviewerQuestions([11, 12, 48, 49, 54, 61, 63, 65, 68, 72]),
  },
  {
    id: "defensive-driving",
    categoryId: "safe-driving",
    title: "Defensive Driving",
    description: "Mirror checks, safe speed, fatigue, and hazard anticipation.",
    estimatedMinutes: "6-8 min",
    image: safeDrivingImage,
    imageLabel: "Defensive driving quiz",
    questions: pickReviewerQuestions([1, 4, 10, 17, 26, 27, 40, 52, 53, 56, 57, 62]),
  },
  {
    id: "license-basics",
    categoryId: "license-types",
    title: "License Basics",
    description: "License privilege, restrictions, age requirements, and vehicle authority.",
    estimatedMinutes: "5-7 min",
    image: licenseImage,
    imageLabel: "License basics quiz",
    questions: pickReviewerQuestions([5, 8, 9, 25, 55, 58]),
  },
];

export const getQuizCategoryById = (categoryId: string) =>
  quizCategories.find((category) => category.id === categoryId);

export const getQuizSetsByCategoryId = (categoryId: QuizCategoryId) =>
  quizSets.filter((quizSet) => quizSet.categoryId === categoryId);

export const getQuizSetById = (categoryId: string, setId: string) =>
  quizSets.find((quizSet) => quizSet.categoryId === categoryId && quizSet.id === setId);

export const getQuizSetBySetId = (setId: string) =>
  quizSets.find((quizSet) => quizSet.id === setId);

export const getQuizCategoryQuestionCount = (categoryId: QuizCategoryId) =>
  getQuizSetsByCategoryId(categoryId).reduce((total, quizSet) => total + quizSet.questions.length, 0);

export const getFeaturedQuizSet = () => quizSets[0];
