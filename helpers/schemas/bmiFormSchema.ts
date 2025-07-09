import { z } from "zod";

export const bmiFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  height: z
    .string()
    .max(3, "Height must be at most 3 characters")
    .optional()
    .or(z.literal("")),
  weight: z
    .string()
    .regex(
      /^\d{1,3}(\.\d{1,2})?$/,
      "Weight must be a number up to 5 characters"
    )
    .max(5, "Weight must be at most 5 characters")
    .optional()
    .or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
});

export type TbmiFormSchema = z.infer<typeof bmiFormSchema>;
