import { auth, firebaseDB } from "@/firebase/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

const deleteAccount = async (password: string) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("Користувач не знайдений або без email");
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, password);

    await reauthenticateWithCredential(user, credential);

    await deleteDoc(doc(firebaseDB, "users", user.uid));
    console.log("Дані користувача видалено з БД!");
    await deleteUser(user);
    console.log("Акаунт користувача видалено!");
    await signOut(auth);

    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("userName");
    await SecureStore.deleteItemAsync("userEmail");

    console.log("Акаунт та дані успішно видалені");
  } catch (error: any) {
    console.log("Помилка при видаленні:", error);
    if (error.code === "auth/requires-recent-login") {
      throw new Error("Для видалення акаунта потрібно повторно увійти");
    }
    throw new Error(error.message);
  }
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: (password: string) => deleteAccount(password),
  });
};
