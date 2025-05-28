import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Gap from "../../../components/ui/Gap";
import {
  signUpSchema,
  TSignUpSchema,
} from "../../../helpers/schemas/signUpSchema";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpSchema) => {
    console.log("Sign up form data", data);
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
    };
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: theme.colors.primary }]}
          variant="titleMedium"
        >
          Sign up
        </Text>
        <Gap />
        <Text style={[styles.creteAc, { color: theme.colors.secondary }]}>
          Create an account
        </Text>
        <Gap />
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
              style={styles.input}
              mode="outlined"
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
              style={styles.input}
              mode="outlined"
              label="Password"
              secureTextEntry={!repeatPasswordVisible}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
        <Button style={styles.button} mode="contained">
          SIGN UP
        </Button>
        <View style={styles.loginContainer}>
          <Text
            style={[styles.noAccText, { color: theme.colors.secondary }]}
          >{`Already have an accaunt?`}</Text>
          <Button
            labelStyle={styles.singUpButton}
            onPress={() => router.replace("/(authorization)/login")}
          >
            Sign in
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
