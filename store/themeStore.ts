import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TThemeName = "purple" | "blue" | "pink";

interface IThemeStore {
  themeName: TThemeName;
  setTheme: (name: TThemeName) => void;
}

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      themeName: "purple",
      setTheme: (name) => set({ themeName: name }),
    }),
    {
      name: "app-color-theme",
    }
  )
);
