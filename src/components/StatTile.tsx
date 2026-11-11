
import { StyleSheet, Text, View } from "react-native";

type StatTileProps = {
  value: string;
  label: string;
};

export default function StatTile({ value, label }: StatTileProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#e5f3f7",
    paddingVertical: 18,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: "center",
    gap: 6,
  },
  value: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0b6e8a",
  },
  label: {
    fontSize: 13,
    textAlign: "center",
    color: "#444",
  },
});
