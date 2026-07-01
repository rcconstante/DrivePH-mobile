import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import type { HomeNotification } from "@/features/home/data";

type HomeNotificationsModalProps = {
  notifications: HomeNotification[];
  onClose: () => void;
  visible: boolean;
};

export function HomeNotificationsModal({
  notifications,
  onClose,
  visible,
}: HomeNotificationsModalProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Notifications</Text>
          <View style={styles.list}>
            {notifications.map((item) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.dot} />
                <View style={styles.copy}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close notifications"
            onPress={onClose}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(6, 27, 73, 0.34)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fbfcf8",
    borderRadius: 24,
    gap: 14,
    padding: 18,
    width: "100%",
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#3da847",
    borderRadius: 999,
    height: 42,
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  copy: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  description: {
    color: "#63718b",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
  },
  dot: {
    backgroundColor: "#3da847",
    borderRadius: 5,
    height: 10,
    marginTop: 5,
    width: 10,
  },
  list: {
    gap: 10,
  },
  notificationTitle: {
    color: "#061b49",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 17,
  },
  row: {
    backgroundColor: "#ffffff",
    borderColor: "#e5edf6",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    padding: 12,
  },
  title: {
    color: "#061b49",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 25,
  },
});
