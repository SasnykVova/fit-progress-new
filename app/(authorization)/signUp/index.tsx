import { StyleSheet, View } from "react-native";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

import { getRegisterErrorMessage } from "@/helpers/utils/register/getRegisterErrorMessage";
import { useSignUp } from "@/services/authService/register";
import { useModeStore } from "@/store/modeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Gap from "../../../components/ui/Gap";
import {
  signUpSchema,
  TSignUpSchema,
} from "../../../helpers/schemas/signUpSchema";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation("home");
  const { mode } = useModeStore();

  const { mutate: signUp, isPending, isSuccess, isError, error } = useSignUp();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpSchema) => {
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
    };
    signUp(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(authorization)/login");
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
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: mode === "dark" ? "#fff" : "" }]}
          variant="titleMedium"
        >
          {t("signUpScreen.signUp")}
        </Text>
        <Gap />
        <Text style={[styles.creteAc, { color: theme.colors.tertiary }]}>
          {t("signUpScreen.createAcc")}
        </Text>
        <Gap />
        <Controller
          name="name"
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
              label={t("signUpScreen.name")}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              disabled={isPending}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
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
              label={t("signUpScreen.email")}
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
              label={t("signUpScreen.password")}
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
        <Gap />
        <Controller
          name="repeatPassword"
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
              label={t("signUpScreen.repeatPass")}
              secureTextEntry={!repeatPasswordVisible}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              disabled={isPending}
              right={
                <TextInput.Icon
                  icon={repeatPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setRepeatPasswordVisible((prev) => !prev)}
                />
              }
            />
          )}
        />
        {errors.repeatPassword && (
          <Text style={styles.error}>{errors.repeatPassword.message}</Text>
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
          {t("signUpScreen.signUpBtn")}
        </Button>
        <View style={styles.loginContainer}>
          <Text style={[styles.noAccText, { color: theme.colors.tertiary }]}>
            {t("signUpScreen.haveAcc")}
          </Text>
          <Button
            labelStyle={styles.singUpButton}
            onPress={() => router.replace("/(authorization)/login")}
          >
            {t("signUpScreen.signIn")}
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
          {getRegisterErrorMessage(error?.message)}
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  creteAc: {
    textAlign: "center",
  },
  input: {
    height: 35,
  },
  button: {
    borderRadius: 4,
    fontWeight: "400",
  },
  loginContainer: {
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
