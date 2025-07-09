import { useModeStore } from "@/store/modeStore";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Dialog as PaperDialog, useTheme } from "react-native-paper";

interface IDialogProps {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  visible?: boolean;
  onDismiss?: () => void;
}

const Dialog: React.FunctionComponent<IDialogProps> = ({
  title,
  children,
  actions,
  visible = false,
  onDismiss,
}) => {
  const theme = useTheme();
  const { mode } = useModeStore();
  return (
    <PaperDialog
      visible={visible}
      onDismiss={onDismiss}
      style={[
        styles.dialog,
        {
          backgroundColor: mode === "dark" ? theme.colors.onPrimary : "white",
          borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
        },
      ]}
    >
      <PaperDialog.Title
        style={[styles.title, { color: mode === "white" ? "" : "white" }]}
      >
        {title}
      </PaperDialog.Title>
      <PaperDialog.Content>{children && children}</PaperDialog.Content>
      <PaperDialog.Actions>{actions && actions}</PaperDialog.Actions>
    </PaperDialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
  },
  title: {
    fontWeight: "700",
  },
});

export default Dialog;
