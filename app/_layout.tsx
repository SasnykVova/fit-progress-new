import { getThemeByName } from "@/helpers/utils/general/getThemeByName";
import { useThemeStore } from "@/store/themeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { themeName } = useThemeStore();
  const theme = getThemeByName(themeName);
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
