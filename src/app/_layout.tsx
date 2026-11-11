
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "FitTrack" }}
      />

      <Stack.Screen
        name="profile"
        options={{ title: "Профіль" }}
      />

      <Stack.Screen
        name="exercises"
        options={{ title: "Бібліотека вправ" }}
      />
    </Stack>
  );
}