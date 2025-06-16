export const getExerciseGroupTranslationKeyById = (id: string): string => {
  switch (id) {
    case "1":
      return "hands";
    case "2":
      return "legs";
    case "3":
      return "frontBody";
    case "4":
      return "backBody";
    case "5":
      return "cardio";
    case "6":
      return "other";
    default:
      return "unknownGroup";
  }
};
