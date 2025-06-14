import { firebaseDB } from "@/firebase/firebaseConfig";
import { IEditExercise, IExercise } from "@/types/exercise/exerciseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";

const editSetExercise = async (
  userId: string,
  exerciseId: string,
  setId: string,
  updatedFields: { weight: string; reps: string }
) => {
  try {
    const userRef = doc(firebaseDB, "users", userId);
    const userSnap = await getDoc(userRef);

    const userData = userSnap.data();
    const exercises = userData?.exercises || [];

    if (!userSnap.exists()) throw new Error("User not found");

    const updatedExercises = exercises.map((exercise: IExercise) => {
      if (exercise.id === exerciseId) {
        const updatedSets = (exercise.sets || []).map((set) => {
          if (set?.id === setId) {
            return {
              ...set,
              weight: updatedFields.weight,
              reps: updatedFields.reps,
            };
          }
          return set;
        });

        return {
          ...exercise,
          sets: updatedSets,
        };
      }
      return exercise;
    });

    await setDoc(userRef, { exercises: updatedExercises }, { merge: true });
    console.log("Set updated successfully!");
    return setId;
  } catch (error) {
    console.error("Failed to update set:", error);
    throw error;
  }
};

export const useEditSetExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editSetExercise"],
    mutationFn: ({ userId, exerciseId, setId, updatedFields }: IEditExercise) =>
      editSetExercise(userId, exerciseId, setId, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getExerciseSets"],
      });
    },
  });
};
