import { firebaseDB } from "@/firebase/firebaseConfig";
import { IExercise } from "@/types/exercise/exerciseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, setDoc } from "firebase/firestore";

const deleteExerciseSet = async (
  userId: string,
  exerciseId: string,
  setNumber: string
) => {
  try {
    const userRef = doc(firebaseDB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User not found");

    const userData = userSnap.data();
    const exercises = userData?.exercises || [];

    let setWasActuallyDeleted = false;

    const updatedExercises = exercises.map((exercise: IExercise) => {
      if (exercise.id === exerciseId) {
        const originalSetsLength = (exercise.sets || []).length;
        const filteredSets = (exercise.sets || []).filter(
          (set) => set.setNumber !== setNumber
        );

        if (filteredSets.length < originalSetsLength) {
          setWasActuallyDeleted = true; // Якщо довжина зменшилась, підхід видалено
        }

        return {
          ...exercise,
          sets: filteredSets,
        };
      }
      return exercise;
    });

    await setDoc(userRef, { exercises: updatedExercises }, { merge: true });
    if (setWasActuallyDeleted) {
      console.log(
        `Set ${setNumber} deleted successfully from exercise ${exerciseId}!`
      );
      return setNumber; // Повертаємо ID видаленого підходу
    } else {
      console.warn(
        `Set ${setNumber} not found in exercise ${exerciseId} or nothing was deleted.`
      );
      return null; // Або кинути помилку, або повернути undefined/false
    }
  } catch (error) {
    console.error("Failed to delete set from exercise:", error);
    throw error;
  }
};

export const useDeleteExerciseSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteExerciseSet"],
    mutationFn: ({
      userId,
      exerciseId,
      setNumber,
    }: {
      userId: string;
      exerciseId: string;
      setNumber: string;
    }) => deleteExerciseSet(userId, exerciseId, setNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getExerciseSets"],
      });
    },
  });
};
