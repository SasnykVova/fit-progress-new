import { blueTheme, pinkTheme, purpleTheme } from "@/themes/colors";

export const getThemeByName = (name: string) => {
  switch (name) {
    case "blue":
      return blueTheme;
    case "pink":
      return pinkTheme;
    default:
      return purpleTheme;
  }
};
