import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface IEmptyExerciseProps {
  title?: string;
  text?: string;
}

const EmptyExercise: React.FunctionComponent<IEmptyExerciseProps> = ({
  title,
  text,
}) => {
  return (
    <View style={styles.emptyContainer}>
      <Icon source="clipboard-text-off-outline" size={40} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{text}</Text>
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
