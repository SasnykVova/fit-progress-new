import { globalStyles } from "@/styles/globalStyles";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import { useGetExerciseByGroupId } from "@/services/muscleGroup/getExerciseByGroupId";
import AddExerciseDialog from "./AddExerciseDialog";
import DeleteExerciseDialog from "./DeleteExerciseDialog";

import { useDebounce } from "@/helpers/utils/general/useDebounce";
import { getExerciseGroupNameById } from "@/helpers/utils/muscleGroup/getExerciseGroupNameById";
import { useAuthStore } from "@/store/authStore";
import EmptyExercise from "./EmptyExercise";

export default function MuscleGroup() {
  const theme = useTheme();

  const [exerciseSearch, setExerciseSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteExerciseName, setDeleteExerciseName] = useState<string>("");
  const [deleteExerciseId, setDeleteExerciseId] = useState<string>("");
  const [addExerciseVisible, setAddExerciseVisible] = useState<boolean>(false);
  const debounceExerciseSearch = useDebounce(exerciseSearch, 300);

  const { id } = useLocalSearchParams();
  const groupId = Array.isArray(id) ? id[0] : (id as string);

  const { userId } = useAuthStore();
  console.log("groupId", groupId);
  console.log("userId", userId);
  const { data, isLoading } = useGetExerciseByGroupId(userId, groupId);

  const showDialog = (name: string, exerciseId: string) => {
    setVisible(true);
    setDeleteExerciseName(name);
    setDeleteExerciseId(exerciseId);
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
  };
  const filteredExercises = useMemo(() => {
    if (!data) return [];
    return data.filter((exercise: any) =>
      exercise.name
        ?.toLowerCase()
        .includes(debounceExerciseSearch.toLowerCase())
    );
  }, [data, debounceExerciseSearch]);

  return (
    <View style={[styles.muscleGroup, { backgroundColor: "#fff" }]}>
      <ScrollView contentContainerStyle={styles.exreciseGroup}>
        <View style={styles.wrapper}>
          <Text style={globalStyles.h2}>
            {getExerciseGroupNameById(groupId)}
          </Text>
          <Searchbar
            elevation={1}
            placeholder="Search exercise"
            value={exerciseSearch}
            onChangeText={setExerciseSearch}
            style={styles.search}
          />
          <Text style={styles.subTitle}>Exercises</Text>

          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : data?.length === 0 ? (
            <EmptyExercise
              title="Your exercise list is empty."
              text="To create a new exercise, tap the plus icon at the bottom right."
            />
          ) : (
            <View style={styles.exercisesContainer}>
              {filteredExercises?.map(
                ({ id, name }: { id: string; name: string }) => (
                  <Link
                    href={{
                      pathname: "/(app)/(exercises)/[id]/[exerciseId]",
                      params: { id: "1", exerciseId: id },
                    }}
                    key={id}
                  >
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
                        onPress={() => showDialog(name, id)}
                      />
                    </Surface>
                  </Link>
                )
              )}
            </View>
          )}
        </View>
        <DeleteExerciseDialog
          visible={visible}
          onClose={hideDialog}
          deleteExerciseName={deleteExerciseName}
          setDeleteExerciseName={setDeleteExerciseName}
          deleteExerciseId={deleteExerciseId}
          setDeleteExerciseId={setDeleteExerciseId}
        />
        <AddExerciseDialog
          visible={addExerciseVisible}
          onDismiss={handleCloseAddExerciseVisible}
        />
      </ScrollView>
      <IconButton
        icon="plus"
        size={30}
        iconColor="white"
        containerColor={theme.colors.primary}
        style={styles.addButton}
        onPress={handleOpenAddExerciseVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  muscleGroup: {
    flex: 1,
    position: "relative",
  },
  exreciseGroup: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: "115%",
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
    fontWeight: "700",
  },
  exercisesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
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
    right: 8,
    bottom: 8,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
