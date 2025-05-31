import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

export default function AppLayout() {
  const theme = useTheme();

  const user = true;

  if (!user) {
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
