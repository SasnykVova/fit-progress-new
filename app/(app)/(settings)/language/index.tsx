import SettingPageLaoyut from "@/components/settings/SettingPageLaoyut";
import PageContainer from "@/components/ui/PageContainer";
import { changeAppLanguage } from "@/i18n";
import { ELanguages, useLanguageStore } from "@/store/languageStore";
import { useModeStore } from "@/store/modeStore";
import React, { PropsWithChildren, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, RadioButton, Text, useTheme } from "react-native-paper";

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
  const { mode } = useModeStore();

  const handleChange = (value: ELanguages) => {
    changeAppLanguage(value);
  };

  useEffect(() => {
    if (selected === undefined) {
      setLanguage(ELanguages.en);
    }
  }, [selected, setLanguage]);

  const radioBtnItemsData = [
    { label: "Українська", value: ELanguages.uk },
    { label: "English", value: ELanguages.en },
  ];

  return (
    <PageContainer>
      <SettingPageLaoyut title="Language">
        <View>
          <Text
            variant="titleMedium"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Select language:
          </Text>
          <View>
            {radioBtnItemsData.map(({ label, value }, i) => (
              <React.Fragment key={label}>
                <RadioButton.Item
                  label={label}
                  value={value}
                  status={selected === value ? "checked" : "unchecked"}
                  onPress={() => handleChange(value)}
                  labelStyle={{ color: mode === "dark" ? "white" : "" }}
                />
                {radioBtnItemsData.length - 1 !== i && (
                  <Divider style={{ backgroundColor: "#a3a3a3", height: 1 }} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </SettingPageLaoyut>
    </PageContainer>
  );
};

export default Language;

const styles = StyleSheet.create({
  radioButton: {},
});
