import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

interface IConfirmEmailDialogProps {
  isConfirm: boolean;
  handleConfirm: () => void;
  handleResendMessage: () => void;
}

const ConfirmEmailDialog: React.FunctionComponent<IConfirmEmailDialogProps> = ({
  isConfirm,
  handleConfirm,
  handleResendMessage,
}) => {
  const theme = useTheme();
  const { t } = useTranslation("home");
  const { mode } = useModeStore();

  if (!isConfirm) {
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
          name="emoticon-sad-outline"
          color={theme.colors.primary}
          size={40}
          style={{ alignSelf: "center", marginBottom: 16 }}
        />

        <Text
          variant="titleMedium"
          style={[styles.text, { color: mode === "dark" ? "#fff" : "" }]}
        >
          {t("loginScreen.noConfDialog")}
        </Text>
        <Text
          variant="titleMedium"
          style={[styles.text, { color: mode === "dark" ? "#fff" : "" }]}
        >
          {t("loginScreen.checkEmail")}
        </Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleConfirm}
          labelStyle={{ color: "#fff" }}
        >
          {t("loginScreen.confirmedBtn")}
        </Button>
        <Button style={styles.resendBtn} onPress={handleResendMessage}>
          {t("loginScreen.resMesBtn")}
        </Button>
      </View>
    </View>
  );
};

export default ConfirmEmailDialog;

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
  button: {
    marginTop: 32,
    borderRadius: 8,
  },
  resendBtn: {
    marginTop: 16,
    alignSelf: "center",
  },
});
