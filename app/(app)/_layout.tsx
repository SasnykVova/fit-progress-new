import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function AppLayout() {
  const theme = useTheme();

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!isAuth) {
    return <Redirect href="/(authorization)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerTintColor: theme.colors.primary,
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
        name="(settings)/index"
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
