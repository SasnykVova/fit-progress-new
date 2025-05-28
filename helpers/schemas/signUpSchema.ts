import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "The message must be at least 2 characters long.")
      .max(50, "Name must be at most 50 characters long"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be at most 100 characters long"),

    repeatPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
