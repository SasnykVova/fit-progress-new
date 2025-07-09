import { useAddExercise } from "@/services/muscleGroup/AddExercise";
import { useModeStore } from "@/store/modeStore";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import Dialog from "../ui/Dialog";

interface IAddExFrom {
  name: string;
}

interface IAddExerciseDialogProps {
  visible: boolean;
  onDismiss?: () => void;
  onClose?: () => void;
}

const AddExerciseDialog: React.FunctionComponent<IAddExerciseDialogProps> = ({
  visible,
  onDismiss,
}) => {
  const { control, handleSubmit, reset } = useFormContext<IAddExFrom>();
  const { t } = useTranslation("muscleGroupTab");
  const { mode } = useModeStore();
  const theme = useTheme();
  const {
    mutate: addExercise,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useAddExercise();

  const { id } = useLocalSearchParams();

  const groupId = Array.isArray(id) ? id[0] : (id as string);

  const onSubmit = async (data: IAddExFrom) => {
    console.log("Exercise name", data);
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      alert("Користувача не знайдено");
      return;
    }
    const addExerciseData = {
      userId: userId,
      name: data.name,
      groupId: groupId,
    };
    addExercise(addExerciseData);
  };

  useEffect(() => {
    if (isSuccess) {
      onDismiss?.();
      reset();
      resetMutation();
    }
  }, [isSuccess, reset, onDismiss, resetMutation]);

  return (
    <Dialog
      title={t("muscleGroup.addExercise")}
      visible={visible}
      onDismiss={onDismiss}
      actions={
        <View style={styles.actionContainer}>
          <Button
            onPress={onDismiss}
            disabled={isPending}
            labelStyle={{
              color: isPending ? theme.colors.surfaceDisabled : "",
            }}
          >
            {t("muscleGroup.cancel")}
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            loading={isPending}
            style={[
              isPending &&
                mode === "dark" && {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
            ]}
          >
            {t("muscleGroup.add")}
          </Button>
        </View>
      }
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <>
            <TextInput
              label={t("muscleGroup.exerciseName")}
              placeholder={t("muscleGroup.exerciseNamePlaceholder")}
              mode="outlined"
              style={[
                {
                  height: 40,
                  backgroundColor:
                    mode === "dark" ? theme.colors.secondaryContainer : "white",
                  borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                },
              ]}
              contentStyle={{ color: mode === "dark" ? "white" : "" }}
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
