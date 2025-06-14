import { auth } from "@/firebase/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { signOut } from "firebase/auth";

const loguot = async () => {
  try {
    await signOut(auth);
    await SecureStore.deleteItemAsync("userToken");
    console.log("User loguot success!");
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
};

export const useLoguot = () => {
  return useMutation({
    mutationFn: loguot,
  });
};
