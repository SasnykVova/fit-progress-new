import { firebaseDB } from "@/firebase/firebaseConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

interface IAddExerciseArguments {
  userId: string;
  name: string;
  groupId: string;
}

const addExercise = async (userId: string, name: string, groupId: string) => {
  try {
    const muscleGroupRef = doc(firebaseDB, "muscleGroups", groupId);
    const userRef = doc(firebaseDB, "users", userId);
    const newExercise = {
      name: name,
      groupId: muscleGroupRef,
      id: Date.now().toString(),
      sets: [],
    };
    await updateDoc(userRef, {
      exercises: arrayUnion(newExercise),
    });

    return newExercise;
  } catch (error) {
    console.log(error);
  }
};

export const useAddExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, name, groupId }: IAddExerciseArguments) =>
      addExercise(userId, name, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getExerciseByGroupId"],
      });
    },
  });
};
