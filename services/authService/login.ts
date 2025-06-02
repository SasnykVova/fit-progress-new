import { firebaseAuth, firebaseDB } from "@/firebase/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
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
    console.log("User login success!");
    return userCredential.user;
  } catch (error: any) {
    const errorCode = error?.code;

    switch (errorCode) {
      case "auth/user-not-found":
        alert("Користувача з такою електронною адресою не знайдено.");
        break;
      case "auth/wrong-password":
        alert("Неправильний пароль. Спробуйте ще раз.");
        break;
      case "auth/invalid-email":
        alert("Невірний формат електронної пошти.");
        break;
      case "auth/user-disabled":
        alert("Цей акаунт було вимкнено.");
        break;
      default:
        alert("Сталася невідома помилка. Спробуйте пізніше.");
        console.error("Login error:", error);
    }

    throw error;
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });
};
