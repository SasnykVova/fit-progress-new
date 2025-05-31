import { z } from "zod";

export const AddExersiceSchema = z.object({
  name: z
    .string()
    .min(5, "Name of exercise must be at least 5 characters long"),
});

export type TAddExersiceSchema = z.infer<typeof AddExersiceSchema>;
