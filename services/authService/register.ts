import { firebaseAuth, firebaseDB } from "@/firebase/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
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
    console.log("Registration successful");
  } catch (error) {
    const err = error as Error;
    console.error("Registration error:", err);
    alert(err.message);
    throw err;
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
