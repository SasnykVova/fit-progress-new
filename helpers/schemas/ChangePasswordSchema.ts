import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be at most 100 characters long"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be at most 100 characters long"),

    repeatNewPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match",
    path: ["repeatNewPassword"],
  });

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;
