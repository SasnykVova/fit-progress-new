import ConfirmDeleteAccountDialog from "@/components/settings/ConfirmDeleteAccountDialog";
import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const DeleteAccount: React.FunctionComponent = (props) => {
  const { mode } = useModeStore();
  const { t } = useTranslation("settingsTab");

  const [confirmDeleteDialog, setConfirmDeleteDialog] =
    useState<boolean>(false);

  const handleOpen = () => {
    setConfirmDeleteDialog(true);
  };
  const handleClose = () => {
    setConfirmDeleteDialog(false);
  };

  return (
    <PageContainer>
      <SettingPageLaoyut title={t("deleteAccountScreen.deleteAccount")}>
        <View style={styles.wrapper}>
          <Text
            style={[{ color: mode === "white" ? "" : "white" }]}
            variant="titleMedium"
          >
            {t("deleteAccountScreen.subTitle")}
          </Text>
          <MaterialCommunityIcons
            name="arrow-down-thin"
            size={40}
            color={mode === "white" ? "" : "white"}
          />
          <Button
            style={[styles.button, { backgroundColor: "#dc2626" }]}
            mode="contained"
            icon="delete"
            labelStyle={{ fontSize: 20, color: "#fff" }}
            contentStyle={{ height: 50 }}
            onPress={handleOpen}
          >
            {t("deleteAccountScreen.deleteAccBtn")}
          </Button>
        </View>
      </SettingPageLaoyut>
      {confirmDeleteDialog && (
        <ConfirmDeleteAccountDialog
          visible={confirmDeleteDialog}
          onClose={handleClose}
        />
      )}
    </PageContainer>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    width: "100%",
  },
  wrapper: {
    paddingTop: 24,
    gap: 16,
    alignItems: "center",
  },
});
