import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useDeleteExerciseSet } from "@/services/exercise/deleteExerciseSet";
import { useAuthStore } from "@/store/authStore";
import { useLocalSearchParams } from "expo-router";
import { Trans, useTranslation } from "react-i18next";
import Dialog from "../ui/Dialog";

interface IDeleteSetDialogProps {
  visible?: boolean;
  onClose?: () => void;
  deleteSetNumber: string;
  setDeleteExerciseName?: (name: string) => void;
  deleteSetId?: string;
  setDeleteSetId?: (id: string) => void;
}

const DeleteSetDialog: React.FunctionComponent<IDeleteSetDialogProps> = ({
  visible,
  onClose,
  deleteSetNumber,
  setDeleteExerciseName,
  deleteSetId,
  setDeleteSetId,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("muscleGroupTab");
  const {
    mutate: deleteExerciseSet,
    isPending,
    isSuccess,
    reset,
  } = useDeleteExerciseSet();

  const { exerciseId: id } = useLocalSearchParams();

  const exerciseId = Array.isArray(id) ? id[0] : (id as string);

  const { userId } = useAuthStore();

  const handleDeleteExercise = () => {
    const deleteExerciseData = {
      userId,
      exerciseId: exerciseId,
      setNumber: deleteSetNumber,
    };
    deleteExerciseSet?.(deleteExerciseData);
  };

  useEffect(() => {
    if (isSuccess) {
      setDeleteSetId?.("");
      setDeleteExerciseName?.("");
      onClose?.();
      reset();
    }
  }, [isSuccess, setDeleteSetId, onClose, setDeleteExerciseName, reset]);

  return (
    <Dialog
      title={t("exercise.deleteSet")}
      visible={visible}
      onDismiss={onClose}
      actions={
        <View style={styles.actionContainer}>
          <Button onPress={onClose}>{t("exercise.cancel")}</Button>
          <Button
            onPress={handleDeleteExercise}
            disabled={isPending}
            loading={isPending}
          >
            {t("exercise.delete")}
          </Button>
        </View>
      }
    >
      <Text>
        <Trans
          i18nKey="exercise.deleteSetText"
          ns="muscleGroupTab"
          values={{ setNumber: deleteSetNumber }}
          components={{
            name: (
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: theme.colors.secondary,
                }}
              >
                {""}
              </Text>
            ),
          }}
        />
      </Text>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});

export default DeleteSetDialog;
