import Exercise from "@/components/exercise/Exercise";
import {
  AddExersiceSchema,
  TAddExersiceSchema,
} from "@/helpers/schemas/AddExersiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export default function ExreciseGroup() {
  const methods = useForm<TAddExersiceSchema>({
    resolver: zodResolver(AddExersiceSchema),
    defaultValues: {
      name: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <Exercise />
    </FormProvider>
  );
}
