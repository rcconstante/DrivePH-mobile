import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { SettingsTopBar } from "@/components/settings/settings-page";

const termsUrl = "https://www.driverph.com/terms";

export function TermsScreen() {
  const insets = useSafeAreaInsets();
  const [hasError, setHasError] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0);

  const reloadTerms = () => {
    setHasError(false);
    setWebViewKey((currentKey) => currentKey + 1);
  };

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          {
            paddingTop: Math.max(insets.top, 18),
          },
        ]}
      >
        <SettingsTopBar title="Terms & Conditions" />
      </View>

      {hasError ? (
        <View style={styles.errorWrap}>
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Unable to load terms</Text>
            <Text style={styles.errorText}>
              Check your connection and try loading the DriverPH terms again.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reload terms"
              onPress={reloadTerms}
              style={({ pressed }) => [styles.reloadButton, pressed ? styles.pressed : null]}
            >
              <Text style={styles.reloadText}>Reload</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <WebView
          key={webViewKey}
          source={{ uri: termsUrl }}
          originWhitelist={["https://*"]}
          onError={() => setHasError(true)}
          onHttpError={() => setHasError(true)}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Loading terms...</Text>
            </View>
          )}
          style={styles.webView}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e6ece8",
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  errorText: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 17,
  },
  errorTitle: {
    color: "#172230",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 20,
  },
  errorWrap: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
  },
  header: {
    backgroundColor: "#fbfcf8",
    paddingBottom: 12,
    paddingHorizontal: 18,
  },
  loading: {
    alignItems: "center",
    backgroundColor: "#fbfcf8",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  loadingText: {
    color: "#5d6875",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.86,
  },
  reloadButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#3da847",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  reloadText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 16,
  },
  screen: {
    backgroundColor: "#fbfcf8",
    flex: 1,
  },
  webView: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
});
