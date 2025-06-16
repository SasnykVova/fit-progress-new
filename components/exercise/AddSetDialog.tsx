import { TAddSetSchema } from "@/helpers/schemas/addSetSchema";
import { useAddExerciseSet } from "@/services/exercise/addExerciseSet";
import { useAuthStore } from "@/store/authStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
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
          <Button onPress={handleCloseModal} disabled={isPending}>
            {t("exercise.cancel")}
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            loading={isPending}
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
                  style={{ height: 40 }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
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
                  style={{ height: 40 }}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
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
