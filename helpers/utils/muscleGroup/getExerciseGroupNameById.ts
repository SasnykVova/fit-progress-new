export const getExerciseGroupNameById = (id: string): string => {
  switch (id) {
    case "1":
      return "Hands";
    case "2":
      return "Legs";
    case "3":
      return "Body (front side)";
    case "4":
      return "Body (back side)";
    case "5":
      return "Cardio";
    case "6":
      return "Other";
    default:
      return `Not grouop with id: ${id}`;
  }
};
