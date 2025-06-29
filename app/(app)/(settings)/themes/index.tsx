import SelectLayout from "@/components/settings/SelectLayout";
import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import { useModeStore } from "@/store/modeStore";
import { TThemeName, useThemeStore } from "@/store/themeStore";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Divider, Switch, Text } from "react-native-paper";

interface IThemesDate {
  label: string;
  hex: string;
  value: TThemeName;
}

export default function ThemesPage() {
  const themesDate: IThemesDate[] = [
    { label: "Purple  (default)", hex: "#8b5cf6", value: "purple" },
    { label: "Blue", hex: "#3b82f6", value: "blue" },
    { label: "Pink", hex: "#ec4899", value: "pink" },
  ];

  const { mode, toggleMode } = useModeStore();
  const { themeName, setTheme } = useThemeStore();

  const onToggleSwitch = () => {
    toggleMode();
  };

  return (
    <PageContainer>
      <SettingPageLaoyut title="Themes">
        <View style={[styles.actionContainer]}>
          <View style={styles.selectLayout}>
            <Text
              variant="titleMedium"
              style={[{ color: mode === "dark" ? "white" : "" }]}
            >
              Select theme:
            </Text>
            <View style={styles.colorsContainer}>
              {themesDate.map(({ label, hex, value }, i) => (
                <View key={label}>
                  <Pressable
                    style={styles.color}
                    onPress={() => setTheme(value)}
                  >
                    <Text
                      style={[
                        styles.colorText,
                        { color: mode === "dark" ? "white" : "" },
                      ]}
                    >
                      {label}
                    </Text>
                    <View style={[styles.decor, { backgroundColor: hex }]}>
                      {themeName === value && (
                        <MaterialIcons
                          name="check"
                          size={17}
                          color="white"
                          style={styles.check}
                        />
                      )}
                    </View>
                  </Pressable>
                  {themesDate.length - 1 !== i && (
                    <Divider
                      style={{ backgroundColor: "#a3a3a3", height: 1 }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
          <SelectLayout title="Select mode:" style={styles.selectModeContainer}>
            <Button
              icon="white-balance-sunny"
              onPress={onToggleSwitch}
              disabled={mode === "white"}
            >
              Light
            </Button>

            <Switch
              value={mode === "white" ? false : true}
              onValueChange={onToggleSwitch}
            />
            <Button
              icon="moon-waxing-crescent"
              onPress={onToggleSwitch}
              disabled={mode === "dark"}
              style={{
                backgroundColor: mode === "dark" ? "#334155" : undefined,
                opacity: mode === "dark" ? 1 : undefined,
              }}
              labelStyle={{
                color: mode === "dark" ? "#cbd5e1" : undefined,
              }}
            >
              Dark
            </Button>
          </SelectLayout>
        </View>
      </SettingPageLaoyut>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    gap: 32,
  },
  selectLayout: {
    gap: 16,
  },
  colorsContainer: {
    gap: 4,
  },
  color: {
    width: "100%",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  colorText: {
    fontSize: 18,
    fontWeight: "300",
  },
  decor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  check: {},
  selectModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
});
