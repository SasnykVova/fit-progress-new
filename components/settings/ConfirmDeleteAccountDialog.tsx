import {
  deleteAccountPasswordSchema,
  TDeleteAccountPasswordSchema,
} from "@/helpers/schemas/DeleteAccountPasswordSchema";
import { useDeleteAccount } from "@/services/settings/deleteAccount";
import { useModeStore } from "@/store/modeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import Dialog from "../ui/Dialog";
import Gap from "../ui/Gap";

interface IConfirmDeleteAccountDialogProps {
  visible?: boolean;
  onClose?: () => void;
}

const ConfirmDeleteAccountDialog: React.FunctionComponent<
  IConfirmDeleteAccountDialogProps
> = ({ visible, onClose }) => {
  const { t } = useTranslation("settingsTab");
  const { mode } = useModeStore();
  const theme = useTheme();

  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TDeleteAccountPasswordSchema>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteAccountPasswordSchema),
  });

  const handleDeleteAccount = (data: TDeleteAccountPasswordSchema) => {
    const { password } = data;
    deleteAccount(password);
  };
  return (
    <Dialog
      title={t("deleteAccountScreen.deleteAccount")}
      visible={visible}
      onDismiss={onClose}
      actions={
        <View style={styles.actionContainer}>
          <Button onPress={onClose}>{t("deleteAccountScreen.cancel")}</Button>
          <Button
            onPress={handleSubmit(handleDeleteAccount)}
            disabled={isPending || !isValid}
            loading={isPending}
            labelStyle={{
              color: isPending || !isValid ? theme.colors.surfaceDisabled : "",
            }}
          >
            {t("deleteAccountScreen.delete")}
          </Button>
        </View>
      }
    >
      <Text style={[{ color: mode === "white" ? "" : "white" }]}>
        {t("deleteAccountScreen.confirmText")}
      </Text>
      <Gap />
      <Text
        style={[{ marginBottom: 8, color: mode === "white" ? "" : "white" }]}
      >
        {t("deleteAccountScreen.enterPass")}
      </Text>
      <Controller
        name="password"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  mode === "dark" ? theme.colors.secondaryContainer : "white",
                borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
              },
            ]}
            contentStyle={{ color: mode === "dark" ? "white" : "" }}
            mode="outlined"
            label={t("deleteAccountScreen.password")}
            secureTextEntry={!passwordVisible}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            disabled={isPending}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible((prev) => !prev)}
              />
            }
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
    </Dialog>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  input: {
    height: 35,
  },
  error: {
    color: "red",
    fontWeight: "300",
  },
});

export default ConfirmDeleteAccountDialog;
