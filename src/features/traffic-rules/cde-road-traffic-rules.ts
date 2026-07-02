import type { ImageSourcePropType } from "react-native";

import type { LearnCheckpoint, LearnContentSection } from "@/features/learn/data";
import type { QuizQuestion } from "@/features/quiz/data";

const trafficRulesImage = require("../../assets/cute-assets/driving-warning.png") as ImageSourcePropType;
const carImage = require("../../assets/cute-assets/car.png") as ImageSourcePropType;

const turningIntersectionPathImage = require("../../assets/cde-road-traffic-rules/turning-intersection-path.jpg") as ImageSourcePropType;
const meetingTrafficArrowImage = require("../../assets/cde-road-traffic-rules/meeting-traffic-arrow.jpg") as ImageSourcePropType;
const overtakingSafeDistanceImage = require("../../assets/cde-road-traffic-rules/overtaking-safe-distance.jpg") as ImageSourcePropType;
const cuttingAfterOvertakeImage = require("../../assets/cde-road-traffic-rules/cutting-after-overtake.jpg") as ImageSourcePropType;
const overtakenDriverGiveWayImage = require("../../assets/cde-road-traffic-rules/overtaken-driver-give-way.jpg") as ImageSourcePropType;
const overtakingRestrictionLaneImage = require("../../assets/cde-road-traffic-rules/overtaking-restriction-lane.jpg") as ImageSourcePropType;
const visibility500FeetImage = require("../../assets/cde-road-traffic-rules/visibility-500-feet.jpg") as ImageSourcePropType;
const curveRoadWarningImage = require("../../assets/cde-road-traffic-rules/curve-road-warning.jpg") as ImageSourcePropType;
const noOvertakingCurveImage = require("../../assets/cde-road-traffic-rules/no-overtaking-curve.jpg") as ImageSourcePropType;
const intersectionOvertakingDiagramImage = require("../../assets/cde-road-traffic-rules/intersection-overtaking-diagram.jpg") as ImageSourcePropType;
const rightOfWayDifferentDirectionsImage = require("../../assets/cde-road-traffic-rules/right-of-way-different-directions.jpg") as ImageSourcePropType;
const rightOfWayVehiclePositionImage = require("../../assets/cde-road-traffic-rules/right-of-way-vehicle-position.jpg") as ImageSourcePropType;
const nearestCurbPriorityImage = require("../../assets/cde-road-traffic-rules/nearest-curb-priority.jpg") as ImageSourcePropType;
const rightOfWayRuleDiagramImage = require("../../assets/cde-road-traffic-rules/right-of-way-rule-diagram.jpg") as ImageSourcePropType;
const yellowBoxCrossingImage = require("../../assets/cde-road-traffic-rules/yellow-box-crossing.jpg") as ImageSourcePropType;
const yellowBoxProhibitionImage = require("../../assets/cde-road-traffic-rules/yellow-box-prohibition.jpg") as ImageSourcePropType;
const yellowBoxRoadSignImage = require("../../assets/cde-road-traffic-rules/yellow-box-road-sign.jpg") as ImageSourcePropType;
const emergencyVehicleYieldImage = require("../../assets/cde-road-traffic-rules/emergency-vehicle-yield.jpg") as ImageSourcePropType;
const generalTurningRoadImage = require("../../assets/cde-road-traffic-rules/general-turning-road.jpg") as ImageSourcePropType;
const busPujStopNoParkingImage = require("../../assets/cde-road-traffic-rules/bus-puj-stop-no-parking.jpg") as ImageSourcePropType;
const fireHydrantNoParkingImage = require("../../assets/cde-road-traffic-rules/fire-hydrant-no-parking.jpg") as ImageSourcePropType;
const doNotBlockIntersectionImage = require("../../assets/cde-road-traffic-rules/do-not-block-intersection.jpg") as ImageSourcePropType;
const parkedCarRoadsideImage = require("../../assets/cde-road-traffic-rules/parked-car-roadside.jpg") as ImageSourcePropType;
const doubleParkingRoadsideImage = require("../../assets/cde-road-traffic-rules/double-parking-roadside.jpg") as ImageSourcePropType;
const blockedDrivewayParkingImage = require("../../assets/cde-road-traffic-rules/blocked-driveway-parking.jpg") as ImageSourcePropType;
const hitchingTruckMotorcycleImage = require("../../assets/cde-road-traffic-rules/hitching-truck-motorcycle.jpg") as ImageSourcePropType;
const towedMotorcycleImage = require("../../assets/cde-road-traffic-rules/towed-motorcycle.jpg") as ImageSourcePropType;
const againstTrafficCrosswalkImage = require("../../assets/cde-road-traffic-rules/against-traffic-crosswalk.jpg") as ImageSourcePropType;
const redFlagCarLoadImage = require("../../assets/cde-road-traffic-rules/red-flag-car-load.jpg") as ImageSourcePropType;
const redFlagTruckLoadImage = require("../../assets/cde-road-traffic-rules/red-flag-truck-load.jpg") as ImageSourcePropType;
const redLightProjectingLoadImage = require("../../assets/cde-road-traffic-rules/red-light-projecting-load.jpg") as ImageSourcePropType;
const vehicleMufflerImage = require("../../assets/cde-road-traffic-rules/vehicle-muffler.jpg") as ImageSourcePropType;
const bulldozerImage = require("../../assets/cde-road-traffic-rules/bulldozer.jpg") as ImageSourcePropType;
const backhoeImage = require("../../assets/cde-road-traffic-rules/backhoe.jpg") as ImageSourcePropType;
const rollersImage = require("../../assets/cde-road-traffic-rules/rollers.jpg") as ImageSourcePropType;
const craneImage = require("../../assets/cde-road-traffic-rules/crane.jpg") as ImageSourcePropType;
const roadCrashTrafficImage = require("../../assets/cde-road-traffic-rules/road-crash-traffic.jpg") as ImageSourcePropType;
const roadCrashSceneImage = require("../../assets/cde-road-traffic-rules/road-crash-scene.jpg") as ImageSourcePropType;

export const cdeRoadTrafficLearnSections: LearnContentSection[] = [
  {
    id: "rules-on-turning-and-overtaking",
    title: "RULES ON TURNING AND OVERTAKING",
    subtitle: "Keep your path predictable when crossing or sharing traffic flow.",
    image: turningIntersectionPathImage,
    imageLabel: "Intersection turning path",
    images: [
      {
        id: "turning-intersection-path",
        image: turningIntersectionPathImage,
        imageLabel: "Intersection path for a left turn",
      },
      {
        id: "meeting-traffic-arrow",
        image: meetingTrafficArrowImage,
        imageLabel: "Vehicles meeting on the road",
      },
      {
        id: "overtaking-safe-distance",
        image: overtakingSafeDistanceImage,
        imageLabel: "Safe distance before overtaking",
      },
      {
        id: "cutting-after-overtake",
        image: cuttingAfterOvertakeImage,
        imageLabel: "Unsafe cutting after overtaking",
      },
      {
        id: "overtaken-driver-give-way",
        image: overtakenDriverGiveWayImage,
        imageLabel: "Vehicle giving way to overtaking traffic",
      },
      {
        id: "overtaking-restriction-lane",
        image: overtakingRestrictionLaneImage,
        imageLabel: "Overtaking lane restriction diagram",
      },
      {
        id: "visibility-500-feet",
        image: visibility500FeetImage,
        imageLabel: "Visibility distance for overtaking",
      },
      {
        id: "curve-road-warning",
        image: curveRoadWarningImage,
        imageLabel: "Curve road with limited visibility",
      },
      {
        id: "no-overtaking-curve",
        image: noOvertakingCurveImage,
        imageLabel: "No overtaking on a curve",
      },
      {
        id: "intersection-overtaking-diagram",
        image: intersectionOvertakingDiagramImage,
        imageLabel: "No overtaking at an intersection",
      },
    ],
    cards: [
      {
        id: "left-turn-center",
        image: turningIntersectionPathImage,
        imageLabel: "Intersection path for a left turn",
        title: "Left Turns at Intersections",
        body: "When turning left from one road to another, guide the vehicle to the right side of the intersection center before completing the turn.",
      },
      {
        id: "meet-oncoming",
        image: meetingTrafficArrowImage,
        imageLabel: "Vehicles meeting on the road",
        title: "Meeting Oncoming Vehicles",
        body: "When another vehicle is coming toward you, keep right and give enough side clearance.",
      },
      {
        id: "overtake-left",
        image: overtakingSafeDistanceImage,
        imageLabel: "Safe distance before overtaking",
        title: "Overtake on the Left",
        body: "A vehicle overtaking another vehicle going the same direction should pass on the left at a safe distance.",
      },
      {
        id: "return-clear",
        image: cuttingAfterOvertakeImage,
        imageLabel: "Unsafe cutting after overtaking",
        title: "Do Not Cut Back Early",
        body: "After overtaking, return to the right side only when your vehicle is safely clear of the vehicle you passed.",
      },
      {
        id: "give-way",
        image: overtakenDriverGiveWayImage,
        imageLabel: "Vehicle giving way to overtaking traffic",
        title: "If You Are Being Overtaken",
        body: "Give way when it is safe and do not speed up until the overtaking vehicle has completely passed.",
      },
      {
        id: "visible-free",
        image: overtakingRestrictionLaneImage,
        imageLabel: "Overtaking lane restriction diagram",
        title: "Clear View Required",
        body: "Do not move left of the center line to overtake unless that side is clearly visible and free from oncoming traffic for a safe distance.",
      },
      {
        id: "no-blind-passing",
        image: visibility500FeetImage,
        imageLabel: "Visibility distance for overtaking",
        title: "No Passing on Blind Spots",
        body: "Avoid overtaking near a crest, curve, or any place where your forward view is blocked.",
      },
      {
        id: "curves-limit-visibility",
        image: curveRoadWarningImage,
        imageLabel: "Curve road with limited visibility",
        title: "Curves Limit Your View",
        body: "Treat curves and crests as danger areas. If you cannot see far enough ahead, stay in your lane and wait for a safer passing area.",
      },
      {
        id: "no-overtaking-on-curves",
        image: noOvertakingCurveImage,
        imageLabel: "No overtaking on a curve",
        title: "No Overtaking on Curves",
        body: "Do not pass another vehicle on a curve when your forward view is limited or when the maneuver can place you in the path of oncoming traffic.",
      },
      {
        id: "no-crossing-intersection",
        image: intersectionOvertakingDiagramImage,
        imageLabel: "No overtaking at an intersection",
        title: "No Passing at Risk Points",
        body: "Do not overtake at railway grade crossings or intersections, except where the road has two or more lanes moving in the same direction and passing is safe.",
      },
    ],
  },
  {
    id: "changing-of-lanes",
    title: "CHANGING OF LANES",
    subtitle: "A lane change is a decision, not a reflex.",
    image: carImage,
    imageLabel: "Green car",
    cards: [
      {
        id: "safe-only",
        image: carImage,
        imageLabel: "Green car",
        title: "Change Only When Safe",
        body: "Do not change lanes if the movement can create danger or surprise another road user.",
      },
      {
        id: "right-pass-left-turn",
        image: generalTurningRoadImage,
        imageLabel: "General turning lane diagram",
        title: "Passing on the Right",
        body: "Passing on the right may be allowed when the vehicle ahead is clearly turning left and there is enough safe space.",
      },
      {
        id: "multiple-lanes",
        image: overtakingRestrictionLaneImage,
        imageLabel: "Multiple same-direction lanes",
        title: "Same-Direction Lanes",
        body: "Passing or changing lanes on the right can be allowed on roads with two or more lanes going in the same direction, if it is safe.",
      },
    ],
  },
  {
    id: "right-of-way-rule",
    title: "RIGHT-OF-WAY RULE",
    subtitle: "Priority rules reduce conflict, but caution still comes first.",
    image: rightOfWayDifferentDirectionsImage,
    imageLabel: "Right-of-way vehicle diagram",
    images: [
      {
        id: "right-of-way-different-directions",
        image: rightOfWayDifferentDirectionsImage,
        imageLabel: "Right of way when vehicles approach from different directions",
      },
      {
        id: "right-of-way-vehicle-position",
        image: rightOfWayVehiclePositionImage,
        imageLabel: "Right of way based on vehicle position",
      },
      {
        id: "nearest-curb-priority",
        image: nearestCurbPriorityImage,
        imageLabel: "Nearest curb priority diagram",
      },
      {
        id: "right-of-way-rule-diagram",
        image: rightOfWayRuleDiagramImage,
        imageLabel: "Right-of-way rule diagram",
      },
      {
        id: "emergency-vehicle-yield",
        image: emergencyVehicleYieldImage,
        imageLabel: "Emergency vehicle right of way",
      },
    ],
    cards: [
      {
        id: "vehicle-right",
        image: rightOfWayDifferentDirectionsImage,
        imageLabel: "Right of way when vehicles approach from different directions",
        title: "Different Directions",
        body: "When vehicles approach from different directions at the same time, the vehicle on the right has priority.",
      },
      {
        id: "nearest-curb",
        image: nearestCurbPriorityImage,
        imageLabel: "Nearest curb priority diagram",
        title: "Same Direction",
        body: "When vehicles are going the same direction and priority is unclear, the vehicle nearest the curb goes first.",
      },
      {
        id: "inside-intersection",
        image: rightOfWayRuleDiagramImage,
        imageLabel: "Right-of-way rule diagram",
        title: "Already Inside",
        body: "Vehicles already inside the intersection have priority over vehicles that are still entering.",
      },
      {
        id: "uphill",
        image: rightOfWayVehiclePositionImage,
        imageLabel: "Right of way based on vehicle position",
        title: "Uphill Priority",
        body: "On a grade, give priority to the vehicle going uphill.",
      },
      {
        id: "through-highway-railroad",
        image: yellowBoxCrossingImage,
        imageLabel: "Stop before traversing a crossing",
        title: "Through Highways and Railroad Crossings",
        body: "Before traversing a through highway or railroad crossing, stop when required. If no hazard is apparent, proceed only at a very slow and careful speed.",
      },
      {
        id: "emergency",
        image: emergencyVehicleYieldImage,
        imageLabel: "Emergency vehicle right of way",
        title: "Emergency Vehicles",
        body: "Yield to police vehicles, fire trucks, and ambulances on official duty when they give an audible warning signal.",
      },
    ],
  },
  {
    id: "yellow-box-prohibitions",
    title: "YELLOW BOX PROHIBITIONS",
    subtitle: "Never enter a marked box unless you can clear it.",
    image: yellowBoxRoadSignImage,
    imageLabel: "Yellow box road sign",
    images: [
      {
        id: "yellow-box-crossing",
        image: yellowBoxCrossingImage,
        imageLabel: "Yellow box crossing rules",
      },
      {
        id: "yellow-box-prohibition",
        image: yellowBoxProhibitionImage,
        imageLabel: "Yellow box prohibited movements",
      },
      {
        id: "yellow-box-road-sign",
        image: yellowBoxRoadSignImage,
        imageLabel: "Do not block intersection sign",
      },
    ],
    cards: [
      {
        id: "do-not-block",
        image: yellowBoxCrossingImage,
        imageLabel: "Yellow box crossing rules",
        title: "Do Not Block Intersections",
        body: "Do not stop in the yellow box, even while turning, if your exit is not clear.",
      },
      {
        id: "no-u-turn",
        image: yellowBoxProhibitionImage,
        imageLabel: "Yellow box prohibited movements",
        title: "No U-Turn in the Box",
        body: "Do not make a U-turn inside the yellow box.",
      },
      {
        id: "yield-inside",
        image: yellowBoxProhibitionImage,
        imageLabel: "Yield inside yellow box",
        title: "Yield to Vehicles Inside",
        body: "Give way to road users already inside the yellow box area.",
      },
      {
        id: "no-loading-chatting",
        image: yellowBoxRoadSignImage,
        imageLabel: "Do not block intersection sign",
        title: "No Loading or Stopping",
        body: "Do not load or unload passengers or goods, park, or stop for conversation in the yellow box area.",
      },
    ],
  },
  {
    id: "general-rules-on-turning",
    title: "GENERAL RULES ON TURNING",
    subtitle: "Use the correct position before turning so nearby drivers understand your path.",
    image: generalTurningRoadImage,
    imageLabel: "General road turning diagram",
    images: [
      {
        id: "general-turning-road",
        image: generalTurningRoadImage,
        imageLabel: "General turning lane diagram",
      },
    ],
    cards: [
      {
        id: "position-before-turn",
        image: generalTurningRoadImage,
        imageLabel: "General turning lane diagram",
        title: "Prepare Before the Turn",
        body: "Move into the proper lane early, signal your intention, and check traffic before crossing another vehicle's path.",
      },
      {
        id: "turn-predictably",
        image: turningIntersectionPathImage,
        imageLabel: "Intersection path for a turn",
        title: "Keep the Turn Predictable",
        body: "Avoid sudden swerves or last-second turns. A clear turning path gives other road users time to react.",
      },
    ],
  },
  {
    id: "parking",
    title: "PARKING",
    subtitle: "A parked vehicle should never become a hazard.",
    image: doNotBlockIntersectionImage,
    imageLabel: "Do not block intersection sign",
    images: [
      {
        id: "bus-puj-stop-no-parking",
        image: busPujStopNoParkingImage,
        imageLabel: "Bus and PUJ stop no parking sign",
      },
      {
        id: "fire-hydrant-no-parking",
        image: fireHydrantNoParkingImage,
        imageLabel: "No parking fire hydrant sign",
      },
      {
        id: "do-not-block-intersection",
        image: doNotBlockIntersectionImage,
        imageLabel: "Do not block intersection sign",
      },
      {
        id: "parked-car-roadside",
        image: parkedCarRoadsideImage,
        imageLabel: "Car parked along the road",
      },
      {
        id: "double-parking-roadside",
        image: doubleParkingRoadsideImage,
        imageLabel: "Double parking on a roadside",
      },
      {
        id: "blocked-driveway-parking",
        image: blockedDrivewayParkingImage,
        imageLabel: "Vehicle blocking a driveway",
      },
    ],
    cards: [
      {
        id: "no-intersection-crosswalk",
        image: doNotBlockIntersectionImage,
        imageLabel: "Do not block intersection sign",
        title: "Keep Intersections and Crosswalks Clear",
        body: "Parking is prohibited in intersections, on crosswalks, and within 6 meters of an intersection.",
      },
      {
        id: "driveway-hydrant",
        image: fireHydrantNoParkingImage,
        imageLabel: "No parking near fire hydrant sign",
        title: "Do Not Block Access",
        body: "Do not park within 4 meters of a driveway entrance, within 4 meters of a fire hydrant, or in front of a private driveway.",
      },
      {
        id: "double-parking",
        image: doubleParkingRoadsideImage,
        imageLabel: "Double parking on a roadside",
        title: "No Double Parking",
        body: "Do not park on the roadway side of another stopped or parked vehicle at the curb or road edge.",
      },
      {
        id: "posted-prohibition",
        image: busPujStopNoParkingImage,
        imageLabel: "Bus and PUJ stop no parking sign",
        title: "Follow Posted Signs",
        body: "Do not park where prohibition signs are installed.",
      },
      {
        id: "sidewalks-obstruction",
        image: blockedDrivewayParkingImage,
        imageLabel: "Vehicle blocking a driveway",
        title: "Do Not Obstruct Traffic",
        body: "Do not drive or park on sidewalks, paths, or alleys not intended for vehicles, and do not block traffic while loading or unloading.",
      },
    ],
  },
  {
    id: "hitching-and-driving-against-traffic",
    title: "HITCHING and DRIVING AGAINST TRAFFIC",
    subtitle: "Unsafe attachments and wrong-way movement put vulnerable road users at risk.",
    image: againstTrafficCrosswalkImage,
    imageLabel: "Wrong-way traffic near a crosswalk",
    images: [
      {
        id: "hitching-truck-motorcycle",
        image: hitchingTruckMotorcycleImage,
        imageLabel: "Unsafe hitching near a truck",
      },
      {
        id: "towed-motorcycle",
        image: towedMotorcycleImage,
        imageLabel: "Unsafe towing or hitching situation",
      },
      {
        id: "against-traffic-crosswalk",
        image: againstTrafficCrosswalkImage,
        imageLabel: "Driving against traffic near a crosswalk",
      },
    ],
    cards: [
      {
        id: "hitching-prohibited",
        image: hitchingTruckMotorcycleImage,
        imageLabel: "Unsafe hitching near a truck",
        title: "Hitching Is Prohibited",
        body: "Do not hitch to a motor vehicle or allow a person, bicycle, motorcycle, tricycle, or skater to hitch onto a motor vehicle.",
      },
      {
        id: "unsafe-towing",
        image: towedMotorcycleImage,
        imageLabel: "Unsafe towing or hitching situation",
        title: "Do Not Tow by Holding On",
        body: "A rider or pedestrian should not hold onto a moving vehicle for towing or support. This can pull the person into traffic or under the vehicle.",
      },
      {
        id: "wrong-way-prohibited",
        image: againstTrafficCrosswalkImage,
        imageLabel: "Driving against traffic near a crosswalk",
        title: "Do Not Drive Against Traffic",
        body: "Wrong-way driving includes failing to keep right when meeting vehicles or road users coming toward you.",
      },
    ],
  },
  {
    id: "use-of-red-flags",
    title: "USE OF RED FLAGS",
    subtitle: "Mark projecting loads clearly so other road users can see the hazard.",
    image: redFlagTruckLoadImage,
    imageLabel: "Red flag on a projecting vehicle load",
    images: [
      {
        id: "red-flag-car-load",
        image: redFlagCarLoadImage,
        imageLabel: "Red flag marker on a car load",
      },
      {
        id: "red-flag-truck-load",
        image: redFlagTruckLoadImage,
        imageLabel: "Red flag marker on a truck load",
      },
      {
        id: "red-light-projecting-load",
        image: redLightProjectingLoadImage,
        imageLabel: "Red light for projecting load",
      },
    ],
    cards: [
      {
        id: "projecting-load",
        image: redFlagTruckLoadImage,
        imageLabel: "Red flag marker on a truck load",
        title: "Use a Red Flag",
        body: "If a load extends more than 1 meter beyond the vehicle body, place a red flag at least 30 cm long and wide at the projecting end.",
      },
      {
        id: "projecting-load-on-small-vehicles",
        image: redFlagCarLoadImage,
        imageLabel: "Red flag marker on a car load",
        title: "Mark Every Projecting Load",
        body: "The same warning principle applies even on smaller vehicles: make any projecting load visible so following drivers can keep a safe distance.",
      },
      {
        id: "projecting-load-lights",
        image: redLightProjectingLoadImage,
        imageLabel: "Red light for projecting load",
        title: "Use Lights at Night or Poor Visibility",
        body: "From after sunset until before sunrise, or when weather reduces visibility, the required red lights should be switched on.",
      },
    ],
  },
  {
    id: "mufflers",
    title: "Mufflers",
    subtitle: "Engine noise should be controlled, especially in populated areas.",
    image: vehicleMufflerImage,
    imageLabel: "Vehicle muffler",
    images: [
      {
        id: "vehicle-muffler",
        image: vehicleMufflerImage,
        imageLabel: "Vehicle muffler",
      },
    ],
    cards: [
      {
        id: "muffler",
        image: vehicleMufflerImage,
        imageLabel: "Vehicle muffler",
        title: "Mufflers",
        body: "A vehicle with an internal-combustion engine must have a muffler and should not create excessive noise in populated areas.",
      },
    ],
  },
  {
    id: "tires-of-motor-vehicles",
    title: "Tires of motor vehicles",
    subtitle: "Tires should not damage public roads or expose metal rims to the surface.",
    image: bulldozerImage,
    imageLabel: "Bulldozer",
    images: [
      {
        id: "bulldozer",
        image: bulldozerImage,
        imageLabel: "Bulldozer",
      },
      {
        id: "backhoe",
        image: backhoeImage,
        imageLabel: "Backhoe",
      },
      {
        id: "rollers",
        image: rollersImage,
        imageLabel: "Road roller",
      },
      {
        id: "crane",
        image: craneImage,
        imageLabel: "Crane",
      },
    ],
    cards: [
      {
        id: "tires",
        image: bulldozerImage,
        imageLabel: "Heavy equipment tire example",
        title: "Metal Tires Are Not Allowed",
        body: "Metallic tires are not allowed on public highways. Solid tires must be thick enough to keep the metal rim from touching the road.",
      },
      {
        id: "heavy-equipment-road-use",
        image: backhoeImage,
        imageLabel: "Backhoe",
        title: "Protect the Road Surface",
        body: "Heavy equipment must not damage public roads. When equipment needs to travel, its tires or tracks should not expose metal that can cut or break the pavement.",
      },
      {
        id: "solid-tire-clearance",
        image: rollersImage,
        imageLabel: "Road roller",
        title: "Solid Tire Clearance",
        body: "For vehicles with solid tires, the tire material should be thick enough so the metal rim never contacts the highway surface.",
      },
      {
        id: "road-machinery-caution",
        image: craneImage,
        imageLabel: "Crane",
        title: "Move Road Machinery Carefully",
        body: "Road machinery and heavy vehicles should be moved with extra care because their weight and tire condition can create hazards or road damage.",
      },
    ],
  },
  {
    id: "in-case-of-a-road-crash",
    title: "IN CASE OF A ROAD CRASH",
    subtitle: "A driver involved in a crash has duties before leaving the scene.",
    image: roadCrashTrafficImage,
    imageLabel: "Road crash traffic scene",
    images: [
      {
        id: "road-crash-traffic",
        image: roadCrashTrafficImage,
        imageLabel: "Road crash traffic",
      },
      {
        id: "road-crash-scene",
        image: roadCrashSceneImage,
        imageLabel: "Road crash street scene",
      },
    ],
    cards: [
      {
        id: "crash-duty",
        image: roadCrashTrafficImage,
        imageLabel: "Road crash traffic",
        title: "Identify Yourself",
        body: "A driver involved in a crash should show the driver's license, give true name and address, and provide vehicle owner details.",
      },
      {
        id: "assist-victim",
        image: roadCrashSceneImage,
        imageLabel: "Road crash street scene",
        title: "Help the Victim",
        body: "Do not leave the scene without helping the victim when you are able to do so safely.",
      },
      {
        id: "leaving-scene",
        image: roadCrashTrafficImage,
        imageLabel: "Road crash traffic",
        title: "Valid Reasons to Leave",
        body: "Leaving may be justified only when the driver is in serious danger, reports to the nearest law officer, or must get medical help for the victim.",
      },
    ],
  },
  {
    id: "other-driving-rules-ra-4136",
    title: "OTHER DRIVING RULES of R.A. No 4136",
    subtitle: "Keep roads passable and use the required vehicle lights.",
    image: trafficRulesImage,
    imageLabel: "Traffic warning",
    cards: [
      {
        id: "sidewalks-obstruction",
        image: againstTrafficCrosswalkImage,
        imageLabel: "Road obstruction near a crosswalk",
        title: "Do Not Use Sidewalks as Roadway",
        body: "Do not drive or park on sidewalks, paths, or alleys that are not intended for vehicle traffic or parking.",
      },
      {
        id: "loading-obstruction",
        image: parkedCarRoadsideImage,
        imageLabel: "Vehicle stopping near roadside",
        title: "Do Not Block Traffic While Loading",
        body: "Do not obstruct the free passage of vehicles while discharging passengers, taking on passengers, loading freight, or unloading freight.",
      },
      {
        id: "vehicle-light-colors",
        image: redLightProjectingLoadImage,
        imageLabel: "Vehicle rear light",
        title: "Required Light Colors",
        body: "Headlights should be white or yellowish white, taillights red, plate light white, and brake lights bright red.",
      },
    ],
  },
];

export const cdeRoadTrafficCheckpoint: LearnCheckpoint = {
  prompt: "You are overtaking another vehicle. When can you return to the right side of the road?",
  choices: [
    {
      id: "anytime",
      label: "As soon as my front bumper is ahead.",
      correct: false,
    },
    {
      id: "safely-clear",
      label: "Only after my vehicle is safely clear of the vehicle I passed.",
      correct: true,
    },
    {
      id: "when-horn",
      label: "Only after the other driver honks.",
      correct: false,
    },
  ],
  explanation:
    "Do not cut back after overtaking. Return right only when your vehicle is safely clear.",
  successTitle: "Correct.",
  successBody:
    "Safe passing includes the return to lane. Give the overtaken vehicle enough space before moving back.",
};

export const cdeRoadTrafficQuizQuestions: QuizQuestion[] = [
  {
    id: "cde-road-rules-001",
    image: turningIntersectionPathImage,
    imageLabel: "Intersection turning path",
    prompt: "When turning left from one highway to another, where should you guide the vehicle?",
    answerId: "right-of-center",
    choices: [
      { id: "left-of-center", label: "Left of the intersection center" },
      { id: "right-of-center", label: "To the right of the intersection center" },
      { id: "anywhere-clear", label: "Anywhere as long as the road looks clear" },
    ],
    explanation:
      "For a left turn from one road to another, keep to the right side of the intersection center before completing the turn.",
  },
  {
    id: "cde-road-rules-002",
    prompt: "A driver overtaking a vehicle moving in the same direction should usually pass on which side?",
    answerId: "left",
    choices: [
      { id: "left", label: "On the left at a safe distance" },
      { id: "right", label: "On the right in every situation" },
      { id: "shoulder", label: "On the shoulder" },
    ],
    explanation:
      "Overtaking a vehicle going the same direction should be done on the left at a safe distance.",
  },
  {
    id: "cde-road-rules-003",
    image: cuttingAfterOvertakeImage,
    imageLabel: "Unsafe cutting after overtaking",
    prompt: "After passing another vehicle, when may you return to the right side?",
    answerId: "clear",
    choices: [
      { id: "clear", label: "When safely clear of the overtaken vehicle" },
      { id: "front-ahead", label: "As soon as your front bumper is ahead" },
      { id: "never", label: "Only at the next intersection" },
    ],
    explanation:
      "Do not cut back after overtaking. Move right only when there is safe clearance.",
  },
  {
    id: "cde-road-rules-004",
    prompt: "If another vehicle is overtaking you and passing safely, what should you do?",
    answerId: "give-way",
    choices: [
      { id: "speed-up", label: "Speed up so it cannot pass" },
      { id: "give-way", label: "Give way and do not increase speed until it has passed" },
      { id: "block-lane", label: "Move across the lane to block it" },
    ],
    explanation:
      "A driver being overtaken should give way when safe and should not increase speed until the overtaking vehicle has completely passed.",
  },
  {
    id: "cde-road-rules-005",
    image: visibility500FeetImage,
    imageLabel: "Visibility distance for overtaking",
    prompt: "When is overtaking prohibited because the driver cannot see enough road ahead?",
    answerId: "crest-curve",
    choices: [
      { id: "clear-straight", label: "On a clear straight road" },
      { id: "crest-curve", label: "Near a crest or curve with an obstructed view" },
      { id: "multi-lane", label: "On a multi-lane road with clear lanes" },
    ],
    explanation:
      "Overtaking near a crest or curve is unsafe when the driver's view ahead is obstructed.",
  },
  {
    id: "cde-road-rules-006",
    prompt: "Which place should you avoid overtaking at?",
    answerId: "railway",
    choices: [
      { id: "railway", label: "A railway grade crossing" },
      { id: "wide-lane", label: "A wide lane with clear visibility" },
      { id: "marked-passing", label: "A lawful passing lane" },
    ],
    explanation:
      "Do not overtake another vehicle at a railway grade crossing.",
  },
  {
    id: "cde-road-rules-007",
    image: rightOfWayDifferentDirectionsImage,
    imageLabel: "Right of way at an intersection",
    prompt: "When vehicles approach an uncontrolled intersection from different directions, who has priority?",
    answerId: "right",
    choices: [
      { id: "left", label: "The vehicle on the left" },
      { id: "right", label: "The vehicle on the right" },
      { id: "larger", label: "The larger vehicle" },
    ],
    explanation:
      "When vehicles come from different directions at the same time, priority goes to the vehicle on the right.",
  },
  {
    id: "cde-road-rules-008",
    prompt: "When vehicles are moving in the same direction and priority is unclear, which vehicle goes first?",
    answerId: "curb",
    choices: [
      { id: "center", label: "The vehicle nearest the center line" },
      { id: "curb", label: "The vehicle nearest the curb" },
      { id: "fastest", label: "The fastest vehicle" },
    ],
    explanation:
      "When vehicles are going the same direction and priority is unclear, the vehicle nearest the curb has priority.",
  },
  {
    id: "cde-road-rules-009",
    prompt: "At an intersection, which vehicle has priority?",
    answerId: "inside",
    choices: [
      { id: "inside", label: "The vehicle already inside the intersection" },
      { id: "entering", label: "The vehicle still entering the intersection" },
      { id: "behind", label: "The vehicle behind everyone else" },
    ],
    explanation:
      "Vehicles already inside the intersection have priority over vehicles that are still entering.",
  },
  {
    id: "cde-road-rules-010",
    prompt: "On a grade, which vehicle deserves priority?",
    answerId: "uphill",
    choices: [
      { id: "downhill", label: "The vehicle going downhill" },
      { id: "uphill", label: "The vehicle going uphill" },
      { id: "parked", label: "The parked vehicle" },
    ],
    explanation:
      "On a grade, priority goes to the vehicle going uphill.",
  },
  {
    id: "cde-road-rules-011",
    prompt: "What should a driver do before crossing a through highway or railroad crossing?",
    answerId: "slow-careful",
    choices: [
      { id: "slow-careful", label: "Stop when required, or proceed very slowly only when clearly safe" },
      { id: "speed", label: "Speed up to cross quickly" },
      { id: "honk", label: "Honk and continue without slowing" },
    ],
    explanation:
      "Before traversing a through highway or railroad crossing, stop when required. If no hazard is apparent, proceed only at a very slow and careful speed.",
  },
  {
    id: "cde-road-rules-012",
    image: hitchingTruckMotorcycleImage,
    imageLabel: "Hitching near a moving vehicle",
    prompt: "Which action is prohibited around moving motor vehicles?",
    answerId: "hitching",
    choices: [
      { id: "hitching", label: "Hitching onto a motor vehicle or allowing someone to hitch" },
      { id: "safe-signal", label: "Signaling before changing lanes" },
      { id: "yielding", label: "Yielding to an emergency vehicle" },
    ],
    explanation:
      "Hitching or allowing a person, bicycle, motorcycle, tricycle, or skater to hitch onto a motor vehicle is prohibited.",
  },
  {
    id: "cde-road-rules-013",
    image: yellowBoxRoadSignImage,
    imageLabel: "Do not block intersection sign",
    prompt: "What is the correct behavior in a yellow box intersection?",
    answerId: "clear-exit",
    choices: [
      { id: "wait-inside", label: "Enter and wait inside if traffic is slow" },
      { id: "clear-exit", label: "Enter only when you can clear the box" },
      { id: "u-turn", label: "Use it for U-turns" },
    ],
    explanation:
      "Do not block the yellow box, even when turning. Enter only when your exit is clear.",
  },
  {
    id: "cde-road-rules-014",
    image: doNotBlockIntersectionImage,
    imageLabel: "Do not block intersection sign",
    prompt: "Parking is prohibited within how many meters of an intersection?",
    answerId: "six",
    choices: [
      { id: "two", label: "2 meters" },
      { id: "four", label: "4 meters" },
      { id: "six", label: "6 meters" },
    ],
    explanation:
      "Parking within 6 meters of an intersection is prohibited.",
  },
  {
    id: "cde-road-rules-015",
    image: redFlagTruckLoadImage,
    imageLabel: "Red flag on projecting load",
    prompt: "A load extends more than 1 meter beyond the vehicle body. What should be displayed at the projecting end?",
    answerId: "red-flag",
    choices: [
      { id: "red-flag", label: "A red flag, and red lights when required" },
      { id: "white-cloth", label: "A white cloth only" },
      { id: "nothing", label: "Nothing if the driver is careful" },
    ],
    explanation:
      "A projecting load beyond 1 meter needs a red flag at the projecting end. Red lights are required at night or in poor visibility.",
  },
  {
    id: "cde-road-rules-016",
    image: roadCrashTrafficImage,
    imageLabel: "Road crash traffic",
    prompt: "After a road crash, when may a driver leave the scene before directly helping the victim?",
    answerId: "valid-exception",
    choices: [
      { id: "minor-delay", label: "When the driver is late" },
      { id: "valid-exception", label: "When in serious danger, reporting to law enforcement, or getting medical help" },
      { id: "vehicle-damage", label: "When the vehicle has damage" },
    ],
    explanation:
      "The listed exceptions are serious personal danger, reporting the crash to the nearest law officer, or summoning medical help.",
  },
  {
    id: "cde-road-rules-017",
    prompt: "Which light-color pairing matches the road-rule lesson?",
    answerId: "tail-red",
    choices: [
      { id: "tail-red", label: "Taillights red and plate light white" },
      { id: "tail-white", label: "Taillights white and brake lights blue" },
      { id: "plate-red", label: "Plate light red and headlights green" },
    ],
    explanation:
      "Taillights should be red, the plate light should be white, and brake lights should be bright red.",
  },
  {
    id: "cde-road-rules-018",
    image: againstTrafficCrosswalkImage,
    imageLabel: "Driving against traffic near a crosswalk",
    prompt: "Which behavior is considered driving against traffic?",
    answerId: "fail-right",
    choices: [
      { id: "signal", label: "Signaling before a turn" },
      { id: "fail-right", label: "Failing to keep right when meeting oncoming road users" },
      { id: "yield", label: "Yielding to vehicles already in an intersection" },
    ],
    explanation:
      "Driving against traffic includes failing to pass to the right when meeting people or vehicles coming toward you.",
  },
  {
    id: "cde-road-rules-019",
    image: emergencyVehicleYieldImage,
    imageLabel: "Emergency vehicles",
    prompt: "What should you do when an ambulance, fire truck, or police vehicle on official duty gives an audible warning signal?",
    answerId: "yield",
    choices: [
      { id: "yield", label: "Yield the right of way safely" },
      { id: "race", label: "Speed up to stay ahead" },
      { id: "ignore", label: "Ignore it if your lane is moving" },
    ],
    explanation:
      "Emergency vehicles on official duty should be given the right of way when they signal their approach.",
  },
  {
    id: "cde-road-rules-020",
    image: fireHydrantNoParkingImage,
    imageLabel: "No parking near fire hydrant sign",
    prompt: "Parking is prohibited within how many meters of a fire hydrant?",
    answerId: "four",
    choices: [
      { id: "two", label: "2 meters" },
      { id: "four", label: "4 meters" },
      { id: "ten", label: "10 meters" },
    ],
    explanation:
      "Do not park within 4 meters of a fire hydrant.",
  },
  {
    id: "cde-road-rules-021",
    image: doubleParkingRoadsideImage,
    imageLabel: "Double parking on the roadside",
    prompt: "Which parking behavior is prohibited?",
    answerId: "double-park",
    choices: [
      { id: "marked-bay", label: "Parking inside a marked legal parking bay" },
      { id: "double-park", label: "Parking on the roadway side of a vehicle stopped at the curb" },
      { id: "legal-lot", label: "Parking in an allowed parking lot" },
    ],
    explanation:
      "Parking beside another stopped or parked vehicle at the curb is prohibited because it obstructs the roadway.",
  },
  {
    id: "cde-road-rules-022",
    prompt: "What should a driver avoid while loading or unloading passengers or freight?",
    answerId: "obstruct",
    choices: [
      { id: "obstruct", label: "Obstructing the free passage of other vehicles" },
      { id: "signal", label: "Using a signal when moving back into traffic" },
      { id: "check", label: "Checking mirrors before moving" },
    ],
    explanation:
      "Drivers should not block the free passage of other vehicles while loading or unloading.",
  },
  {
    id: "cde-road-rules-023",
    image: vehicleMufflerImage,
    imageLabel: "Vehicle muffler",
    prompt: "What is required for a vehicle with an internal-combustion engine?",
    answerId: "muffler",
    choices: [
      { id: "muffler", label: "A muffler that prevents excessive noise" },
      { id: "open-pipe", label: "An open exhaust pipe in populated areas" },
      { id: "none", label: "No exhaust equipment requirement" },
    ],
    explanation:
      "Motor vehicles with internal-combustion engines should have a muffler and should not create excessive noise in populated areas.",
  },
  {
    id: "cde-road-rules-024",
    image: redFlagCarLoadImage,
    imageLabel: "Red flag on a projecting load",
    prompt: "What is the minimum size reminder for the red flag on a projecting load?",
    answerId: "thirty",
    choices: [
      { id: "ten", label: "10 cm long and wide" },
      { id: "thirty", label: "30 cm long and wide" },
      { id: "sixty", label: "60 cm long and wide" },
    ],
    explanation:
      "The red flag for a projecting load should be at least 30 cm in length and width.",
  },
  {
    id: "cde-road-rules-025",
    prompt: "What is the listed allowable height reminder for top clearance lights?",
    answerId: "ten-cm",
    choices: [
      { id: "ten-cm", label: "10 cm" },
      { id: "one-meter", label: "1 meter" },
      { id: "four-meter", label: "4 meters" },
    ],
    explanation:
      "The lesson note lists 10 cm as the allowable height reminder for top clearance lights.",
  },
];
