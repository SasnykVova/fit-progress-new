import OtherSettings from "@/components/settings/OtherSettings";
import { getInitials } from "@/helpers/utils/general/getUserInitials";
import { useLoguot } from "@/services/authService/logout";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

export default function SettingsTab() {
  const router = useRouter();
  const theme = useTheme();
  const { mutate: logout, isPending, isSuccess } = useLoguot();

  const { userName } = useAuthStore();

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
        <View style={styles.profileContainer}>
          <Text variant="titleLarge" style={styles.titleLarge}>
            Profile
          </Text>
          <Link href={".."}>
            <Surface
              style={[
                styles.surface,
                { borderColor: theme.colors.primary, borderWidth: 1 },
              ]}
              elevation={4}
            >
              <View style={styles.userAvatarContainer}>
                <Avatar.Text size={44} label={getInitials(userName)} />
                <Text variant="headlineSmall">{userName}</Text>
              </View>
              <IconButton
                icon="chevron-right"
                style={{ margin: 0, padding: 0 }}
                size={30}
              />
            </Surface>
          </Link>
        </View>
        <OtherSettings />
        <Button
          style={styles.logoutButton}
          mode="contained"
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
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: 10,
    width: "100%",
  },
  titleLarge: {
    fontWeight: "700",
  },
  surface: {
    paddingVertical: 16,
    paddingLeft: 16,
    width: "100%",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAvatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});
