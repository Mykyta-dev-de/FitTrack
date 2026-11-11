
import { StyleSheet, Switch, Text, View } from "react-native";

type SettingsRowProps = {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function SettingsRow({
  title,
  value,
  onValueChange,
}: SettingsRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#cccccc",
          true: "#81c7d9",
        }}
        thumbColor={value ? "#0b6e8a" : "#f4f3f4"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    color: "#222222",
    fontWeight: "500",
    flexShrink: 1,
    marginRight: 12,
  },
});
