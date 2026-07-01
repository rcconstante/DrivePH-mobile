import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { SettingsPage, SettingsRow, SettingsSection } from "@/components/settings/settings-page";
import { ChevronRightIcon, FileTextIcon, LifeBuoyIcon } from "@/components/ui/icons";

const supportEmail = "support@driveph.com";

const faqItems = [
  {
    id: "learning-progress",
    question: "How does learning progress work?",
    answer: "Progress updates as you open lessons, complete quizzes, and finish scenario practice. Topic cards show completed items against total lessons.",
  },
  {
    id: "coins",
    question: "How do I earn coins?",
    answer: "You can earn coins by completing lessons, finishing quizzes, starting scenarios, and using daily check-in actions. Rewards are added to your coin history.",
  },
  {
    id: "purchase",
    question: "How do coin purchases work for now?",
    answer: "Purchases currently use an automatic demo checkout. Selecting a package completes immediately, adds coins to your balance, and records the transaction.",
  },
  {
    id: "license-content",
    question: "What driving content is included?",
    answer: "The app includes Student Permit basics, license types, road signs, traffic rules, defensive driving, scenarios, quizzes, and vehicle care lessons.",
  },
  {
    id: "wrong-answer",
    question: "Can I retake quizzes?",
    answer: "Yes. You can retake quiz categories to practice. Coin rewards are awarded once per quiz category to avoid repeated farming.",
  },
  {
    id: "language",
    question: "Can I change the app language?",
    answer: "Yes. The Language page lets you choose from focused Philippine languages and common international options. Translation behavior is prepared for future content localization.",
  },
];

export function HelpSupportScreen() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("learning-progress");

  const openSupportEmail = async (subject: string) => {
    const mailUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`;

    try {
      await Linking.openURL(mailUrl);
      setFeedback(null);
    } catch {
      setFeedback("Email app is not available on this device.");
    }
  };

  return (
    <SettingsPage
      testID="help-support-screen"
      title="Help & Support"
      subtitle="Get help with lessons, quizzes, scenarios, and account questions."
    >
      <SettingsSection title="Contact">
        <SettingsRow
          color="#7c5cff"
          description={supportEmail}
          icon={LifeBuoyIcon}
          onPress={() => openSupportEmail("DrivePH Guide Support")}
          title="Contact Support"
        />
        <SettingsRow
          color="#ef5b7a"
          description="Send details about something that is not working."
          icon={FileTextIcon}
          onPress={() => openSupportEmail("DrivePH Guide Issue Report")}
          title="Report a Problem"
        />
      </SettingsSection>

      {feedback != null ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      ) : null}

      <SettingsSection title="Common Questions">
        {faqItems.map((item) => (
          <FaqItem
            expanded={expandedFaqId === item.id}
            item={item}
            key={item.id}
            onPress={() =>
              setExpandedFaqId((currentId) => (currentId === item.id ? null : item.id))
            }
          />
        ))}
      </SettingsSection>
    </SettingsPage>
  );
}

function FaqItem({
  expanded,
  item,
  onPress,
}: {
  expanded: boolean;
  item: (typeof faqItems)[number];
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.question}
      accessibilityState={{ expanded }}
      onPress={onPress}
      style={({ pressed }) => [styles.faqItem, pressed ? styles.pressed : null]}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <ChevronRightIcon
          color="#8f9aa6"
          size={18}
          strokeWidth={2}
          style={expanded ? styles.faqChevronOpen : null}
        />
      </View>
      {expanded ? <Text style={styles.faqAnswer}>{item.answer}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  feedbackCard: {
    backgroundColor: "#fff6e8",
    borderColor: "#ffd99b",
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  feedbackText: {
    color: "#9a5b00",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  faqAnswer: {
    color: "#5d6875",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  faqChevronOpen: {
    transform: [{ rotate: "90deg" }],
  },
  faqHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  faqItem: {
    gap: 8,
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  faqQuestion: {
    color: "#172230",
    flex: 1,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.86,
  },
});
