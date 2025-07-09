import { auth } from "@/firebase/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";

const resetPasswordByEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password change email sent");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const useResetPasswordByEmail = () => {
  return useMutation({
    mutationKey: ["resetPasswordByEmail"],
    mutationFn: (email: string) => resetPasswordByEmail(email),
  });
};
