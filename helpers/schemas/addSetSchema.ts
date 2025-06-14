import { z } from "zod";

export const addSetSchema = z.object({
  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Weight must be a number ≥ 0",
    }),

  reps: z
    .string()
    .min(1, "Reps are required")
    .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 1, {
      message: "Reps must be an integer ≥ 1",
    }),
});

export type TAddSetSchema = z.infer<typeof addSetSchema>;
