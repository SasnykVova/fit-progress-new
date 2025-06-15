import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";

interface ISettingsSectionProps extends PropsWithChildren {}

const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = ({
  children,
}) => {
  const theme = useTheme();
  return (
    <Surface
      style={[
        styles.surface,
        { borderColor: theme.colors.primary, borderWidth: 1 },
      ]}
      elevation={4}
    >
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
  },
});
