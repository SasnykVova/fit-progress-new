import { auth } from "@/firebase/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("Користувач не знайдений");
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);

    console.log("Пароль успішно змінено");
  } catch (error: any) {
    if (error.code === "auth/wrong-password") {
      throw new Error("Неправильний поточний пароль");
    }
    if (error.code === "auth/weak-password") {
      throw new Error("Новий пароль занадто слабкий");
    }
    throw new Error(error.message);
  }
};

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword(currentPassword, newPassword),
  });
};
