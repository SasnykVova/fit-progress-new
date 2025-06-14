import { firebaseDB } from "@/firebase/firebaseConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const deleteExercise = async (userId: string, exerciseId: string) => {
  try {
    const userRef = doc(firebaseDB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("Користувача не знайдено");
    }

    const currentExercises = userSnap.data().exercises || [];

    const updatedExercises = currentExercises.filter(
      (exercise: any) => exercise.id !== exerciseId
    );
    await updateDoc(userRef, {
      exercises: updatedExercises,
    });
    console.log("Вправу видалено успішно");
  } catch (error) {
    console.error("Помилка при видаленні вправи:", error);
  }
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteExercise"],
    mutationFn: ({
      userId,
      exerciseId,
    }: {
      userId: string;
      exerciseId: string;
    }) => deleteExercise(userId, exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getExerciseByGroupId"],
      });
    },
  });
};
