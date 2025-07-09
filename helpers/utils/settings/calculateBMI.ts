import { TFunction } from "i18next";

interface BMIResult {
  bmi: number;
  category: string;
}

export function calculateBMI(
  heightInput?: number | string,
  weightInput?: number | string,
  gender?: string,
  t?: TFunction
): BMIResult | null {
  const heightCm =
    typeof heightInput === "string" ? parseFloat(heightInput) : heightInput;
  const weightKg =
    typeof weightInput === "string" ? parseFloat(weightInput) : weightInput;

  if (
    !heightCm ||
    !weightKg ||
    isNaN(heightCm) ||
    isNaN(weightKg) ||
    heightCm <= 0 ||
    weightKg <= 0
  ) {
    return null;
  }

  const heightM = heightCm / 100;
  const bmi = +(weightKg / (heightM * heightM)).toFixed(1);

  const translate = t ?? ((s: string) => s);

  const thresholds = {
    male: [
      { max: 18.5, category: translate("profileScreen.bmiType.underweight") },
      { max: 24.9, category: translate("profileScreen.bmiType.normal") },
      { max: 29.9, category: translate("profileScreen.bmiType.overweight") },
      { max: Infinity, category: translate("profileScreen.bmiType.obese") },
    ],
    female: [
      { max: 18.0, category: translate("profileScreen.bmiType.underweight") },
      { max: 24.4, category: translate("profileScreen.bmiType.normal") },
      { max: 29.4, category: translate("profileScreen.bmiType.overweight") },
      { max: Infinity, category: translate("profileScreen.bmiType.obese") },
    ],
  };

  if (gender !== "male" && gender !== "female") {
    return null;
  }

  const category =
    thresholds[gender].find((t) => bmi <= t.max)?.category || "Невідомо";

  return { bmi, category };
}
