import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum ELanguages {
  en = "en",
  uk = "uk",
}

interface ILanguageStore {
  language: ELanguages | undefined;
  setLanguage: (value: ELanguages) => void;
}

export const useLanguageStore = create<ILanguageStore>()(
  persist(
    (set) => ({
      language: undefined,
      setLanguage: (value: ELanguages) => set({ language: value }),
    }),
    {
      name: "languages-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
