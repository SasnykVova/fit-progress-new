import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import Dialog from "../ui/Dialog";

interface IDeleteExerciseDialogProps {
  visible?: boolean;
  onClose?: () => void;
  deleteExerciseName?: string;
  onConfirm?: () => void;
}

const DeleteExerciseDialog: React.FunctionComponent<
  IDeleteExerciseDialogProps
> = ({ visible, onClose, deleteExerciseName, onConfirm }) => {
  return (
    <Dialog
      title="Delete exercise"
      visible={visible}
      onDismiss={onClose}
      actions={
        <View style={styles.actionContainer}>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={onConfirm}>Delete</Button>
        </View>
      }
    >
      <Text>Do you really want to delete {deleteExerciseName} exercise ?</Text>
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
