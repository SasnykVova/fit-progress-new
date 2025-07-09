import { useAuthStore } from "@/store/authStore";
import { useModeStore } from "@/store/modeStore";
import { globalStyles } from "@/styles/globalStyles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const { mode } = useModeStore();

  const { userName } = useAuthStore();
  const data = t("intro.features", { returnObjects: true });
  const title = t("intro.title");

  const tapData = t("tapOnExercise.features", { returnObjects: true });
  const tapTitle = t("tapOnExercise.title");

  return (
    <View
      style={[
        styles.home,
        {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
      ]}
    >
      <View style={styles.wrapper}>
        <View>
          <Text
            style={[globalStyles.h2, { color: mode === "dark" ? "white" : "" }]}
          >
            {t("welcome")}
          </Text>
          <Text style={[globalStyles.h2, { color: theme.colors.primary }]}>
            {userName}
          </Text>
        </View>

        <View style={styles.textBlockWrapper}>
          <Text
            variant="titleMedium"
            style={[{ color: mode === "dark" ? "white" : "" }]}
          >
            {title}
          </Text>
          <View>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <Text
                  key={index}
                  style={[{ color: mode === "dark" ? "white" : "" }]}
                >
                  {item}
                </Text>
              ))}
          </View>
          <Text
            variant="titleMedium"
            style={[{ color: mode === "dark" ? "white" : "" }]}
          >
            {tapTitle}
          </Text>
          <View>
            {Array.isArray(tapData) &&
              tapData.map((item, index) => (
                <Text
                  key={index}
                  style={[{ color: mode === "dark" ? "white" : "" }]}
                >
                  {item}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 60,
  },
  textBlockWrapper: {
    alignItems: "center",
    gap: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Home;
