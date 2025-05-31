import { Link } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

interface IMuscleGroupData {
  id: string;
  name: string;
  spec?: string;
}

export default function ExercisesTab() {
  const theme = useTheme();

  const muscleGroupData: IMuscleGroupData[] = [
    { id: "1", name: "Hands" },
    { id: "2", name: "Legs" },
    { id: "3", name: "Body", spec: "(front side)" },
    { id: "4", name: "Body", spec: "(back side)" },
    { id: "5", name: "Cardio" },
    { id: "6", name: "Other" },
  ];
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth / 2 - 32;

  return (
    <View style={[styles.exercises, { backgroundColor: "#fff" }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Select exercise group</Text>
      </View>
      <View style={styles.groupContainer}>
        {muscleGroupData.map(({ id, name, spec }) => (
          <Link
            key={id}
            href={{ pathname: "/(app)/(exercises)/[id]", params: { id } }}
          >
            <Surface
              style={[
                styles.surface,
                { backgroundColor: theme.colors.primaryContainer },
                { width: itemWidth },
                { height: itemWidth },
              ]}
              elevation={2}
            >
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.colors.primary }]}>
                  {name}
                </Text>
                {spec && (
                  <Text style={[styles.title, { color: theme.colors.primary }]}>
                    {spec}
                  </Text>
                )}
              </View>
            </Surface>
          </Link>
        ))}
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
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  groupContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  surface: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 1,
    textAlign: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
