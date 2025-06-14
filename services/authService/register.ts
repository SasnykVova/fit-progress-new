import { auth, firebaseDB } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(firebaseDB, "users", user.uid), {
      name,
      email,
      exercises: [],
    });

    const token = await userCredential.user.getIdToken();
    await SecureStore.setItemAsync("userToken", token);
    await SecureStore.setItemAsync("userId", user.uid);
    await SecureStore.setItemAsync("userName", name);
    await SecureStore.setItemAsync("userEmail", email);
    useAuthStore.getState().setUserId(user.uid);
    console.log("Registration successful");
  } catch (error: any) {
    console.log("Register error");
    const errorCode = error?.code;
    throw new Error(errorCode);
  }
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => signUp(email, password, name),
  });
};
