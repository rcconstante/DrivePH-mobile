import type { ImageSourcePropType } from "react-native";

export type TextPart = {
  text: string;
  accent?: boolean;
};

export type TextLine = TextPart[];

type BrandHeader = {
  kind: "brand";
};

type HeadlineHeader = {
  kind: "headline";
  lines: TextLine[];
};

type SpacerHeader = {
  kind: "spacer";
};

export type OnboardingSlide = {
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  header: BrandHeader | HeadlineHeader | SpacerHeader;
  title: TextLine[];
  body: string;
  cta: string;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "companion",
    image: require("../../assets/images/Onboarding-1.png") as ImageSourcePropType,
    imageLabel: "Blue car driving in the Philippines with a city skyline and flag",
    header: {
      kind: "brand",
    },
    title: [
      [{ text: "Your complete" }],
      [{ text: "driving companion", accent: true }],
    ],
    body: "From your first permit to becoming\na better, safer driver for life.",
    cta: "Next",
  },
  {
    id: "licenses",
    image: require("../../assets/images/Onboarding-2.png") as ImageSourcePropType,
    imageLabel: "License cards and a route marker showing the licensing journey",
    header: {
      kind: "spacer",
    },
    title: [
      [{ text: "We guide you every" }],
      [{ text: "step of the way", accent: true }],
    ],
    body: "Understand the process from Student\nPermit to Professional License and\neverything in between.",
    cta: "Next",
  },
  {
    id: "vehicles",
    image: require("../../assets/images/Onboarding-3.png") as ImageSourcePropType,
    imageLabel: "Cars, motorcycle, truck, and bus on a road",
    header: {
      kind: "headline",
      lines: [
        [{ text: "Learn for any" }],
        [
          { text: "vehicle you ", accent: true },
          { text: "drive", accent: true },
        ],
      ],
    },
    title: [
      [{ text: "Lessons and tips tailored" }],
      [
        { text: "for " },
        { text: "cars, motorcycles,", accent: true },
      ],
      [{ text: "trucks, and more.", accent: true }],
    ],
    body: "Choose your vehicle and get personalized\ncontent that fits what you drive.",
    cta: "Get Started",
  },
];
