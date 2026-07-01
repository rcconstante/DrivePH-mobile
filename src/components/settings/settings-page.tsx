import { useRouter } from "expo-router";
import { useRef } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  type IconComponent,
} from "@/components/ui/icons";
import { useScrollToTopOnFocus } from "@/hooks/use-scroll-to-top-on-focus";

type SettingsPageProps = PropsWithChildren<{
  subtitle?: string;
  testID?: string;
  title: string;
}>;

export function SettingsPage({ children, subtitle, testID, title }: SettingsPageProps) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null);
  useScrollToTopOnFocus(scrollRef);

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        testID={testID}
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 18) + 126,
            paddingTop: Math.max(insets.top, 18),
          },
        ]}
      >
        <SettingsTopBar title={title} />
        {subtitle != null ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {children}
      </ScrollView>
    </View>
  );
}

export function SettingsTopBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={() => router.back()}
        style={styles.iconButton}
      >
        <ArrowLeftIcon color="#172230" size={20} strokeWidth={2} />
      </Pressable>
      <Text style={styles.screenTitle}>{title}</Text>
      <View style={styles.iconButtonSpacer} />
    </View>
  );
}

export function SettingsSection({
  children,
  title,
}: PropsWithChildren<{
  title?: string;
}>) {
  return (
    <View style={styles.section}>
      {title != null ? <Text style={styles.sectionLabel}>{title}</Text> : null}
      <View style={styles.cardGroup}>{children}</View>
    </View>
  );
}

export type SettingsRowProps = {
  accessibilityHint?: string;
  accessory?: ReactNode;
  color?: string;
  description?: string;
  icon?: IconComponent;
  image?: ImageSourcePropType;
  imageLabel?: string;
  onPress?: () => void;
  rightLabel?: string;
  selected?: boolean;
  title: string;
};

export function SettingsRow({
  accessibilityHint,
  accessory,
  color = "#4caf50",
  description,
  icon: Icon,
  image,
  imageLabel,
  onPress,
  rightLabel,
  selected = false,
  title,
}: SettingsRowProps) {
  const hasNavigation = onPress != null;

  return (
    <Pressable
      accessibilityRole={hasNavigation ? "button" : "text"}
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected }}
      disabled={!hasNavigation}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]}
    >
      {image != null ? (
        <Image
          source={image}
          resizeMode="contain"
          accessibilityLabel={imageLabel ?? title}
          style={styles.assetIcon}
        />
      ) : Icon != null ? (
        <View style={[styles.rowIconBox, { backgroundColor: color }]}>
          <Icon color="#ffffff" size={20} strokeWidth={2} />
        </View>
      ) : null}

      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        {description != null ? <Text style={styles.rowDescription}>{description}</Text> : null}
      </View>

      {accessory != null ? (
        accessory
      ) : selected ? (
        <View style={styles.checkCircle}>
          <CheckIcon color="#ffffff" size={15} strokeWidth={2.4} />
        </View>
      ) : (
        <View style={styles.rowRight}>
          {rightLabel != null ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
          {hasNavigation ? <ChevronRightIcon color="#8f9aa6" size={18} strokeWidth={2} /> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  assetIcon: {
    height: 40,
    width: 40,
  },
  cardGroup: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  checkCircle: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    width: 20,
  },
  content: {
    gap: 14,
    paddingHorizontal: 18,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 12,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  iconButtonSpacer: {
    height: 38,
    width: 38,
  },
  rightLabel: {
    color: "#2f973b",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 15,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    minHeight: 66,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rowCopy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  rowDescription: {
    color: "#6d7782",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 15,
  },
  rowIconBox: {
    alignItems: "center",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  rowPressed: {
    opacity: 0.86,
  },
  rowRight: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  rowTitle: {
    color: "#172230",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  screenTitle: {
    color: "#172230",
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 22,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    color: "#7b8591",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 14,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
