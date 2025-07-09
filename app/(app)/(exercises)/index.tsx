import { useModeStore } from "@/store/modeStore";
import { globalStyles } from "@/styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";

interface IMuscleGroupData {
  name: string;
  spec?: string;
}

export default function ExercisesTab() {
  const theme = useTheme();
  const { mode } = useModeStore();

  const { t } = useTranslation("muscleGroupTab");

  const muscleGroupsData = t("muscleGroups", {
    returnObjects: true,
  }) as IMuscleGroupData[];

  return (
    <View
      style={[
        styles.exercises,
        {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text
          style={[globalStyles.h2, { color: mode === "white" ? "" : "white" }]}
        >
          {t("selectMuscleGroup")}
        </Text>
      </View>
      <View style={styles.groupContainer}>
        {Array.isArray(muscleGroupsData) &&
          muscleGroupsData?.map(({ name, spec }, index) => {
            const id = (index + 1).toString();
            return (
              <Link
                key={index}
                href={{ pathname: "/(app)/(exercises)/[id]", params: { id } }}
                style={styles.link}
              >
                <Surface
                  style={[
                    styles.surface,
                    {
                      backgroundColor:
                        mode === "dark"
                          ? theme.colors.secondaryContainer
                          : "white",
                      borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
                    },
                  ]}
                  elevation={1}
                >
                  <View
                    style={[
                      styles.decor,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                  <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.title,
                          { color: mode === "dark" ? "white" : "" },
                        ]}
                      >
                        {name}
                      </Text>
                      {spec && (
                        <Text
                          style={[
                            styles.title,
                            { color: mode === "dark" ? "white" : "" },
                          ]}
                        >
                          {spec}
                        </Text>
                      )}
                    </View>
                    <IconButton
                      icon={({ color }) => (
                        <MaterialCommunityIcons
                          name="chevron-right"
                          color={theme.colors.primary}
                          size={30}
                        />
                      )}
                    />
                  </View>
                </Surface>
              </Link>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exercises: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    paddingBottom: 32,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
  },
  groupContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  link: {},
  decor: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 7,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  surface: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderStyle: "solid",

    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: 1,
    textAlign: "center",
  },
  itemContainer: {
    paddingLeft: 16,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
