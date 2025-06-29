import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";

interface ISettingsSectionProps extends PropsWithChildren {}

const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = ({
  children,
}) => {
  const theme = useTheme();
  return (
    <Surface style={[styles.surface]} elevation={1}>
      {children}
    </Surface>
  );
};

export default SettingsSection;

const styles = StyleSheet.create({
  surface: {
    paddingVertical: 16,
    paddingLeft: 16,
    width: "100%",
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#d4d4d4",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
