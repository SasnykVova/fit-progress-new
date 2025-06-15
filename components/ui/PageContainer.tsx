import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

interface IPageContainerProps extends PropsWithChildren {}

const PageContainer: React.FunctionComponent<IPageContainerProps> = ({
  children,
}) => {
  return (
    <View style={[styles.settings, { backgroundColor: "#fff" }]}>
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
