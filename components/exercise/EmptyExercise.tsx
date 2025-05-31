import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface IEmptyExerciseProps {}

const EmptyExercise: React.FunctionComponent<IEmptyExerciseProps> = (props) => {
  return (
    <View style={styles.emptyContainer}>
      <Icon source="clipboard-text-off-outline" size={40} />
      <Text style={styles.emptyTitle}>Your exercise list is empty.</Text>
      <Text style={styles.emptyText}>
        To create a new exercise, tap the plus icon at the bottom right.
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
