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

import { BrandLogo } from "@/components/ui/brand-logo";
import { ArrowRightIcon } from "@/components/ui/icons";
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
    const footerHeight = 126 + Math.max(insets.bottom, 16);
    const topSlotHeight = clamp(height * 0.15, 94, 130);
    const copySlotHeight = clamp(height * 0.2, 146, 180);
    const artworkHeight = clamp(
      height - insets.top - footerHeight - topSlotHeight - copySlotHeight - 24,
      248,
      388,
    );
    const artworkWidth = clamp(width - 44, 292, 390);

    return {
      artworkHeight,
      artworkWidth,
      contentTopPadding: Math.max(insets.top, 16),
      copySlotHeight,
      footerBottomPadding: Math.max(insets.bottom, 16),
      footerHeight,
      horizontalPadding: clamp(width * 0.06, 20, 28),
      topSlotHeight,
    };
  }, [height, insets.bottom, insets.top, width]);

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
      setCurrentIndex(clamp(nextIndex, 0, onboardingSlides.length - 1));
    },
    [width],
  );

  const handlePrimaryPress = useCallback(() => {
    if (isLastSlide) {
      router.replace("/setup/vehicle");
      return;
    }

    scrollRef.current?.scrollTo({
      x: width * (currentIndex + 1),
      animated: true,
    });
  }, [currentIndex, isLastSlide, router, width]);

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
            slide={slide}
            width={width}
            metrics={metrics}
          />
        ))}
      </ScrollView>

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
        <PaginationDots currentIndex={currentIndex} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={currentSlide.cta}
          onPress={handlePrimaryPress}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed ? styles.primaryButtonPressed : null,
          ]}
        >
          <Text style={styles.primaryButtonLabel}>{currentSlide.cta}</Text>
          <ArrowRightIcon
            color="#ffffff"
            size={22}
            strokeWidth={1.9}
            style={styles.primaryButtonIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

type SlideMetrics = {
  artworkHeight: number;
  artworkWidth: number;
  contentTopPadding: number;
  copySlotHeight: number;
  footerBottomPadding: number;
  footerHeight: number;
  horizontalPadding: number;
  topSlotHeight: number;
};

type OnboardingSlideViewProps = {
  slide: OnboardingSlide;
  width: number;
  metrics: SlideMetrics;
};

function OnboardingSlideView({ metrics, slide, width }: OnboardingSlideViewProps) {
  return (
    <View
      style={[
        styles.slide,
        {
          paddingHorizontal: metrics.horizontalPadding,
          paddingTop: metrics.contentTopPadding,
          width,
        },
      ]}
    >
      <View style={[styles.headerSlot, { height: metrics.topSlotHeight }]}>
        <SlideHeader slide={slide} />
      </View>

      <View
        style={[
          styles.artworkFrame,
          {
            height: metrics.artworkHeight,
            width: metrics.artworkWidth,
          },
        ]}
      >
        <Image
          source={slide.image}
          resizeMode="cover"
          accessibilityLabel={slide.imageLabel}
          style={styles.artwork}
        />
      </View>

      <View style={[styles.copySlot, { height: metrics.copySlotHeight }]}>
        <RichText lines={slide.title} textStyle={styles.slideTitle} />
        <Text style={styles.slideBody}>{slide.body}</Text>
      </View>
    </View>
  );
}

function SlideHeader({ slide }: { slide: OnboardingSlide }) {
  if (slide.header.kind === "brand") {
    return <BrandLogo align="center" size="large" subtitle="tagline" />;
  }

  if (slide.header.kind === "headline") {
    return (
      <View style={styles.topHeadlineWrap}>
        <RichText lines={slide.header.lines} textStyle={styles.topHeadline} />
      </View>
    );
  }

  return <View style={styles.headerSpacer} />;
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
  screen: {
    flex: 1,
    backgroundColor: "#f7fbff",
  },
  slide: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerSlot: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  topHeadlineWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  topHeadline: {
    color: "#061b49",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 32,
    textAlign: "center",
  },
  headerSpacer: {
    height: 1,
    width: 1,
  },
  artworkFrame: {
    alignItems: "center",
    backgroundColor: "#eef7ff",
    borderRadius: 28,
    justifyContent: "center",
    overflow: "hidden",
  },
  artwork: {
    height: "100%",
    width: "100%",
  },
  copySlot: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 340,
    width: "100%",
  },
  slideTitle: {
    color: "#061b49",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 31,
    textAlign: "center",
  },
  accentText: {
    color: "#0757ff",
  },
  slideBody: {
    color: "#63718b",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 23,
    paddingTop: 14,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#f7fbff",
    gap: 24,
    justifyContent: "flex-end",
  },
  dots: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    minHeight: 14,
  },
  dot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  dotActive: {
    backgroundColor: "#0757ff",
  },
  dotInactive: {
    backgroundColor: "#d8e0eb",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#0757ff",
    borderRadius: 999,
    flexDirection: "row",
    gap: 10,
    height: 56,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  primaryButtonPressed: {
    opacity: 0.86,
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  primaryButtonIcon: {
    marginTop: 1,
  },
});
