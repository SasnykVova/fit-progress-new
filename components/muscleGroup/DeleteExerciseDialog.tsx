import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useDeleteExercise } from "@/services/muscleGroup/DeleteExercise";
import { useAuthStore } from "@/store/authStore";
import { Trans, useTranslation } from "react-i18next";
import Dialog from "../ui/Dialog";

interface IDeleteExerciseDialogProps {
  visible?: boolean;
  onClose?: () => void;
  deleteExerciseName?: string;
  setDeleteExerciseName: (name: string) => void;
  deleteExerciseId: string;
  setDeleteExerciseId: (id: string) => void;
}

const DeleteExerciseDialog: React.FunctionComponent<
  IDeleteExerciseDialogProps
> = ({
  visible,
  onClose,
  deleteExerciseName,
  setDeleteExerciseName,
  deleteExerciseId,
  setDeleteExerciseId,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("muscleGroupTab");
  const {
    mutate: deleteExercise,
    isPending,
    isSuccess,
    reset,
  } = useDeleteExercise();
  const { userId } = useAuthStore();
  const handleDeleteExercise = () => {
    const deleteExerciseData = {
      userId,
      exerciseId: deleteExerciseId,
    };
    deleteExercise(deleteExerciseData);
  };

  useEffect(() => {
    if (isSuccess) {
      setDeleteExerciseId("");
      setDeleteExerciseName("");
      onClose?.();
      reset();
    }
  }, [isSuccess, setDeleteExerciseId, onClose, setDeleteExerciseName, reset]);

  return (
    <Dialog
      title={t("muscleGroup.deleteExercise")}
      visible={visible}
      onDismiss={onClose}
      actions={
        <View style={styles.actionContainer}>
          <Button onPress={onClose}>{t("muscleGroup.cancel")}</Button>
          <Button
            onPress={handleDeleteExercise}
            disabled={isPending}
            loading={isPending}
          >
            {t("muscleGroup.delete")}
          </Button>
        </View>
      }
    >
      <Text>
        <Trans
          i18nKey="muscleGroup.deleteExConfirmText"
          ns="muscleGroupTab"
          values={{ exerciseName: deleteExerciseName }}
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

export default DeleteExerciseDialog;
