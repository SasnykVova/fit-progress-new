import { exercises } from "@/mock/musleGroup/exercises";
import { globalStyles } from "@/styles/globalStyles";
import { Link } from "expo-router";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import AddExerciseDialog from "./AddExerciseDialog";
import DeleteExerciseDialog from "./DeleteExerciseDialog";
import EmptyExercise from "./EmptyExercise";

export default function MuscleGroup() {
  const theme = useTheme();

  const [exerciseSearch, setExerciseSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteExerciseName, setDeleteExerciseName] = useState<string>("");
  const [addExerciseVisible, setAddExerciseVisible] = useState<boolean>(false);

  const { reset } = useFormContext();

  const showDialog = (name: string) => {
    setVisible(true);
    setDeleteExerciseName(name);
  };

  const hideDialog = () => {
    setVisible(false);
    setDeleteExerciseName("");
  };

  const handleOpenAddExerciseVisible = () => {
    setAddExerciseVisible(true);
  };
  const handleCloseAddExerciseVisible = () => {
    setAddExerciseVisible(false);
    reset();
  };

  const isEmpty = false;

  return (
    <View style={[styles.exreciseGroup, { backgroundColor: "#fff" }]}>
      <View style={styles.wrapper}>
        <Text style={globalStyles.h2}>Hands</Text>
        <Searchbar
          elevation={1}
          placeholder="Search exercise"
          value={exerciseSearch}
          onChangeText={setExerciseSearch}
          style={styles.search}
        />
        <Text style={styles.subTitle}>Exercises</Text>
        {isEmpty ? (
          <EmptyExercise />
        ) : (
          <View style={styles.exercisesContainer}>
            {exercises.map(({ id, name }) => (
              <Link href=".." key={id}>
                <Surface style={styles.exercise} elevation={3}>
                  <Text
                    style={[
                      styles.exerciseText,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {name}
                  </Text>
                  <IconButton
                    icon="delete"
                    size={26}
                    iconColor={theme.colors.secondary}
                    onPress={() => showDialog(name)}
                  />
                </Surface>
              </Link>
            ))}
          </View>
        )}

        <IconButton
          icon="plus"
          size={30}
          iconColor="white"
          containerColor={theme.colors.primary}
          style={styles.addButton}
          onPress={handleOpenAddExerciseVisible}
        />
      </View>
      <DeleteExerciseDialog
        visible={visible}
        onClose={hideDialog}
        deleteExerciseName={deleteExerciseName}
      />
      <AddExerciseDialog
        visible={addExerciseVisible}
        onDismiss={handleCloseAddExerciseVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  exreciseGroup: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  search: {
    borderRadius: 8,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  exercisesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  exercise: {
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: "500",
  },
  addButton: {
    borderRadius: 16,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
