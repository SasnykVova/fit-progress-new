import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum EMode {
  dark = "dark",
  white = "white",
}

interface IModeStore {
  mode: EMode;
  toggleMode: () => void;
}

export const useModeStore = create<IModeStore>()(
  persist(
    (set, get) => ({
      mode: EMode.white,
      toggleMode: () => {
        const { mode } = get();
        set({ mode: mode === EMode.white ? EMode.dark : EMode.white });
      },
    }),
    { name: "mode", storage: createJSONStorage(() => AsyncStorage) }
  )
);
