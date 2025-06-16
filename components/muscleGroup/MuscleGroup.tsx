import { globalStyles } from "@/styles/globalStyles";
import { Link, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  FAB,
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

import { getExerciseGroupTranslationKeyById } from "@/helpers/utils/muscleGroup/getExerciseGroupNameById";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";
import EmptyExercise from "./EmptyExercise";

export default function MuscleGroup() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const groupId = Array.isArray(id) ? id[0] : (id as string);

  const [exerciseSearch, setExerciseSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [deleteExerciseName, setDeleteExerciseName] = useState<string>("");
  const [deleteExerciseId, setDeleteExerciseId] = useState<string>("");
  const [addExerciseVisible, setAddExerciseVisible] = useState<boolean>(false);
  const debounceExerciseSearch = useDebounce(exerciseSearch, 300);

  const { t } = useTranslation("muscleGroupTab");

  const translationKey = getExerciseGroupTranslationKeyById(groupId);
  const groupName = t(`muscleGroup.${translationKey}`);

  const { userId } = useAuthStore();
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
          <Text style={globalStyles.h2}>{groupName}</Text>
          <Searchbar
            elevation={1}
            placeholder={t("muscleGroup.search")}
            value={exerciseSearch}
            onChangeText={setExerciseSearch}
            style={styles.search}
          />
          <Text style={styles.subTitle}>{t("muscleGroup.subTitle")}</Text>

          {isLoading ? (
            <View style={{ marginVertical: 150 }}>
              <ActivityIndicator
                size="large"
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </View>
          ) : data?.length === 0 ? (
            <View style={{ marginVertical: 150 }}>
              <EmptyExercise
                title={t("muscleGroup.emptyTitle")}
                text={t("muscleGroup.emptyText")}
              />
            </View>
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
                        variant="titleMedium"
                        style={[
                          styles.exerciseText,
                          { color: theme.colors.primary },
                        ]}
                      >
                        {name}
                      </Text>
                      <View style={styles.iconContainer}>
                        <IconButton
                          icon="delete"
                          size={26}
                          iconColor={theme.colors.secondary}
                          onPress={() => showDialog(name, id)}
                        />
                        <IconButton
                          icon="chevron-right"
                          style={{ margin: 0, padding: 0 }}
                          size={25}
                        />
                      </View>
                    </Surface>
                  </Link>
                )
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
      <FAB
        icon="plus"
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
    justifyContent: "center",
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
    paddingLeft: 16,
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
    right: 16,
    bottom: 16,
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
