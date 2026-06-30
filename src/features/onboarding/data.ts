import type { ImageSourcePropType } from "react-native";

export type TextPart = {
  text: string;
  accent?: boolean;
};

export type TextLine = TextPart[];

export type OnboardingSlide = {
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  title: TextLine[];
  body: string;
  cta: string;
};

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: "companion",
    image: require("../../assets/images/Onboarding-1.png") as ImageSourcePropType,
    imageLabel: "RiderPH logo above a green car on a road",
    title: [
      [{ text: "Learn. Practice." }],
      [
        { text: "Drive with " },
        { text: "Confidence.", accent: true },
      ],
    ],
    body: "Your all-in-one guide to learning\nhow to drive the right way in the Philippines.",
    cta: "Next",
  },
  {
    id: "licenses",
    image: require("../../assets/images/Onboarding-2.png") as ImageSourcePropType,
    imageLabel: "Driving guide book, traffic light, driver's license, and safety shield",
    title: [
      [{ text: "Everything You Need" }],
      [
        { text: "to " },
        { text: "Get Licensed", accent: true },
      ],
    ],
    body: "From student permit to driver's license,\nwe break it down step-by-step.",
    cta: "Next",
  },
  {
    id: "vehicles",
    image: require("../../assets/images/Onboarding-3.png") as ImageSourcePropType,
    imageLabel: "Motorcycle rider and truck passing road signs",
    title: [
      [
        { text: "Practice for " },
        { text: "Real", accent: true },
      ],
      [
        { text: "Life", accent: true },
        { text: " Situations" },
      ],
    ],
    body: "Learn through scenarios, road signs,\nand quizzes to become a responsible driver.",
    cta: "Get Started",
  },
];
