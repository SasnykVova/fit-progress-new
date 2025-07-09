import { firebaseDB } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";

const updateUserProfile = async (
  uid: string,
  {
    name,
    height,
    weight,
    gender,
  }: {
    name: string;
    height: string;
    weight: string;
    gender: string;
  }
) => {
  try {
    const userDocRef = doc(firebaseDB, "users", uid);

    await updateDoc(userDocRef, {
      name,
      height,
      weight,
      gender,
    });

    useAuthStore.getState().setUserName(name);

    console.log("User profile updated");
    return true;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return false;
  }
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: ({
      uid,
      name,
      height,
      weight,
      gender,
    }: {
      uid: string;
      name: string;
      height: string;
      weight: string;
      gender: string;
    }) =>
      updateUserProfile(uid, {
        name,
        height: height ?? "",
        weight: weight ?? "",
        gender: gender ?? "",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserDataById"] });
    },
  });
};
