import { TAddSetSchema } from "@/helpers/schemas/addSetSchema";
import { useAddExerciseSet } from "@/services/exercise/addExerciseSet";
import { useAuthStore } from "@/store/authStore";
import { useModeStore } from "@/store/modeStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import Dialog from "../ui/Dialog";

interface IAddSetDialogProps {
  visible: boolean;
  onDismiss?: () => void;
  onClose?: () => void;
  setCount: number | undefined;
}

const AddSetDialog: React.FunctionComponent<IAddSetDialogProps> = ({
  visible,
  onDismiss,
  onClose,
  setCount = 0,
}) => {
  const { control, handleSubmit, reset } = useFormContext<TAddSetSchema>();
  const { t } = useTranslation("muscleGroupTab");
  const { mode } = useModeStore();
  const theme = useTheme();
  const {
    mutate: addExerciseSet,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useAddExerciseSet();

  const { userId } = useAuthStore();

  const { exerciseId: id } = useLocalSearchParams();

  const exerciseId = Array.isArray(id) ? id[0] : (id as string);

  const onSubmit = async (data: TAddSetSchema) => {
    if (!userId) {
      alert("Користувача не знайдено");
      return;
    }
    const newSet = {
      setNumber: (setCount + 1).toString(),
      id: Date.now().toString(),
      ...data,
    };

    const addExerciseSetData = {
      userId,
      exerciseId,
      newSet,
    };
    addExerciseSet(addExerciseSetData);
  };

  const handleCloseModal = () => {
    onClose?.();
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      onDismiss?.();
      reset();
      resetMutation();
      onClose?.();
    }
  }, [isSuccess, reset, onDismiss, resetMutation, onClose]);

  return (
    <Dialog
      title={t("exercise.addSet")}
      visible={visible}
      onDismiss={onDismiss}
      actions={
        <View style={styles.actionContainer}>
          <Button
            onPress={handleCloseModal}
            disabled={isPending}
            labelStyle={{
              color: isPending ? theme.colors.surfaceDisabled : "",
            }}
          >
            {t("exercise.cancel")}
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
            {t("exercise.add")}
          </Button>
        </View>
      }
    >
      <View style={styles.inputWrapper}>
        <View>
          <Controller
            name="weight"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <>
                <TextInput
                  label={t("exercise.weightField")}
                  placeholder={t("exercise.weightPlaceholder")}
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  style={[
                    {
                      height: 40,
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  contentStyle={{ color: mode === "dark" ? "white" : "" }}
                />
                {fieldState.error && (
                  <Text style={{ color: "red" }}>
                    {fieldState.error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
        <View>
          <Controller
            name="reps"
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState }) => (
              <>
                <TextInput
                  label={t("exercise.repField")}
                  placeholder={t("exercise.repsPlaceHolder")}
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  style={[
                    {
                      height: 40,
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  contentStyle={{ color: mode === "dark" ? "white" : "" }}
                />
                {fieldState.error && (
                  <Text style={{ color: "red" }}>
                    {fieldState.error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  inputWrapper: {
    gap: 16,
  },
});

export default AddSetDialog;
