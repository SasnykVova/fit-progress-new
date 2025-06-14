import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useDeleteExerciseSet } from "@/services/exercise/deleteExerciseSet";
import { useAuthStore } from "@/store/authStore";
import { useLocalSearchParams } from "expo-router";
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
          {deleteSetNumber}
        </Text>{" "}
        set ?
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
