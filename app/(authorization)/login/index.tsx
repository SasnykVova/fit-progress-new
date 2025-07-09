import ConfirmEmailDialog from "@/components/ui/ConfirmEmailDialog";
import { auth } from "@/firebase/firebaseConfig";
import { getLoginErrorMessage } from "@/helpers/utils/login/getLoginErrorMessage";
import { useLogin } from "@/services/authService/login";
import { useModeStore } from "@/store/modeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { sendEmailVerification } from "firebase/auth";
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
import Gap from "../../../components/ui/Gap";
import {
  loginSchema,
  TLoginSchema,
} from "../../../helpers/schemas/LoginSchema";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [notConfirmedSnackbar, setNotConfirmedSnackbar] =
    useState<boolean>(false);
  const [resentMessageSnackbar, setResentMessageSnackbar] =
    useState<boolean>(false);

  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const { mutate: login, isPending, isSuccess, isError, error } = useLogin();

  const theme = useTheme();
  const { mode } = useModeStore();
  const { t } = useTranslation("home");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TLoginSchema) => {
    login(data);
  };

  const handleConfirm = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        setShowVerifyModal(false);
        router.replace("/");
      } else {
        setNotConfirmedSnackbar(true);
      }
    }
  };

  const handleResendMessage = async () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      setResentMessageSnackbar(true);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      setShowVerifyModal(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
      reset();
    }
  }, [isSuccess, router, reset]);

  useEffect(() => {
    if (isError) {
      setVisible(true);
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
      <ConfirmEmailDialog
        isConfirm={showVerifyModal}
        handleConfirm={handleConfirm}
        handleResendMessage={handleResendMessage}
      />
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: mode === "dark" ? "#fff" : "" }]}
          variant="titleMedium"
        >
          {t("loginScreen.login")}
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
        <Gap />
        <Controller
          name="password"
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
              label={t("loginScreen.password")}
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
        <Gap size={32} />
        <Button
          style={styles.button}
          labelStyle={{ color: "#fff" }}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
        >
          {t("loginScreen.loginBtn")}
        </Button>
        <Gap />
        <View style={styles.registerContainer}>
          <Text style={[styles.noAccText, { color: theme.colors.tertiary }]}>
            {t("loginScreen.forgotPass")}
          </Text>
          <Button
            labelStyle={styles.singUpButton}
            onPress={() => router.replace("/(authorization)/resetPassword")}
          >
            {t("loginScreen.resetIt")}
          </Button>
        </View>
        <Divider horizontalInset />

        {/* <Button style={styles.button} mode="outlined" icon="google">
          Sing up with google
        </Button> */}

        <View style={styles.registerContainer}>
          <Text style={[styles.noAccText, { color: theme.colors.tertiary }]}>
            {t("loginScreen.noAcc")}
          </Text>
          <Button
            labelStyle={styles.singUpButton}
            onPress={() => router.replace("/(authorization)/signUp")}
          >
            {t("loginScreen.signUp")}
          </Button>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.primary }}
      >
        <Text style={{ fontWeight: "500", color: "white" }}>
          {getLoginErrorMessage(error?.message)}
        </Text>
      </Snackbar>
      <Portal>
        <Snackbar
          visible={notConfirmedSnackbar}
          onDismiss={() => setNotConfirmedSnackbar(false)}
          duration={3000}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "white",
            }}
          >
            {t("loginScreen.emailNotConfirmed")}
          </Text>
        </Snackbar>
      </Portal>
      <Portal>
        <Snackbar
          visible={resentMessageSnackbar}
          onDismiss={() => setResentMessageSnackbar(false)}
          duration={3000}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "white",
            }}
          >
            {t("loginScreen.resentLetter")}
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
  input: {
    height: 35,
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
  error: {
    color: "red",
    fontWeight: "300",
  },
});
