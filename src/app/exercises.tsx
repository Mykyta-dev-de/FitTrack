import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AppButton from "../components/AppButton";

import { FlashList } from "@shopify/flash-list";

const initialExercises = [
  {
    id: "1",
    name: "Присідання",
    duration: "15 повторень",
    icon: "🦵",
  },
  {
    id: "2",
    name: "Віджимання",
    duration: "10 повторень",
    icon: "💪",
  },
  {
    id: "3",
    name: "Планка",
    duration: "30 секунд",
    icon: "⏱️",
  },
  {
    id: "4",
    name: "Біг",
    duration: "15 хвилин",
    icon: "🏃",
  },
  {
    id: "5",
    name: "Підтягування",
    duration: "8 повторень",
    icon: "🏋️",
  },
  {
    id: "6",
    name: "Стрибки",
    duration: "20 повторень",
    icon: "🤸",
  },
  {
    id: "7",
    name: "Велосипед",
    duration: "20 хвилин",
    icon: "🚴",
  },
  {
    id: "8",
    name: "Розтяжка",
    duration: "10 хвилин",
    icon: "🧘",
  },
];

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState(initialExercises);
  const [exercisesLoaded, setExercisesLoaded] = useState(false);
  const EXERCISES_STORAGE_KEY = "fittrack_custom_exercises";
  const [newName, setNewName] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  async function loadCustomExercises() {
    try {
      const saved = await AsyncStorage.getItem(
        EXERCISES_STORAGE_KEY
      );

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item) =>
              typeof item.id === "string" &&
              typeof item.name === "string" &&
              typeof item.duration === "string" &&
              typeof item.icon === "string"
          )
        ) {
          setExercises([...initialExercises, ...parsed]);
        }
      }
    } catch (error) {
      console.error("Помилка завантаження вправ:", error);
    } finally {
      setExercisesLoaded(true);
    }
  }

  loadCustomExercises();
}, []);

useEffect(() => {
  async function loadExercises() {
    try {
      const saved = await AsyncStorage.getItem("completedExercises");

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.every((id) => typeof id === "string")
        ) {
          setCompleted(parsed);
        }
      }
    } catch (error) {
      console.error("Помилка завантаження вправ:", error);
    } finally {
      setLoaded(true);
    }
  }

  loadExercises();
}, []);

  async function toggleExercise(id: string) {
  if (!loaded) return;

  const updated = completed.includes(id)
    ? completed.filter((item) => item !== id)
    : [...completed, id];

  setCompleted(updated);

  try {
    await AsyncStorage.setItem(
      "completedExercises",
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error("Помилка збереження вправ:", error);
  }
}

async function addExercise() {
  if (!exercisesLoaded) return;

  const name = newName.trim();
  const duration = newDuration.trim();

  if (!name || !duration) {
    Alert.alert("Помилка", "Заповніть усі поля!");
    return;
  }

  const newExercise = {
    id: `${Date.now()}-${Math.random()}`,
    name,
    duration,
    icon: "🏋️",
  };

  const updated = [...exercises, newExercise];
  const customExercises = updated.slice(initialExercises.length);

  try {
    await AsyncStorage.setItem(
      EXERCISES_STORAGE_KEY,
      JSON.stringify(customExercises)
    );

    setExercises(updated);
    setNewName("");
    setNewDuration("");
  } catch (error) {
    console.error("Помилка збереження вправ:", error);
    Alert.alert(
      "Помилка",
      "Не вдалося зберегти вправу."
    );
  }
}

function confirmDeleteExercise(id: string) {
  const isDefault = initialExercises.some(
    (exercise) => exercise.id === id
  );

  if (isDefault) {
    Alert.alert(
      "Стандартна вправа",
      "Стандартні вправи не можна видаляти."
    );
    return;
  }

  Alert.alert(
    "Видалити вправу?",
    "Ви впевнені, що хочете видалити цю вправу?",
    [
      {
        text: "Скасувати",
        style: "cancel",
      },
      {
        text: "Видалити",
        style: "destructive",
        onPress: async () => {
          const updated = exercises.filter(
            (exercise) => exercise.id !== id
          );

          const customExercises = updated.filter(
            (exercise) =>
              !initialExercises.some(
                (defaultExercise) =>
                  defaultExercise.id === exercise.id
              )
          );

          try {
            await AsyncStorage.setItem(
              EXERCISES_STORAGE_KEY,
              JSON.stringify(customExercises)
            );

            setExercises(updated);

            const updatedCompleted = completed.filter(
              (completedId) => completedId !== id
            );

            await AsyncStorage.setItem(
              "completedExercises",
              JSON.stringify(updatedCompleted)
            );

            setCompleted(updatedCompleted);
          } catch (error) {
            console.error("Помилка видалення вправи:", error);
            Alert.alert(
              "Помилка",
              "Не вдалося повністю зберегти зміни."
            );
          }
        },
      },
    ]
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Бібліотека вправ</Text>

      <Text style={styles.counter}>
        Виконано: {completed.length} / {exercises.length}
      </Text>

<View style={styles.form}>
  <TextInput
    style={styles.input}
    placeholder="Назва вправи"
    value={newName}
    onChangeText={setNewName}
  />

  <TextInput
    style={styles.input}
    placeholder="Тривалість або повторення"
    value={newDuration}
    onChangeText={setNewDuration}
  />

<AppButton
  title="+ Додати вправу"
  onPress={addExercise}
  disabled={!exercisesLoaded}
/>

</View>

      <FlashList
        data={exercises}
        keyExtractor={(item) => item.id}
        extraData={completed}
        renderItem={({ item }) => {
          const isCompleted = completed.includes(item.id);

          return (
            <Pressable
  onPress={() => toggleExercise(item.id)}
  style={[
    styles.card,
    isCompleted && styles.completedCard,
  ]}
>
              <Text style={styles.icon}>{item.icon}</Text>

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>

              <Text style={styles.check}>
                {isCompleted ? "✅" : "⬜"}
              </Text>
              
<Pressable
  style={styles.deleteButton}
  onPress={(event) => {
    event.stopPropagation();
    confirmDeleteExercise(item.id);
  }}
>
  <Text style={styles.deleteButtonText}>🗑️</Text>
</Pressable>

            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0b6e8a",
    marginBottom: 15,
  },
  counter: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333333",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: "#d9f5e5",
  },
  icon: {
    fontSize: 32,
    marginRight: 18,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  duration: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },
  check: {
    fontSize: 22,
  },
  
form: {
  marginBottom: 20,
},
input: {
  backgroundColor: "#ffffff",
  borderWidth: 1,
  borderColor: "#dddddd",
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
  fontSize: 16,
},
addButton: {
  backgroundColor: "#0b6e8a",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
},
addButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "600",
},
deleteButton: {
  marginLeft: 12,
  padding: 8,
  borderRadius: 8,
  backgroundColor: "#ffe5e5",
},
deleteButtonText: {
  fontSize: 20,
},
});