import { auth } from "@/firebase/firebaseConfig";
import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function AppLayout() {
  const theme = useTheme();
  const { mode } = useModeStore();
  const { t } = useTranslation("home");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // 🔁 ОНОВЛЕННЯ КОРИСТУВАЧА ЗАВДЯКИ .reload()
        await firebaseUser.reload();
        const updatedUser = auth.currentUser;
        setUser(updatedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(authorization)/login" />;
  }

  if (!user?.emailVerified) {
    return <Redirect href="/(authorization)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#d4d4d4",

        tabBarStyle: {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
        headerStyle: {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
        headerTintColor: mode === "white" ? theme.colors.onPrimary : "#d4d4d4",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="(exercises)"
        options={{
          title: t("exercises"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="apps" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
