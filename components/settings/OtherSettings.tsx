import { useModeStore } from "@/store/modeStore";
import { Route, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, Text, useTheme } from "react-native-paper";
import SettingsSection from "./SettingsSection";

interface IOtherSettingsProps {}

const OtherSettings: React.FunctionComponent<IOtherSettingsProps> = (props) => {
  const { mode } = useModeStore();
  const { t } = useTranslation("settingsTab");
  const theme = useTheme();
  const router = useRouter();

  const otherSettingsData = [
    {
      name: t("password"),
      icon: "lock-outline",
      href: "/(app)/(settings)/password",
    },
    {
      name: t("appearance"),
      icon: "palette-outline",
      href: "/themes",
    },
    { name: t("languages"), icon: "web", href: "/(app)/(settings)/language" },
    {
      name: t("deleteAccount"),
      icon: "delete-outline",
      href: "/deleteAccount",
    },
  ];
  return (
    <View style={styles.otherSettings}>
      <Text
        variant="titleMedium"
        style={[{ color: mode === "white" ? "" : "white" }]}
      >
        {t("otherSettings")}
      </Text>
      <SettingsSection>
        <View style={styles.childContainer}>
          {otherSettingsData.map(({ name, icon, href }, index) => (
            <TouchableOpacity
              key={name}
              onPress={() => router.replace(href as Route)}
            >
              <View style={styles.settingItemContainer}>
                <View style={styles.iconTextContainer}>
                  <IconButton
                    iconColor={
                      name === t("deleteAccount")
                        ? theme.colors.error
                        : "#a3a3a3"
                    }
                    icon={icon}
                    style={styles.iconButton}
                  />
                  <Text
                    variant="titleMedium"
                    style={{
                      color:
                        name === t("deleteAccount")
                          ? theme.colors.error
                          : mode === "dark"
                          ? "#fff"
                          : "",
                    }}
                  >
                    {name}
                  </Text>
                </View>
                <IconButton
                  icon="chevron-right"
                  iconColor={theme.colors.primary}
                  style={{ padding: 0, margin: 0 }}
                />
              </View>
              {otherSettingsData.length - 1 !== index && (
                <View style={{ paddingRight: 16 }}>
                  <Divider />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </SettingsSection>
    </View>
  );
};

export default OtherSettings;

const styles = StyleSheet.create({
  otherSettings: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  childContainer: {
    marginVertical: -8,
  },
  settingItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 0,
    marginLeft: -10,
    marginRight: 0,
  },
});
