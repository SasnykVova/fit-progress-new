import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Gap from "./Gap";

interface IConfirmResetPasswordDialogProps {
  open: boolean;
  close: () => void;
}

const ConfirmResetPasswordDialog: React.FunctionComponent<
  IConfirmResetPasswordDialogProps
> = ({ open, close }) => {
  const theme = useTheme();
  const { t } = useTranslation("home");
  const { mode } = useModeStore();
  const router = useRouter();

  if (!open) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <View
        style={[
          styles.body,
          {
            backgroundColor:
              mode === "dark" ? theme.colors.secondaryContainer : "white",
            borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
          },
        ]}
      >
        <MaterialCommunityIcons
          name="email-check-outline"
          color={theme.colors.primary}
          size={40}
          style={{ alignSelf: "center", marginBottom: 16 }}
        />
        <Text
          variant="titleMedium"
          style={[styles.text, { color: mode === "dark" ? "#fff" : "" }]}
        >
          {t("resetePasswordScreen.emailSendSuccess")}
        </Text>
        <Gap />
        <Text
          variant="bodySmall"
          style={[styles.text, { color: mode === "dark" ? "#fff" : "" }]}
        >
          {t("resetePasswordScreen.sendDialogSuccessText")}
        </Text>
        <Gap />
        <Button onPress={close}>{t("resetePasswordScreen.closeBtn")}</Button>
        <Button onPress={() => router.replace("/(authorization)/login")}>
          {t("resetePasswordScreen.backBtn")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
  },
  text: {
    paddingHorizontal: 16,
    textAlign: "center",
  },
});

export default ConfirmResetPasswordDialog;
