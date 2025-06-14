import { firebaseDB } from "@/firebase/firebaseConfig";
import { ISet } from "@/types/exercise/exerciseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const addExerciseSet = async (
  userId: string,
  exerciseId: string,
  newSet: ISet
) => {
  try {
    const userRef = doc(firebaseDB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User not found");

    const userData = userSnap.data();

    const updatedExercises = (userData.exercises || []).map((exercise: any) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: [...(exercise.sets || []), newSet],
        };
      }
      return exercise;
    });

    await setDoc(userRef, { exercises: updatedExercises }, { merge: true });

    return newSet;
  } catch (error) {
    console.error("Failed to add set to exercise:", error);
    throw error;
  }
};

export const useAddExerciseSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      exerciseId,
      newSet,
    }: {
      userId: string;
      exerciseId: string;
      newSet: ISet;
    }) => addExerciseSet(userId, exerciseId, newSet),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getExerciseSets"],
      });
    },
  });
};
