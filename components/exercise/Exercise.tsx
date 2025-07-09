import { addSetSchema, TAddSetSchema } from "@/helpers/schemas/addSetSchema";
import { useGetExerciseSets } from "@/services/exercise/getExerciseSets";
import { useAuthStore } from "@/store/authStore";
import { useModeStore } from "@/store/modeStore";
import { globalStyles } from "@/styles/globalStyles";
import { ISet } from "@/types/exercise/exerciseTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  FAB,
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
  const { mode } = useModeStore();
  const { t } = useTranslation("muscleGroupTab");
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
  console.log("55", data);

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
    <View
      style={[
        styles.muscleGroup,
        {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.exreciseGroup}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <Text
            style={[
              globalStyles.h2,
              { color: mode === "white" ? "" : "white" },
            ]}
          >
            {data?.name}
          </Text>
          <Text
            style={[
              styles.subTitle,
              { color: mode === "white" ? "" : "white" },
            ]}
          >
            {t("exercise.sets")}
          </Text>

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
          ) : data?.sets?.length === 0 ? (
            <View style={{ marginTop: 150 }}>
              <EmptyExercise
                title={t("exercise.emptySetsTitle")}
                text={t("exercise.emptySetsText")}
              />
            </View>
          ) : (
            <View style={styles.setsContainer}>
              {data?.sets?.map(({ setNumber, weight, reps, id }, i) => (
                <Surface
                  key={setNumber}
                  style={[
                    styles.set,
                    {
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  elevation={1}
                >
                  <Text
                    style={[
                      styles.textMedium,
                      { color: mode === "dark" ? "white" : "" },
                    ]}
                  >
                    {t("exercise.set")} {setNumber}
                  </Text>
                  <View style={styles.resultContainer}>
                    <Text
                      style={[
                        styles.textMedium,
                        { color: mode === "dark" ? "white" : "" },
                      ]}
                    >
                      {t("exercise.weight")}
                    </Text>
                    <Text style={[{ color: mode === "dark" ? "white" : "" }]}>
                      {weight} {t("exercise.kg")}
                    </Text>
                  </View>
                  <View style={styles.resultContainer}>
                    <Text
                      style={[
                        styles.textMedium,
                        { color: mode === "dark" ? "white" : "" },
                      ]}
                    >
                      {t("exercise.reps")}
                    </Text>
                    <Text style={[{ color: mode === "dark" ? "white" : "" }]}>
                      {reps}
                    </Text>
                  </View>
                  <View style={styles.btnContainer}>
                    <IconButton
                      icon="square-edit-outline"
                      size={26}
                      iconColor={theme.colors.primary}
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
                      icon={() => (
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={26}
                          color={
                            data?.sets?.length - 1 !== i
                              ? theme.colors.surfaceDisabled
                              : "#dc2626"
                          }
                        />
                      )}
                      size={26}
                      iconColor={"#dc2626"}
                      onPress={() => handleOpenDeleteSetVisible(setNumber, id)}
                      disabled={data?.sets?.length - 1 !== i}
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
          setCount={data?.sets?.length}
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
      <FAB
        icon="timer-outline"
        style={styles.timerButton}
        onPress={() => router.push("/(app)/(exercises)/stopwatch")}
      />
      <FAB
        icon="plus"
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
    borderStyle: "solid",
    borderColor: "#d4d4d4",
    borderWidth: 1,
    backgroundColor: "white",
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
    left: 16,
    bottom: 16,
  },
  addButton: {
    borderRadius: 16,
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
