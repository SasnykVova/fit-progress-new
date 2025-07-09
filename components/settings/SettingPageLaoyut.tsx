import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

interface ISettingPageLaoyutProps {
  title: string;
  children: ReactNode;
}

const SettingPageLaoyut: React.FunctionComponent<ISettingPageLaoyutProps> = ({
  children,
  title,
}) => {
  const router = useRouter();
  const { mode } = useModeStore();
  const { t } = useTranslation("home");
  return (
    <View style={styles.root}>
      <Button
        style={styles.backButton}
        icon={({ color }) => (
          <MaterialCommunityIcons name="chevron-left" color={color} size={30} />
        )}
        onPress={() => router.replace("/(app)/(settings)")}
      >
        {t("settings")}
      </Button>
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: mode === "dark" ? "white" : "" }]}
          variant="titleLarge"
        >
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
  },
  header: {
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    position: "relative",
    left: -16,
  },
  title: {
    alignSelf: "center",
    fontWeight: "700",
  },
});

export default SettingPageLaoyut;
