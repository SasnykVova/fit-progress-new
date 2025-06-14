import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useDeleteExercise } from "@/services/muscleGroup/DeleteExercise";
import { useAuthStore } from "@/store/authStore";
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
      title="Delete exercise"
      visible={visible}
      onDismiss={onClose}
      actions={
        <View style={styles.actionContainer}>
          <Button onPress={onClose}>Cancel</Button>
          <Button
            onPress={handleDeleteExercise}
            disabled={isPending}
            loading={isPending}
          >
            Delete
          </Button>
        </View>
      }
    >
      <Text>
        Do you really want to delete{" "}
        <Text
          style={{
            textDecorationLine: "underline",
            color: theme.colors.secondary,
          }}
        >
          {deleteExerciseName}
        </Text>{" "}
        exercise ?
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
