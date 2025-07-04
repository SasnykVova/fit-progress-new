import { auth } from "@/firebase/firebaseConfig";
import { initI18n } from "@/i18n";
import { useModeStore } from "@/store/modeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function AppLayout() {
  const theme = useTheme();
  const { mode } = useModeStore();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (loading || !ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(authorization)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#d4d4d4",

        tabBarStyle: {
          backgroundColor: mode === "white" ? "#fafaf9" : "#0a0a0a",
        },
        headerStyle: {
          backgroundColor: mode === "white" ? "#fafaf9" : "#0a0a0a",
        },
        headerTintColor: mode === "white" ? "#0a0a0a" : "#d4d4d4",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="(exercises)"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="apps" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
