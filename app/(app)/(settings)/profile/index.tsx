import BMIBadge from "@/components/settings/BMIBadge";
import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import { bmiFormSchema, TbmiFormSchema } from "@/helpers/schemas/bmiFormSchema";
import { calculateBMI } from "@/helpers/utils/settings/calculateBMI";
import { useGetUserDataById } from "@/services/authService/getUserData";
import { useUpdateUserProfile } from "@/services/authService/updateUserProfile";
import { useAuthStore } from "@/store/authStore";
import { useModeStore } from "@/store/modeStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  SegmentedButtons,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function ProfilePage() {
  const { mode } = useModeStore();
  const theme = useTheme();
  const { t } = useTranslation("settingsTab");

  const [succesSnackbar, setSuccesSnackbar] = useState<boolean>(false);
  const [errorSnackbar, setErrorSnackbar] = useState<boolean>(false);

  const { userName, userId } = useAuthStore();

  const { data: userData, isPending: userDataPending } =
    useGetUserDataById(userId);
  const {
    mutate: updateUserProfile,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUpdateUserProfile();

  const {
    control,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
    handleSubmit,
  } = useForm<TbmiFormSchema>({
    defaultValues: {
      name: "",
      height: "",
      weight: "",
      gender: "",
    },
    resolver: zodResolver(bmiFormSchema),
  });

  const height = watch("height");
  const weight = watch("weight");
  const gender = watch("gender");

  const BMI = calculateBMI(height, weight, gender, t);

  const submit = (data: TbmiFormSchema) => {
    const updateData = {
      uid: userId,
      height: data.height ?? "",
      weight: data.weight ?? "",
      name: data.name,
      gender: data.gender ?? "",
    };
    updateUserProfile(updateData);
  };

  useEffect(() => {
    if (userData) {
      reset({
        name: userName,
        height: userData.height,
        weight: userData.weight,
        gender: userData.gender,
      });
    }
  }, [reset, userName, userData]);

  useEffect(() => {
    if (isSuccess) {
      setSuccesSnackbar(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setErrorSnackbar(true);
    }
  }, [isError]);

  const isDisabled = !isDirty || isPending || !isValid;

  return (
    <PageContainer>
      <SettingPageLaoyut title={t("profileScreen.profile")}>
        {userDataPending ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 200,
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.wrapper}>
              <Controller
                name="name"
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
                    label={t("profileScreen.name")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={isPending}
                    underlineColor={theme.colors.tertiary}
                    outlineColor="#fff"
                    dense={true}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
              <SafeAreaView style={styles.container}>
                <Text
                  variant="labelLarge"
                  style={[
                    { alignSelf: "flex-start", marginBottom: 8 },
                    { color: mode === "white" ? "" : "white" },
                  ]}
                >
                  {t("profileScreen.gender")}
                </Text>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { value, onChange } }) => (
                    <SegmentedButtons
                      value={value}
                      onValueChange={onChange}
                      style={styles.segmentsBtn}
                      buttons={[
                        {
                          value: "male",
                          label: t("profileScreen.male"),
                          style: {
                            borderRadius: 6,
                            backgroundColor:
                              value === "male" ? theme.colors.secondary : "",
                            borderColor: mode === "dark" ? "#fff" : "",
                          },
                          labelStyle: {
                            color:
                              mode === "dark" && value === "male"
                                ? ""
                                : mode === "dark"
                                ? "#fff"
                                : "",
                          },
                        },
                        {
                          value: "female",
                          label: t("profileScreen.female"),
                          style: {
                            borderRadius: 6,
                            backgroundColor:
                              value === "female" ? theme.colors.secondary : "",
                            borderColor: mode === "dark" ? "#fff" : "",
                          },
                          labelStyle: {
                            color:
                              mode === "dark" && value === "female"
                                ? ""
                                : mode === "dark"
                                ? "#fff"
                                : "",
                          },
                        },
                      ]}
                    />
                  )}
                />
              </SafeAreaView>
              <Controller
                name="height"
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
                    label={t("profileScreen.height")}
                    keyboardType="numbers-and-punctuation"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={isPending}
                    underlineColor={theme.colors.tertiary}
                    outlineColor="#fff"
                    dense={true}
                  />
                )}
              />
              {errors.height && (
                <Text style={styles.error}>{errors.height.message}</Text>
              )}
              <Controller
                name="weight"
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
                    label={t("profileScreen.weight")}
                    keyboardType="numbers-and-punctuation"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={isPending}
                    underlineColor={theme.colors.tertiary}
                    outlineColor="#fff"
                    dense={true}
                  />
                )}
              />
              {errors.weight && (
                <Text style={styles.error}>{errors.weight.message}</Text>
              )}
              <View style={styles.bodyIndexBox}>
                <Text
                  variant="titleMedium"
                  style={[{ color: mode === "white" ? "" : "white" }]}
                >
                  {t("profileScreen.bmi")}
                </Text>
                <Text
                  variant="bodySmall"
                  style={[{ color: mode === "white" ? "" : "white" }]}
                >
                  {t("profileScreen.noBMI")}
                </Text>
                {BMI && (
                  <View style={styles.bmiCountBox}>
                    <Text
                      variant="titleMedium"
                      style={[{ color: mode === "white" ? "" : "white" }]}
                    >
                      {t("profileScreen.yourBMI")}
                    </Text>
                    <Text style={[{ color: mode === "white" ? "" : "white" }]}>
                      {BMI?.bmi}
                    </Text>
                    <Text style={[{ color: mode === "white" ? "" : "white" }]}>
                      {BMI?.category}
                    </Text>
                    <BMIBadge bmi={BMI?.category} />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </SettingPageLaoyut>
      <Snackbar
        visible={succesSnackbar}
        onDismiss={() => setSuccesSnackbar(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: theme.colors.primary }]}
      >
        <Text
          style={{
            fontWeight: "500",
            color: "white",
          }}
        >
          Profile info updated
        </Text>
      </Snackbar>
      <Snackbar
        visible={errorSnackbar}
        onDismiss={() => setErrorSnackbar(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: theme.colors.primary }]}
      >
        <Text
          style={{
            fontWeight: "500",
            color: "white",
          }}
        >
          {error?.message}
        </Text>
      </Snackbar>

      <Button
        style={[
          styles.saveBtn,
          isDisabled &&
            mode === "dark" && {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
        ]}
        mode="contained"
        labelStyle={{ fontSize: 20, color: "#fff" }}
        contentStyle={{ height: 50 }}
        disabled={isDisabled}
        loading={isPending}
        onPress={handleSubmit(submit)}
      >
        {t("profileScreen.saveChanges")}
      </Button>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  segmentsBtn: {},
  saveBtn: {
    position: "absolute",
    bottom: 16,
    left: 16,
    width: "100%",
    borderRadius: 8,
  },
  input: {},
  error: {
    color: "red",
    fontWeight: "300",
  },
  bodyIndexBox: {
    alignItems: "center",
    gap: 16,
  },
  bmiCountBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  snackbar: {
    position: "absolute",
    bottom: 80,
    left: 8,
    width: "100%",
  },
});
