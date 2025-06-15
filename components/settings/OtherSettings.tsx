import { Route, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, Text, useTheme } from "react-native-paper";
import SettingsSection from "./SettingsSection";

interface IOtherSettingsProps {}

const OtherSettings: React.FunctionComponent<IOtherSettingsProps> = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const otherSettingsData = [
    {
      name: "Password",
      icon: "lock-outline",
      href: "/",
    },
    {
      name: "Themes",
      icon: "palette-outline",
      href: "/",
    },
    { name: "Language", icon: "web", href: "/(app)/(settings)/language" },
    {
      name: "Deactivate my account",
      icon: "delete-outline",
      href: "/",
    },
  ];
  return (
    <View style={styles.otherSettings}>
      <Text variant="titleMedium">OtherSettings</Text>
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
                      name === "Deactivate my account"
                        ? theme.colors.error
                        : theme.colors.secondary
                    }
                    icon={icon}
                    style={styles.iconButton}
                  />
                  <Text
                    variant="titleMedium"
                    style={{
                      color:
                        name === "Deactivate my account"
                          ? theme.colors.error
                          : "",
                    }}
                  >
                    {name}
                  </Text>
                </View>
                <IconButton
                  icon="chevron-right"
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
