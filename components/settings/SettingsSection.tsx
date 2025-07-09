import { useModeStore } from "@/store/modeStore";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";

interface ISettingsSectionProps extends PropsWithChildren {}

const SettingsSection: React.FunctionComponent<ISettingsSectionProps> = ({
  children,
}) => {
  const theme = useTheme();
  const { mode } = useModeStore();
  return (
    <Surface
      style={[
        styles.surface,
        {
          backgroundColor:
            mode === "dark" ? theme.colors.secondaryContainer : "white",
          borderColor: mode === "dark" ? "#64656f" : "#d4d4d4",
        },
      ]}
      elevation={1}
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
    borderStyle: "solid",
    borderColor: "#d4d4d4",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
