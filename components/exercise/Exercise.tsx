import { addSetSchema, TAddSetSchema } from "@/helpers/schemas/addSetSchema";
import { useGetExerciseSets } from "@/services/exercise/getExerciseSets";
import { useAuthStore } from "@/store/authStore";
import { globalStyles } from "@/styles/globalStyles";
import { ISet } from "@/types/exercise/exerciseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import EmptyExercise from "../muscleGroup/EmptyExercise";
import AddSetDialog from "./AddSetDialog";
import DeleteSetDialog from "./DeleteSetDialog";
import EditSetDialog from "./EditSetDialog";

export default function Exercise() {
  const [deleteSetVisible, setDeleteSetVisible] = useState<boolean>(false);
  const [setNumber, setSetNumber] = useState<string>("");
  const [setId, setSetId] = useState<string>("");
  const [addSetVisible, setAddSetVisible] = useState<boolean>(false);
  const [editSetVisible, setEditSetVisible] = useState<boolean>(false);

  const [currentEditSet, setCurrentEditSet] = useState<ISet | null>(null);

  const theme = useTheme();
  const { userId } = useAuthStore();
  const { exerciseId: id } = useLocalSearchParams();
  const router = useRouter();

  const exerciseId = Array.isArray(id) ? id[0] : (id as string);

  const addSetMethods = useForm<TAddSetSchema>({
    resolver: zodResolver(addSetSchema),
    defaultValues: {
      weight: "",
      reps: "",
    },
  });
  const editSetMethods = useForm<TAddSetSchema>({
    resolver: zodResolver(addSetSchema),
    defaultValues: {
      weight: "",
      reps: "",
    },
  });

  const { data, isLoading } = useGetExerciseSets(userId, exerciseId);

  const editResetForm = editSetMethods.reset;

  const handleSetDeleteSetVisibleClose = () => {
    setDeleteSetVisible(false);
  };

  const handleOpenDeleteSetVisible = (setNumber: string, setId: string) => {
    setDeleteSetVisible(true);
    setSetNumber(setNumber);
    setSetId(setId);
  };

  const handleOpenAddSetVisible = () => {
    setAddSetVisible(true);
  };
  const handleCloseAddSetVisible = () => {
    setAddSetVisible(false);
  };

  const handleOpenEditSetVisible = (currentSet: ISet) => {
    setEditSetVisible(true);
    setCurrentEditSet(currentSet);
    setSetId(currentSet.id);
  };
  const handleCloseEditSetVisible = () => {
    setEditSetVisible(false);
    setCurrentEditSet(null);
    editResetForm();
  };

  useEffect(() => {
    const weight = currentEditSet?.weight;
    const reps = currentEditSet?.reps;
    editResetForm({ weight: weight, reps: reps });
  }, [
    editSetVisible,
    editResetForm,
    currentEditSet?.weight,
    currentEditSet?.reps,
  ]);

  return (
    <View style={[styles.muscleGroup, { backgroundColor: "#fff" }]}>
      <ScrollView contentContainerStyle={styles.exreciseGroup}>
        <View style={styles.wrapper}>
          <Text style={globalStyles.h2}>Exercise name</Text>
          <Text style={styles.subTitle}>Sets</Text>

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
              title="Your sets list is empty."
              text="To create a new set, tap the plus icon at the bottom right."
            />
          ) : (
            <View style={styles.setsContainer}>
              {data?.map(({ setNumber, weight, reps, id }) => (
                <Surface key={setNumber} style={styles.set} elevation={3}>
                  <Text style={styles.textMedium}>Підхід {setNumber}</Text>
                  <View style={styles.resultContainer}>
                    <Text style={styles.textMedium}>Вага</Text>
                    <Text>{weight} кг</Text>
                  </View>
                  <View style={styles.resultContainer}>
                    <Text style={styles.textMedium}>Повторень</Text>
                    <Text>{reps}</Text>
                  </View>
                  <View style={styles.btnContainer}>
                    <IconButton
                      icon="square-edit-outline"
                      size={26}
                      onPress={() =>
                        handleOpenEditSetVisible({
                          setNumber,
                          weight,
                          reps,
                          id,
                        })
                      }
                    />
                    <IconButton
                      icon="delete"
                      size={26}
                      onPress={() => handleOpenDeleteSetVisible(setNumber, id)}
                    />
                  </View>
                </Surface>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <FormProvider {...addSetMethods}>
        <AddSetDialog
          visible={addSetVisible}
          onClose={handleCloseAddSetVisible}
          setCount={data?.length}
        />
      </FormProvider>
      <DeleteSetDialog
        visible={deleteSetVisible}
        onClose={handleSetDeleteSetVisibleClose}
        deleteSetNumber={setNumber}
      />
      <FormProvider {...editSetMethods}>
        <EditSetDialog
          visible={editSetVisible}
          onClose={handleCloseEditSetVisible}
          editSetId={setId}
        />
      </FormProvider>
      <IconButton
        icon="timer-outline"
        size={30}
        iconColor="white"
        containerColor={theme.colors.primary}
        style={styles.timerButton}
        onPress={() => router.push("/(app)/(exercises)/stopwatch")}
      />
      <IconButton
        icon="plus"
        size={30}
        iconColor="white"
        containerColor={theme.colors.primary}
        style={styles.addButton}
        onPress={handleOpenAddSetVisible}
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
  subTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  setsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflowY: "auto",
  },
  set: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textMedium: {
    fontWeight: "700",
    fontSize: 13,
  },
  resultContainer: {
    gap: 4,
    alignItems: "center",
  },
  timerButton: {
    borderRadius: 16,
    position: "absolute",
    left: 8,
    bottom: 8,
  },
  addButton: {
    borderRadius: 16,
    position: "absolute",
    right: 8,
    bottom: 8,
  },
});
