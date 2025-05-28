import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Gap from "../components/ui/Gap";

export default function NotFoundPage() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Page not found.</Text>
      <Gap />
      <Link href="/(app)/(home)" asChild>
        <Button>Go to home page.</Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
