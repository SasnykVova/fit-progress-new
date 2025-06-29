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
  return (
    <PaperDialog
      visible={visible}
      onDismiss={onDismiss}
      style={[styles.dialog, { backgroundColor: theme.colors.secondary }]}
    >
      <PaperDialog.Title style={styles.title}>{title}</PaperDialog.Title>
      <PaperDialog.Content>{children && children}</PaperDialog.Content>
      <PaperDialog.Actions>{actions && actions}</PaperDialog.Actions>
    </PaperDialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
  },
  title: {
    fontWeight: "700",
  },
});

export default Dialog;
