
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitTrack</Text>

      <Text style={styles.subtitle}>
        Твій помічник у тренуваннях
      </Text>

      <Link href="/profile" style={styles.button}>
        Перейти до профілю
      </Link>

      <Link href="/exercises" style={styles.button}>
        Бібліотека вправ
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0b6e8a",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 35,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0b6e8a",
    color: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    textAlign: "center",
    width: "85%",
    maxWidth: 320,
    fontSize: 16,
    fontWeight: "600",
  },
});