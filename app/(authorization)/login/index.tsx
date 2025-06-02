import { useLogin } from "@/services/authService/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import Gap from "../../../components/ui/Gap";
import {
  loginSchema,
  TLoginSchema,
} from "../../../helpers/schemas/LoginSchema";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { mutate: login, isPending, isSuccess } = useLogin();

  const theme = useTheme();
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

  useEffect(() => {
    if (isSuccess) {
      router.replace("/");
      reset();
    }
  }, [isSuccess, router, reset]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: theme.colors.primary }]}
          variant="titleMedium"
        >
          Login
        </Text>
        <Gap />
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Email"
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
              style={styles.input}
              mode="outlined"
              label="Password"
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
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
        >
          LOGIN
        </Button>
        <Gap />
        <Divider horizontalInset />
        <Gap />
        <Button style={styles.button} mode="outlined" icon="google">
          Sing up with google
        </Button>
        <View style={styles.registerContainer}>
          <Text
            style={[styles.noAccText, { color: theme.colors.secondary }]}
          >{`Don't have an account?`}</Text>
          <Button
            labelStyle={styles.singUpButton}
            onPress={() => router.replace("/(authorization)/signUp")}
          >
            Sign up
          </Button>
        </View>
      </View>
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
