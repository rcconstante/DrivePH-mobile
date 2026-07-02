import type { ImageSourcePropType } from "react-native";

import {
  cdeRoadTrafficCheckpoint,
  cdeRoadTrafficLearnSections,
} from "@/features/traffic-rules/cde-road-traffic-rules";

export type LearnCategoryId =
  | "all"
  | "student-permit"
  | "license-types"
  | "road-knowledge"
  | "vehicle-care";

export type LearnTopicCategoryId = Exclude<LearnCategoryId, "all">;

export type LearnCategory = {
  id: LearnCategoryId;
  label: string;
};

export type LearnTopic = {
  categoryId: LearnTopicCategoryId;
  description: string;
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
  title: string;
};

export type LearnStepId = "overview" | "content" | "checkpoint";
export type LearnStageId = LearnStepId;

export type LearnStage = {
  id: LearnStepId;
  label: string;
};

export type LearnInfoCard = {
  body: string;
  id: string;
  image?: ImageSourcePropType;
  imageLabel?: string;
  meta?: string;
  title: string;
};

export type LearnSectionImage = {
  id: string;
  image: ImageSourcePropType;
  imageLabel: string;
};

export type LearnContentSection = {
  cards: LearnInfoCard[];
  id: string;
  image?: ImageSourcePropType;
  imageLabel?: string;
  images?: LearnSectionImage[];
  subtitle: string;
  title: string;
};

export type LearnCheckpointChoice = {
  correct: boolean;
  id: string;
  label: string;
};

export type LearnCheckpoint = {
  choices: LearnCheckpointChoice[];
  explanation: string;
  prompt: string;
  successBody: string;
  successTitle: string;
};

export type LearnDetail = {
  checkpoint: LearnCheckpoint;
  overview: {
    definition: string;
    purposeBullets: string[];
    reminder: string;
    subtitle: string;
    tag: string;
    title: string;
  };
  sections: LearnContentSection[];
  showSubmoduleList?: boolean;
};

export const learnStages: LearnStage[] = [
  { id: "overview", label: "Overview" },
  { id: "content", label: "Lesson" },
  { id: "checkpoint", label: "Checkpoint" },
];

export const learnCategories: LearnCategory[] = [
  { id: "all", label: "All" },
  { id: "student-permit", label: "Student Permit" },
  { id: "license-types", label: "License Types" },
  { id: "road-knowledge", label: "Road Knowledge" },
  { id: "vehicle-care", label: "Vehicle Care" },
];

const studentPermitImage = require("../../assets/cute-assets/student-permit.png") as ImageSourcePropType;
const licenseImage = require("../../assets/cute-assets/car-non.png") as ImageSourcePropType;
const roadSignImage = require("../../assets/cute-assets/parking-sign.png") as ImageSourcePropType;
const trafficRulesImage = require("../../assets/cute-assets/driving-warning.png") as ImageSourcePropType;
const careImage = require("../../assets/cute-assets/meintenance.png") as ImageSourcePropType;
const plantImage = require("../../assets/cute-assets/plant.png") as ImageSourcePropType;
const coneImage = require("../../assets/cute-assets/intermediate.png") as ImageSourcePropType;

export const learnTopics: LearnTopic[] = [
  {
    id: "student-permit",
    categoryId: "student-permit",
    description: "Eligibility, requirements, restrictions, and LTO process.",
    image: studentPermitImage,
    imageLabel: "Student permit card",
    title: "Student Permit",
  },
  {
    id: "drivers-license-types",
    categoryId: "license-types",
    description: "Student Permit, Non-Professional, and Professional licenses.",
    image: licenseImage,
    imageLabel: "Driver license card and car",
    title: "Driver's License Types",
  },
  {
    id: "road-signs-guide",
    categoryId: "road-knowledge",
    description: "Regulatory, warning, guide, and pavement signs.",
    image: roadSignImage,
    imageLabel: "Road sign",
    title: "Road Signs Guide",
  },
  {
    id: "traffic-rules-law",
    categoryId: "road-knowledge",
    description: "Right of way, speed, parking, lanes, and safe distance.",
    image: trafficRulesImage,
    imageLabel: "Traffic warning",
    title: "Traffic Rules & Law",
  },
  {
    id: "cde-road-traffic-rules",
    categoryId: "road-knowledge",
    description: "Road rules module with turning, lanes, right of way, parking, and crash duties.",
    image: trafficRulesImage,
    imageLabel: "Traffic warning",
    title: "Rules on the Road",
  },
  {
    id: "basic-car-care",
    categoryId: "vehicle-care",
    description: "Tires, lights, fluids, battery, and pre-drive checks.",
    image: careImage,
    imageLabel: "Vehicle maintenance",
    title: "Basic Vehicle Care",
  },
];

const detailsByTopicId: Record<string, LearnDetail> = {
  "student-permit": {
    overview: {
      tag: "LTO Guide",
      title: "What is a Student Permit?",
      subtitle: "Your first step toward becoming a licensed driver in the Philippines.",
      definition:
        "A Student Permit is an authorization that lets a new driver practice driving on Philippine roads under specific LTO conditions.",
      purposeBullets: [
        "Allows supervised driving practice before applying for a driver's license.",
        "Prepares you for practical driving and road-rule decisions.",
        "Builds responsible habits before independent driving.",
      ],
      reminder:
        "A Student Permit is not a driver's license. You must drive with a duly licensed driver seated beside you.",
    },
    sections: [
      {
        id: "requirements",
        title: "Requirements",
        subtitle: "Prepare these before applying for a Student Permit.",
        image: studentPermitImage,
        imageLabel: "Student permit requirements",
        cards: [
          {
            id: "age",
            title: "Minimum Age",
            meta: "Eligibility",
            body: "Filipino applicants must be at least 16 years old. Foreign applicants must be at least 18 years old and meet residency requirements.",
          },
          {
            id: "medical",
            title: "Medical Certificate",
            meta: "Health",
            body: "Secure a recent medical certificate from an LTO-accredited clinic to show you are physically and mentally fit to drive.",
          },
          {
            id: "tdc",
            title: "15-Hour TDC",
            meta: "Training",
            body: "Complete the 15-hour Theoretical Driving Course through an LTO-accredited driving school, TESDA training center, or LTO Driver's Education Center.",
          },
          {
            id: "documents",
            title: "Identity Documents",
            meta: "Documents",
            body: "Prepare proof of identity such as PSA birth certificate or other accepted documents. Applicants under 18 need parent or guardian consent and ID.",
          },
        ],
      },
      {
        id: "rules",
        title: "Rules and Conditions",
        subtitle: "A Student Permit has strict limits.",
        image: coneImage,
        imageLabel: "Safety cone",
        cards: [
          {
            id: "supervision",
            title: "No Driving Alone",
            body: "You must be accompanied by a duly licensed driver while practicing.",
          },
          {
            id: "violations",
            title: "No Pending Violations",
            body: "Settle pending LTO violations or fines before applying.",
          },
          {
            id: "fitness",
            title: "Fit to Drive",
            body: "Applicants must be able to understand traffic rules and must not be addicted to alcohol or prohibited drugs.",
          },
        ],
      },
      {
        id: "process",
        title: "Application Process",
        subtitle: "Use LTMS or visit an LTO office, then complete the in-person steps.",
        image: plantImage,
        imageLabel: "Learning plant",
        cards: [
          {
            id: "ltms",
            title: "Create or Use LTMS Account",
            body: "The local student-permit reference notes LTMS registration as part of the online application path.",
          },
          {
            id: "submit",
            title: "Submit Requirements",
            body: "Bring your application details, medical certificate, TDC certificate, valid identity documents, and required consent documents if applicable.",
          },
          {
            id: "fees",
            title: "Pay LTO Fees",
            body: "The local reference lists application, permit, and computer fees totaling PHP 317.63, separate from medical and private driving-school costs.",
          },
        ],
      },
    ],
    checkpoint: {
      prompt: "Can you drive alone with a Student Permit?",
      choices: [
        { id: "yes-alone", label: "Yes, I can drive alone anytime.", correct: false },
        {
          id: "no-supervised",
          label: "No, I must be accompanied by a licensed driver.",
          correct: true,
        },
      ],
      explanation:
        "A Student Permit only allows supervised practice. A duly licensed driver must be seated beside you.",
      successTitle: "Great! That's correct.",
      successBody:
        "You must always be accompanied by a licensed driver when using a Student Permit.",
    },
  },
  "drivers-license-types": {
    overview: {
      tag: "License Guide",
      title: "Know the License Types",
      subtitle: "Choose the right learning path for your driving goal.",
      definition:
        "Philippine driver licensing starts with a Student Permit, then moves to Non-Professional or Professional Driver's License depending on the driver's purpose.",
      purposeBullets: [
        "Student Permit is for supervised learning.",
        "Non-Professional License is for private vehicle driving.",
        "Professional License is for people paid or earning money while driving.",
      ],
      reminder:
        "Having a license means you may drive only the vehicle types allowed by your license and restrictions.",
    },
    sections: [
      {
        id: "student",
        title: "Student Permit",
        subtitle: "The learner stage before full licensing.",
        image: studentPermitImage,
        imageLabel: "Student permit card",
        cards: [
          {
            id: "student-purpose",
            title: "Learning Authorization",
            body: "A Student Permit supports supervised practice and prepares you for the practical driving test.",
          },
          {
            id: "student-limit",
            title: "Not Independent Driving",
            body: "It is not a full driver's license and does not allow you to drive alone.",
          },
        ],
      },
      {
        id: "license-types",
        title: "Non-Pro vs Professional",
        subtitle: "The difference depends on vehicle use and driving purpose.",
        image: licenseImage,
        imageLabel: "Driver license and car",
        cards: [
          {
            id: "non-pro",
            title: "Non-Professional License",
            body: "The LTO reviewer identifies this as suited for private vehicles.",
          },
          {
            id: "professional",
            title: "Professional License",
            body: "The reviewer describes a professional driver as someone paid or earning money while driving a private or public vehicle.",
          },
          {
            id: "privilege",
            title: "License is a Privilege",
            body: "The reviewer states that obtaining a driver's license is a privilege, not a right.",
          },
        ],
      },
    ],
    checkpoint: {
      prompt: "Which license is mainly suited for private vehicle driving?",
      choices: [
        { id: "student", label: "Student Permit", correct: false },
        { id: "non-pro", label: "Non-Professional Driver's License", correct: true },
        { id: "professional", label: "Professional Driver's License", correct: false },
      ],
      explanation: "The LTO reviewer states that a Non-Professional Driver's License is suited for private vehicles.",
      successTitle: "Correct.",
      successBody: "Private driving belongs under the Non-Professional license path.",
    },
  },
  "road-signs-guide": {
    overview: {
      tag: "Road Knowledge",
      title: "Understand Road Signs",
      subtitle: "Read signs early so you can react smoothly.",
      definition:
        "Road signs and markings communicate rules, warnings, directions, and hazards before you reach them.",
      purposeBullets: [
        "Regulatory signs tell you what is required or prohibited.",
        "Warning signs alert you to hazards ahead.",
        "Information signs guide direction, services, or road use.",
      ],
      reminder:
        "Do not wait until the last second to read a sign. Slow down early and make a predictable decision.",
    },
    sections: [
      {
        id: "sign-shapes",
        title: "Sign Shapes and Colors",
        subtitle: "Shape and color tell you the sign category.",
        image: roadSignImage,
        imageLabel: "Road sign",
        cards: [
          {
            id: "warning",
            title: "Triangle with Red Border",
            body: "The LTO reviewer identifies this as a warning sign.",
          },
          {
            id: "information",
            title: "Blue and White Rectangle",
            body: "The reviewer identifies this as an information sign.",
          },
          {
            id: "regulatory",
            title: "Circle, Octagon, or Inverted Triangle with Red Border",
            body: "The reviewer identifies these as regulatory signs.",
          },
        ],
      },
      {
        id: "markings",
        title: "Road Markings",
        subtitle: "Lines tell you where traffic moves and when overtaking is allowed.",
        image: trafficRulesImage,
        imageLabel: "Road warning",
        cards: [
          {
            id: "white-lines",
            title: "White Lines",
            body: "The reviewer states that white lines separate traffic going in one direction.",
          },
          {
            id: "yellow-lines",
            title: "Continuous Yellow Line",
            body: "The reviewer states that a continuous yellow line means overtaking is prohibited.",
          },
          {
            id: "arrow",
            title: "Painted Arrow",
            body: "The reviewer states that an arrow painted on the road means follow the direction painted on the road.",
          },
        ],
      },
    ],
    checkpoint: {
      prompt: "A triangle traffic sign with a red border is usually a:",
      choices: [
        { id: "information", label: "Information sign", correct: false },
        { id: "warning", label: "Warning sign", correct: true },
        { id: "parking", label: "Parking sign", correct: false },
      ],
      explanation: "The LTO reviewer identifies a triangle sign with a red border as a warning sign.",
      successTitle: "Correct.",
      successBody: "Triangle signs with red borders warn drivers about hazards ahead.",
    },
  },
  "traffic-rules-law": {
    overview: {
      tag: "Traffic Rules",
      title: "Drive Predictably",
      subtitle: "Rules help every road user understand what you will do next.",
      definition:
        "Traffic rules cover right of way, lane use, signals, parking, speed, and safe responses to road conditions.",
      purposeBullets: [
        "Prevent conflicts at intersections and roundabouts.",
        "Keep lane changes and overtaking predictable.",
        "Match speed and distance to road and weather conditions.",
      ],
      reminder:
        "The LTO reviewer emphasizes that even if you have rights on the road, the safest response is not to force them.",
    },
    sections: [
      {
        id: "right-of-way",
        title: "Right of Way",
        subtitle: "Use signs, road position, and caution.",
        image: trafficRulesImage,
        imageLabel: "Traffic warning",
        cards: [
          {
            id: "stop",
            title: "STOP Sign",
            body: "At an intersection with a STOP sign, stop first and proceed only if there is no danger.",
          },
          {
            id: "roundabout",
            title: "Roundabout",
            body: "The reviewer states that vehicles already in the roundabout have road rights.",
          },
          {
            id: "rights",
            title: "Do Not Force Priority",
            body: "The safest response, even if you have rights on the road, is not to force your rights.",
          },
        ],
      },
      {
        id: "lane-rules",
        title: "Signals and Lanes",
        subtitle: "Give other drivers time to react.",
        image: coneImage,
        imageLabel: "Safety cone",
        cards: [
          {
            id: "turn-signal",
            title: "Before Turning",
            body: "The reviewer says to give a signal not less than 30 meters before turning.",
          },
          {
            id: "lane-change",
            title: "Changing Lanes",
            body: "Signal, check your rear-view mirror, and watch out for oncoming vehicles.",
          },
          {
            id: "slow-lane",
            title: "Slower Driving",
            body: "If driving slower than other vehicles on a highway, stay on the right lane.",
          },
        ],
      },
    ],
    checkpoint: {
      prompt: "In a roundabout, who has road rights?",
      choices: [
        { id: "approaching", label: "Vehicles approaching the roundabout", correct: false },
        { id: "inside", label: "Vehicles already in the roundabout", correct: true },
        { id: "largest", label: "The largest vehicle", correct: false },
      ],
      explanation: "The LTO reviewer states that vehicles in the roundabout have road rights.",
      successTitle: "Correct.",
      successBody: "Yield to vehicles already circulating in the roundabout.",
    },
  },
  "cde-road-traffic-rules": {
    overview: {
      tag: "Road Rules Module",
      title: "Rules on the Road",
      subtitle: "Main module for road and traffic rules in the Philippines.",
      definition:
        "Road and traffic rules explain how drivers should move, yield, park, and respond so that traffic stays predictable and safe.",
      purposeBullets: [
        "Know when overtaking, changing lanes, and turning are allowed.",
        "Apply right-of-way rules at intersections, grades, and special crossings.",
        "Avoid parking, yellow-box, and obstruction violations.",
        "Understand basic vehicle condition and road-crash duties.",
      ],
      reminder:
        "These road-rule notes are written for quick learning. Always follow posted signs and active traffic enforcers.",
    },
    sections: cdeRoadTrafficLearnSections,
    checkpoint: cdeRoadTrafficCheckpoint,
    showSubmoduleList: true,
  },
  "basic-car-care": {
    overview: {
      tag: "Vehicle Care",
      title: "Check Before You Drive",
      subtitle: "A roadworthy vehicle makes every lesson safer.",
      definition:
        "Basic car care means checking the vehicle systems that affect control, visibility, braking, and breakdown risk before driving.",
      purposeBullets: [
        "Tires affect braking and grip, especially in rain.",
        "Lights and signals help other road users understand your actions.",
        "Tools and route planning matter before long trips.",
      ],
      reminder:
        "The LTO reviewer says long-trip preparation includes planning your route and making sure the vehicle is in good condition.",
    },
    sections: [
      {
        id: "pre-drive",
        title: "Pre-Drive Checks",
        subtitle: "Check the basics before leaving.",
        image: careImage,
        imageLabel: "Vehicle maintenance",
        cards: [
          {
            id: "tires",
            title: "Tires",
            body: "Look for low pressure, visible damage, and poor tread before driving.",
          },
          {
            id: "lights",
            title: "Lights and Signals",
            body: "Check headlights, brake lights, turn signals, and hazard lights.",
          },
          {
            id: "mirrors",
            title: "Mirrors",
            body: "The reviewer says drivers should look at side and rear-view mirrors quickly while driving.",
          },
        ],
      },
      {
        id: "long-trip",
        title: "Long Trip Preparation",
        subtitle: "Prevent avoidable problems on the road.",
        image: coneImage,
        imageLabel: "Safety cone",
        cards: [
          {
            id: "tools",
            title: "Necessary Tools",
            body: "The reviewer includes preparing tools that can be used to repair the vehicle.",
          },
          {
            id: "route",
            title: "Route Planning",
            body: "Plan your route and verify the vehicle is running in good condition.",
          },
          {
            id: "fatigue",
            title: "Rest Breaks",
            body: "To combat fatigue and sleepiness during a long road trip, stop every once in a while and rest.",
          },
        ],
      },
    ],
    checkpoint: {
      prompt: "What should you do to fight fatigue during a long road trip?",
      choices: [
        { id: "alcohol", label: "Drink alcohol before driving", correct: false },
        { id: "rest", label: "Stop every once in a while and rest", correct: true },
        { id: "speed", label: "Drive faster to arrive sooner", correct: false },
      ],
      explanation: "The LTO reviewer says to stop every once in a while and rest.",
      successTitle: "Correct.",
      successBody: "Rest breaks keep your reaction time and judgment safer.",
    },
  },
};

export const getLearnTopicById = (topicId: string) =>
  learnTopics.find((topic) => topic.id === topicId);

export const getLearnDetailByTopicId = (topicId: string) =>
  detailsByTopicId[topicId];

export const getLearnSubmoduleById = (topicId: string, moduleId: string) =>
  detailsByTopicId[topicId]?.sections.find((section) => section.id === moduleId);

export const getLearnSubmoduleProgressId = (topicId: string, moduleId: string) =>
  `${topicId}:${moduleId}`;

export const getLearnSubmoduleUnitIds = (submodule: LearnContentSection) => [
  "overview",
  ...submodule.cards.map((card) => card.id),
  "checkpoint",
];

export const getTopicStageCount = () => learnStages.length;
