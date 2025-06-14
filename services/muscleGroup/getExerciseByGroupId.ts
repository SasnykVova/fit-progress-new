import { firebaseDB } from "@/firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

const getExerciseByGroupId = async (userId: string, groupId: string) => {
  try {
    const userRef = doc(firebaseDB, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const userData = userSnap.data();
    const exercises = userData.exercises || [];

    const groupRefPath = `muscleGroups/${groupId}`;

    const filteredExercises = exercises.filter(
      (exercise: any) => exercise.groupId?.path === groupRefPath
    );
    console.log("MuscleGoup exercise fetched!");
    return filteredExercises;
  } catch (error) {
    console.error("Failed to get exercises by group:", error);
    throw error;
  }
};

export const useGetExerciseByGroupId = (userId: string, groupId: string) => {
  return useQuery({
    queryKey: ["getExerciseByGroupId", userId, groupId],
    queryFn: () => getExerciseByGroupId(userId, groupId),
    enabled: !!userId && !!groupId,
  });
};
