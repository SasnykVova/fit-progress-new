import { z } from "zod";

export const resetPassSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type TResetPassSchema = z.infer<typeof resetPassSchema>;
