import { useModeStore } from "@/store/modeStore";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface IPageContainerProps extends PropsWithChildren {}

const PageContainer: React.FunctionComponent<IPageContainerProps> = ({
  children,
}) => {
  const { mode } = useModeStore();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.settings,
        {
          backgroundColor:
            mode === "white" ? "#fafaf9" : theme.colors.onPrimary,
        },
      ]}
    >
      <View style={styles.wrapper}>{children}</View>
    </View>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  settings: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
