import ConfirmResetPasswordDialog from "@/components/ui/ConfirmResetPasswordDialog";
import Gap from "@/components/ui/Gap";
import {
  resetPassSchema,
  TResetPassSchema,
} from "@/helpers/schemas/resetPassSchema";
import { useResetPasswordByEmail } from "@/services/authService/resetPasswordByEmail";
import { useModeStore } from "@/store/modeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  Portal,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function ResetPasswordPage() {
  const { mode } = useModeStore();
  const theme = useTheme();
  const { t } = useTranslation("home");
  const router = useRouter();

  const [resetDialogVisible, setResetDialogVisible] = useState<boolean>(false);
  const [visibleSnack, setVisibleSnack] = useState<boolean>(false);

  const {
    mutate: resetPasswordByEmail,
    isPending,
    isSuccess,
    isError,
    error,
  } = useResetPasswordByEmail();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TResetPassSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(resetPassSchema),
  });

  const handleOpenResetPasswordDialog = () => {
    setResetDialogVisible(true);
  };

  const handleClosedResetPasswordDialog = () => {
    setResetDialogVisible(false);
  };

  const onSubmit = (data: TResetPassSchema) => {
    const { email } = data;
    resetPasswordByEmail(email);
  };

  useEffect(() => {
    if (isSuccess) {
      handleOpenResetPasswordDialog();
      reset();
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (isError) {
      setVisibleSnack(true);
    }
  }, [isError, reset]);

  return (
    <View
      style={[
        styles.page,
        {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
      ]}
    >
      <ConfirmResetPasswordDialog
        open={resetDialogVisible}
        close={handleClosedResetPasswordDialog}
      />
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: mode === "dark" ? "#fff" : "" }]}
          variant="titleMedium"
        >
          {t("resetePasswordScreen.resetPassTitle")}
        </Text>
        <Gap />
        <Text style={[styles.creteAc, { color: theme.colors.tertiary }]}>
          {t("resetePasswordScreen.weSent")}
        </Text>
        <Gap />
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={[
                {
                  height: 40,
                  backgroundColor:
                    mode === "dark" ? theme.colors.secondaryContainer : "white",
                  borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                },
              ]}
              contentStyle={{ color: mode === "dark" ? "white" : "" }}
              mode="outlined"
              label={t("loginScreen.email")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              disabled={isPending}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Gap size={32} />
        <Button
          style={styles.button}
          labelStyle={{ color: "#fff" }}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
        >
          {t("resetePasswordScreen.resetPassBtn")}
        </Button>
        <Gap />
        <Divider horizontalInset />
        <View style={styles.registerContainer}>
          <Text style={[styles.noAccText, { color: theme.colors.tertiary }]}>
            {t("resetePasswordScreen.backToLogin")}
          </Text>
          <Button
            labelStyle={styles.singUpButton}
            onPress={() => router.replace("/(authorization)/login")}
          >
            {t("resetePasswordScreen.loginLink")}
          </Button>
        </View>
      </View>
      <Portal>
        <Snackbar
          visible={visibleSnack}
          onDismiss={() => setVisibleSnack(false)}
          duration={3000}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text style={{ fontWeight: "500", color: "white" }}>
            {error?.message}
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  container: {
    width: 350,
    textAlign: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontWeight: "300",
  },
  creteAc: {
    textAlign: "center",
  },
  button: {
    borderRadius: 4,
    fontWeight: "900",
  },
  registerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noAccText: {
    marginRight: 8,
  },
  singUpButton: {
    textDecorationLine: "underline",
  },
});
