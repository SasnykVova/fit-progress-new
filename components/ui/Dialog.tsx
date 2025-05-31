import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Dialog as PaperDialog } from "react-native-paper";

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
  return (
    <PaperDialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
      <PaperDialog.Title>{title}</PaperDialog.Title>
      <PaperDialog.Content>{children && children}</PaperDialog.Content>
      <PaperDialog.Actions>{actions && actions}</PaperDialog.Actions>
    </PaperDialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 16,
  },
});

export default Dialog;
