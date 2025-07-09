import { z } from "zod";

export const deleteAccountPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long"),
});

export type TDeleteAccountPasswordSchema = z.infer<
  typeof deleteAccountPasswordSchema
>;
