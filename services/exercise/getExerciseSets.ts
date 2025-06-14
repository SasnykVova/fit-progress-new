import { firebaseDB } from "@/firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export const getExerciseSets = async (
  userId: string,
  exerciseId: string
): Promise<
  { setNumber: string; weight: string; reps: string; id: string }[] | undefined
> => {
  try {
    const userRef = doc(firebaseDB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User not found");

    const userData = userSnap.data();

    const exercise = (userData.exercises || []).find(
      (ex: any) => ex.id === exerciseId
    );

    if (!exercise) throw new Error("Exercise not found");

    return exercise.sets || [];
  } catch (error) {
    console.error("Failed to get exercise sets:", error);
    throw error;
  }
};

export const useGetExerciseSets = (userId: string, exerciseId: string) => {
  return useQuery({
    queryKey: ["getExerciseSets", userId, exerciseId],
    queryFn: () => getExerciseSets(userId, exerciseId),
    enabled: !!userId && !!exerciseId,
  });
};
