import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { ELanguages, useLanguageStore } from "./store/languageStore";

import enHome from "./locales/en/home.json";
import ukHome from "./locales/uk/home.json";

import enMuscleGroupTab from "./locales/en/muscleGroupTab.json";
import ukMuscleGroupTab from "./locales/uk/muscleGroupTab.json";

import enSettingsTab from "./locales/en/settingsTab.json";
import ukSettingsTab from "./locales/uk/settingsTab.json";

export const initI18n = async () => {
  const storedLang = useLanguageStore.getState().language;

  const fallbackLang = "en";
  const systemLang = Localization.getLocales()[0]?.languageCode;
  const detectedLang =
    storedLang || (systemLang === "uk" ? "uk" : fallbackLang);

  // eslint-disable-next-line import/no-named-as-default-member
  return i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    lng: detectedLang,
    fallbackLng: ELanguages.en,
    ns: ["home", "muscleGroupTab", "settingsTab"],

    resources: {
      en: {
        home: enHome,
        muscleGroupTab: enMuscleGroupTab,
        settingsTab: enSettingsTab,
      },
      uk: {
        home: ukHome,
        muscleGroupTab: ukMuscleGroupTab,
        settingsTab: ukSettingsTab,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
};

export const changeAppLanguage = (lng: ELanguages) => {
  useLanguageStore.getState().setLanguage(lng);
  // eslint-disable-next-line import/no-named-as-default-member
  i18n.changeLanguage(lng);
};

export default i18n;
