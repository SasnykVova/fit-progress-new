import { useLoguot } from "@/services/authService/logout";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function SettingsTab() {
  const router = useRouter();
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
    <View>
      <Text>SettingsTab</Text>
      <Button
        style={{ width: 200 }}
        mode="contained"
        onPress={handleLogout}
        loading={isPending}
      >
        Log out
      </Button>
    </View>
  );
}
