import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Dialog from "../ui/Dialog";

interface IAddExerciseDialogProps {
  visible: boolean;
  onDismiss?: () => void;
  onClose?: () => void;
}

const AddExerciseDialog: React.FunctionComponent<IAddExerciseDialogProps> = ({
  visible,
  onDismiss,
}) => {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = (data: any) => {
    console.log("Exercise name", data);
  };

  return (
    <Dialog
      title="Add exercise"
      visible={visible}
      onDismiss={onDismiss}
      actions={
        <View style={styles.actionContainer}>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSubmit(onSubmit)}>Add</Button>
        </View>
      }
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <>
            <TextInput
              label="Name"
              placeholder="Enter the name of the exercise"
              mode="outlined"
              style={{ height: 40 }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {fieldState.error && (
              <Text style={{ color: "red" }}>{fieldState.error.message}</Text>
            )}
          </>
        )}
      />
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

export default AddExerciseDialog;
