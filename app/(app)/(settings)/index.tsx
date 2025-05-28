import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function SettingsTab() {
  return (
    <View>
      <Text>SettingsTab</Text>
      <Button style={{ width: 200 }} mode="contained">
        Log out
      </Button>
    </View>
  );
}
