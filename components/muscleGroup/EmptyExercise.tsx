import { useModeStore } from "@/store/modeStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

interface IEmptyExerciseProps {
  title?: string;
  text?: string;
}

const EmptyExercise: React.FunctionComponent<IEmptyExerciseProps> = ({
  title,
  text,
}) => {
  const theme = useTheme();
  const { mode } = useModeStore();
  return (
    <View style={styles.emptyContainer}>
      <Icon
        source="clipboard-text-off-outline"
        size={40}
        color={theme.colors.tertiary}
      />
      <Text
        style={[styles.emptyTitle, { color: mode === "white" ? "" : "white" }]}
      >
        {title}
      </Text>
      <Text
        style={[styles.emptyText, { color: mode === "white" ? "" : "white" }]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default EmptyExercise;
