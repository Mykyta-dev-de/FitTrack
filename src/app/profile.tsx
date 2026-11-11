import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import StatTile from "../components/StatTile";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
  source={{
    uri: "https://i.pravatar.cc/300?img=47",
  }}
  style={styles.avatar}
  contentFit="cover"
/>
<Pressable
  style={styles.settingsButton}
  onPress={() => router.push("/settings")}
>
  <Text style={styles.settingsButtonText}>
    ⚙️ Налаштування
  </Text>
</Pressable>
      <Text style={styles.title}>FitTrack</Text>
      <Text style={styles.subtitle}>Профіль користувача</Text>
      <Text style={styles.name}>Олена Коваль</Text>
      <Text style={styles.goal}>Ціль: 150 хв на тиждень</Text>
     <View style={styles.statsRow}>
  <StatTile value="12" label="трен." />
  <StatTile value="540" label="хв" />
  <StatTile value="4" label="тижні" />
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
  backgroundColor: "#0b6e8a",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginBottom: 20,
  alignItems: "center",
},

settingsButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "600",
},
  statsRow: {
  flexDirection: "row",
  gap: 10,
  width: "100%",
  maxWidth: 420,
  marginTop: 25,
},
avatar: {
  width: 120,
  height: 120,
  borderRadius: 60,
  marginBottom: 20,
  backgroundColor: "#dce8ec",
},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0b6e8a",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  goal: {
    fontSize: 16,
    marginTop: 10,
    color: "#666",
  },
});
