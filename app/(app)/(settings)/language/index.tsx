import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

interface ILanguageProps extends PropsWithChildren {
  title: string;
}

const Language: React.FunctionComponent<ILanguageProps> = ({
  children,
  title,
}) => {
  const [value, setValue] = useState("ukrainian");
  return (
    <PageContainer>
      <SettingPageLaoyut title="Language">
        <View>
          <Text variant="titleMedium">Select language:</Text>
          <View>
            <RadioButton.Group
              onValueChange={(value) => setValue(value)}
              value={value}
            >
              <RadioButton.Item label="Ukrainian" value="ukrainian" />
              <RadioButton.Item label="English" value="english" />
            </RadioButton.Group>
          </View>
        </View>
      </SettingPageLaoyut>
    </PageContainer>
  );
};

export default Language;

const styles = StyleSheet.create({});
