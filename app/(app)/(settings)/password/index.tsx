import SelectLayout from "@/components/settings/SelectLayout";
import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import {
  changePasswordSchema,
  TChangePasswordSchema,
} from "@/helpers/schemas/ChangePasswordSchema";
import { useChangePassword } from "@/services/settings/changePassword";
import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Portal,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function PasswordPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [repeatNewPasswordVisible, setRepeatNewPasswordVisible] =
    useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [successSnack, setSuccessSnack] = useState<boolean>(false);

  const { mode } = useModeStore();
  const theme = useTheme();
  const { t } = useTranslation("settingsTab");

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    mode: "onTouched",
  });

  const { mutate, isPending, isSuccess, isError, error } = useChangePassword();

  const submit = (data: TChangePasswordSchema) => {
    const updatePassword = {
      currentPassword: data.password,
      newPassword: data.newPassword,
    };
    mutate(updatePassword);
  };

  useEffect(() => {
    if (isError) {
      setVisible(true);
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      setSuccessSnack(true);
      reset();
    }
  }, [isSuccess, setSuccessSnack, reset]);

  return (
    <PageContainer>
      <SettingPageLaoyut title={t("passwordScreen.password")}>
        <SelectLayout
          title={t("passwordScreen.changePass")}
          style={styles.changePassContainer}
        >
          <View style={[styles.changePassContainer]}>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  contentStyle={{ color: mode === "dark" ? "white" : "" }}
                  dense={true}
                  label={t("passwordScreen.currentPass")}
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
            <Controller
              name="newPassword"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  contentStyle={{ color: mode === "dark" ? "white" : "" }}
                  dense={true}
                  label={t("passwordScreen.newPass")}
                  secureTextEntry={!newPasswordVisible}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isPending}
                  right={
                    <TextInput.Icon
                      icon={newPasswordVisible ? "eye-off" : "eye"}
                      onPress={() => setNewPasswordVisible((prev) => !prev)}
                    />
                  }
                />
              )}
            />
            {errors.newPassword && (
              <Text style={styles.error}>{errors.newPassword.message}</Text>
            )}
            <Controller
              name="repeatNewPassword"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  contentStyle={{ color: mode === "dark" ? "white" : "" }}
                  dense={true}
                  label={t("passwordScreen.repeatNewPass")}
                  secureTextEntry={!repeatNewPasswordVisible}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  disabled={isPending}
                  right={
                    <TextInput.Icon
                      icon={newPasswordVisible ? "eye-off" : "eye"}
                      onPress={() =>
                        setRepeatNewPasswordVisible((prev) => !prev)
                      }
                    />
                  }
                />
              )}
            />
            {errors.repeatNewPassword && (
              <Text style={styles.error}>
                {errors.repeatNewPassword.message}
              </Text>
            )}
          </View>
          <Button
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons
                name="key-change"
                size={26}
                color="#fff"
              />
            )}
            labelStyle={{ fontSize: 20, color: "#fff" }}
            contentStyle={{ height: 50 }}
            style={[styles.title]}
            disabled={isPending || !isValid}
            loading={isPending}
            onPress={handleSubmit(submit)}
          >
            {t("passwordScreen.changePassBtn")}
          </Button>
        </SelectLayout>
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={3000}
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Text style={{ fontWeight: "500", color: "white" }}>
              {error?.message}
            </Text>
          </Snackbar>
        </Portal>
        <Portal>
          <Snackbar
            visible={successSnack}
            onDismiss={() => setSuccessSnack(false)}
            duration={3000}
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Text style={{ fontWeight: "500", color: "white" }}>
              {t("passwordScreen.updateSuccess")}
            </Text>
          </Snackbar>
        </Portal>
      </SettingPageLaoyut>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  changePassContainer: {
    paddingBottom: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    gap: 12,
  },
  input: {},
  error: {
    color: "red",
    fontWeight: "300",
  },
  title: {
    marginTop: 32,
    width: "100%",
    borderRadius: 10,
  },
});
