import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChevronRightIcon } from "@/components/ui/icons";
import { onboardingSlides, type OnboardingSlide, type TextLine } from "@/features/onboarding/data";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastSlide = currentIndex === onboardingSlides.length - 1;
  const currentSlide = onboardingSlides[currentIndex] ?? onboardingSlides[0]!;

  const metrics = useMemo(() => {
    const safeBottom = Math.max(insets.bottom, 16);
    const safeTop = Math.max(insets.top, 16);
    const horizontalPadding = clamp(width * 0.06, 20, 28);
    const footerHeight = 112 + safeBottom;
    const imageSize = clamp(Math.min(width - 18, height * 0.54), 292, 430);

    return {
      contentTopPadding: safeTop + 36,
      footerBottomPadding: safeBottom,
      footerHeight,
      horizontalPadding,
      imageSize,
      slideBottomPadding: footerHeight + 10,
      skipTop: safeTop + 6,
    };
  }, [height, insets.bottom, insets.top, width]);

  const goToSetup = useCallback(() => {
    router.replace("/setup/vehicle");
  }, [router]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(clamp(nextIndex, 0, onboardingSlides.length - 1));
    },
    [width],
  );

  const handlePrimaryPress = useCallback(() => {
    if (isLastSlide) {
      goToSetup();
      return;
    }

    scrollRef.current?.scrollTo({
      animated: true,
      x: width * (currentIndex + 1),
    });
  }, [currentIndex, goToSetup, isLastSlide, width]);

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        contentInsetAdjustmentBehavior="never"
        accessibilityRole="adjustable"
        accessibilityLabel="Onboarding slides"
      >
        {onboardingSlides.map((slide) => (
          <OnboardingSlideView
            key={slide.id}
            metrics={metrics}
            onSkip={goToSetup}
            slide={slide}
            width={width}
          />
        ))}
      </ScrollView>

      <OnboardingFooter
        currentIndex={currentIndex}
        isLastSlide={isLastSlide}
        metrics={metrics}
        onPress={handlePrimaryPress}
        primaryLabel={currentSlide.cta}
      />
    </View>
  );
}

type SlideMetrics = {
  contentTopPadding: number;
  footerBottomPadding: number;
  footerHeight: number;
  horizontalPadding: number;
  imageSize: number;
  slideBottomPadding: number;
  skipTop: number;
};

type OnboardingSlideViewProps = {
  metrics: SlideMetrics;
  onSkip: () => void;
  slide: OnboardingSlide;
  width: number;
};

function OnboardingSlideView({ metrics, onSkip, slide, width }: OnboardingSlideViewProps) {
  return (
    <View
      style={[
        styles.slide,
        {
          paddingBottom: metrics.slideBottomPadding,
          paddingHorizontal: metrics.horizontalPadding,
          paddingTop: metrics.contentTopPadding,
          width,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Skip onboarding"
        onPress={onSkip}
        style={[
          styles.skipButton,
          {
            right: metrics.horizontalPadding,
            top: metrics.skipTop,
          },
        ]}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <Image
        source={slide.image}
        resizeMode="contain"
        accessibilityLabel={slide.imageLabel}
        style={[
          styles.artwork,
          {
            height: metrics.imageSize,
            width: metrics.imageSize,
          },
        ]}
      />

      <View style={styles.copyBlock}>
        <RichText lines={slide.title} textStyle={styles.slideTitle} />
        <Text style={styles.slideBody}>{slide.body}</Text>
      </View>
    </View>
  );
}

type FooterProps = {
  currentIndex: number;
  isLastSlide: boolean;
  metrics: SlideMetrics;
  onPress: () => void;
  primaryLabel: string;
};

function OnboardingFooter({
  currentIndex,
  isLastSlide,
  metrics,
  onPress,
  primaryLabel,
}: FooterProps) {
  if (isLastSlide) {
    return (
      <View
        style={[
          styles.footer,
          styles.lastFooter,
          {
            height: metrics.footerHeight + 18,
            paddingBottom: metrics.footerBottomPadding,
            paddingHorizontal: metrics.horizontalPadding,
          },
        ]}
      >
        <PaginationDots currentIndex={currentIndex} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={primaryLabel}
          onPress={onPress}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <Text style={styles.primaryButtonLabel}>{primaryLabel}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.footer,
        {
          height: metrics.footerHeight,
          paddingBottom: metrics.footerBottomPadding,
          paddingHorizontal: metrics.horizontalPadding,
        },
      ]}
    >
      <View
        style={[
          styles.centerDots,
          {
            bottom: metrics.footerBottomPadding + 24,
          },
        ]}
      >
        <PaginationDots currentIndex={currentIndex} />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next onboarding slide"
        onPress={onPress}
        style={({ pressed }) => [
          styles.nextButton,
          {
            bottom: metrics.footerBottomPadding,
            right: metrics.horizontalPadding,
          },
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <ChevronRightIcon color="#ffffff" size={30} strokeWidth={2.8} />
      </Pressable>
    </View>
  );
}

function PaginationDots({ currentIndex }: { currentIndex: number }) {
  return (
    <View style={styles.dots} accessibilityRole="summary">
      {onboardingSlides.map((slide, index) => (
        <View
          key={slide.id}
          accessibilityLabel={`Slide ${index + 1} of ${onboardingSlides.length}`}
          style={[
            styles.dot,
            index === currentIndex ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

type RichTextProps = {
  lines: TextLine[];
  textStyle: object;
};

function RichText({ lines, textStyle }: RichTextProps) {
  return (
    <Text style={textStyle}>
      {lines.map((line, lineIndex) => (
        <Text key={`line-${lineIndex}`}>
          {line.map((part, partIndex) => (
            <Text
              key={`${lineIndex}-${partIndex}-${part.text}`}
              style={part.accent ? styles.accentText : null}
            >
              {part.text}
            </Text>
          ))}
          {lineIndex < lines.length - 1 ? "\n" : ""}
        </Text>
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  accentText: {
    color: "#3d8f3f",
  },
  artwork: {
    flexShrink: 0,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  centerDots: {
    alignItems: "center",
    left: 0,
    position: "absolute",
    right: 0,
  },
  copyBlock: {
    alignItems: "center",
    marginTop: 16,
    maxWidth: 340,
    width: "100%",
  },
  dot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  dotActive: {
    backgroundColor: "#3d8f3f",
  },
  dotInactive: {
    backgroundColor: "#d8d8d8",
  },
  dots: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    justifyContent: "center",
    minHeight: 14,
  },
  footer: {
    backgroundColor: "#fffdf8",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
  },
  lastFooter: {
    gap: 28,
    justifyContent: "flex-end",
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: "#3d8f3f",
    borderRadius: 32,
    boxShadow: "0 9px 16px rgba(45, 126, 56, 0.28)",
    height: 64,
    justifyContent: "center",
    position: "absolute",
    width: 64,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#3d8f3f",
    borderRadius: 999,
    boxShadow: "0 9px 16px rgba(45, 126, 56, 0.28)",
    height: 58,
    justifyContent: "center",
    width: "100%",
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  screen: {
    backgroundColor: "#fffdf8",
    flex: 1,
  },
  skipButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    position: "absolute",
    zIndex: 2,
  },
  skipText: {
    color: "#2f7f38",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 20,
  },
  slide: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  slideBody: {
    color: "#151c24",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 22,
    paddingTop: 16,
    textAlign: "center",
  },
  slideTitle: {
    color: "#111923",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 34,
    textAlign: "center",
  },
});
