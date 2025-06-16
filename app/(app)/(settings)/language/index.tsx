import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import { changeAppLanguage } from "@/i18n";
import { ELanguages, useLanguageStore } from "@/store/languageStore";
import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text, useTheme } from "react-native-paper";

interface ILanguageProps extends PropsWithChildren {
  title: string;
}

const Language: React.FunctionComponent<ILanguageProps> = ({
  children,
  title,
}) => {
  const selected = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const theme = useTheme();

  const handleChange = (value: ELanguages) => {
    changeAppLanguage(value);
  };

  useEffect(() => {
    if (selected === undefined) {
      setLanguage(ELanguages.en);
    }
  }, [selected, setLanguage]);
  return (
    <PageContainer>
      <SettingPageLaoyut title="Language">
        <View>
          <Text variant="titleMedium">Select language:</Text>
          <View>
            <RadioButton.Item
              label="Українська"
              value={ELanguages.uk}
              status={selected === ELanguages.uk ? "checked" : "unchecked"}
              onPress={() => handleChange(ELanguages.uk)}
              style={[
                styles.radioButton,
                { borderColor: theme.colors.secondary },
              ]}
            />
            <RadioButton.Item
              label="English"
              value={ELanguages.en}
              status={selected === ELanguages.en ? "checked" : "unchecked"}
              onPress={() => handleChange(ELanguages.en)}
              style={[
                styles.radioButton,
                { borderColor: theme.colors.secondary },
              ]}
            />
          </View>
        </View>
      </SettingPageLaoyut>
    </PageContainer>
  );
};

export default Language;

const styles = StyleSheet.create({
  radioButton: {
    borderBottomWidth: 1,
  },
});
