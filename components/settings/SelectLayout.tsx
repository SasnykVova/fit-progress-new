import { useModeStore } from "@/store/modeStore";
import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface ISelectLayoutProps {
  children: ReactNode;
  title: string;
  style?: ViewStyle;
}

const SelectLayout: React.FunctionComponent<ISelectLayoutProps> = ({
  children,
  title,
  style,
}) => {
  const { mode } = useModeStore();
  return (
    <View style={styles.selectLayout}>
      <Text
        variant="titleMedium"
        style={[{ color: mode === "dark" ? "white" : "" }]}
      >
        {title}
      </Text>
      <View style={style}>{children}</View>
    </View>
  );
};

export default SelectLayout;

const styles = StyleSheet.create({
  selectLayout: {
    gap: 16,
  },
});
