import { useLoguot } from "@/services/authService/logout";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

export default function SettingsTab() {
  const router = useRouter();
  const theme = useTheme();
  const { mutate: logout, isPending, isSuccess } = useLoguot();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/(authorization)/login");
    }
  }, [isSuccess, router]);

  return (
    <View style={[styles.settings, { backgroundColor: "#fff" }]}>
      <View style={styles.wrapper}>
        <Text>SettingsTab</Text>
        <Button
          style={styles.logoutButton}
          onPress={handleLogout}
          icon="logout"
          loading={isPending}
          labelStyle={{ fontSize: 20 }}
          contentStyle={{ height: 50 }}
        >
          Log out
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: 10,
    width: "100%",
  },
});
