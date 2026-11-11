import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SettingsRow from "../components/SettingsRow";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const savedValue = await AsyncStorage.getItem("notifications");

        if (savedValue !== null) {
          setNotifications(savedValue === "true");
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadSettings();
  }, []);

  async function toggleNotifications(value: boolean) {
    setNotifications(value);

    try {
      await AsyncStorage.setItem("notifications", String(value));
    } catch (error) {
      console.error("Помилка збереження:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Налаштування</Text>

        <SettingsRow
  title="Сповіщення"
  value={notifications}
  onValueChange={toggleNotifications}
/>

      <Text style={styles.status}>
        Сповіщення: {notifications ? "Увімкнено" : "Вимкнено"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0b6e8a",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  label: {
    fontSize: 18,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "#666666",
  },
});