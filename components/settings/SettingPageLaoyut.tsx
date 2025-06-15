import { useRouter } from "expo-router";
import { ReactNode } from "react";
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
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Button
          style={styles.backButton}
          icon="chevron-left"
          onPress={() => router.replace("/(app)/(settings)")}
        >
          Settings
        </Button>
        <Text style={styles.title} variant="titleLarge">
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
    gap: 20,
  },
  header: {
    paddingVertical: 16,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: -28,
  },
  title: {
    alignSelf: "center",
    fontWeight: "700",
  },
});

export default SettingPageLaoyut;
