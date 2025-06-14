import { auth, firebaseDB } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(firebaseDB, "users", uid));
    const userData = userDoc.data();

    const idToken = await userCredential.user.getIdToken();
    await SecureStore.setItemAsync("userToken", idToken);
    await SecureStore.setItemAsync("userId", uid);
    await SecureStore.setItemAsync("userName", userData?.name || "");
    await SecureStore.setItemAsync("userEmail", userData?.email || "");
    useAuthStore.getState().setUserId(uid);
    console.log("User login success!");
    return userCredential.user;
  } catch (error: any) {
    console.log("Login error");
    const errorCode = error.code;
    throw new Error(errorCode);
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
};
