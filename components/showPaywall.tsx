import { usePlacement } from "expo-superwall";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import { ThemedText } from "./ThemedText";

export default function ShowPaywall() {
  const theme = useColorScheme() ?? "light";
  const { registerPlacement } = usePlacement();

  const showPaywall = async () => {
    try {
      await registerPlacement({
        placement: "campaign_trigger",
        feature: () => {
          console.log("Feature unlocked");
        },
      });
    } catch (e) {
      console.error("registerPlacement error", e);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[theme].tint }]}
      activeOpacity={0.8}
      onPress={showPaywall}
    >
      <ThemedText type="defaultSemiBold" style={[styles.buttonText, { color: Colors[theme].background }]}>Show Paywall</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
