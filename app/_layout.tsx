import { getThemeByName } from "@/helpers/utils/general/getThemeByName";
import { initI18n } from "@/i18n";
import { useModeStore } from "@/store/modeStore";
import { useThemeStore } from "@/store/themeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { themeName } = useThemeStore();
  const theme = getThemeByName(themeName);
  const [ready, setReady] = useState(false);
  const { mode } = useModeStore();

  useEffect(() => {
    initI18n().then(() => setReady(true));
  }, []);

  if (!ready) {
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

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
