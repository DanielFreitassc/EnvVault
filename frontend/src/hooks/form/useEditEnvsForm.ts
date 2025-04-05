import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editEnvsSchema = z.object({
  value: z.string().min(1, "Campo obrigatório"),
});

export type TEditEnvs = z.infer<typeof editEnvsSchema>;

export const useEditEnvsForm = () => {
  const methods = useForm<TEditEnvs>({
    resolver: zodResolver(editEnvsSchema),
    defaultValues: {
      value: "",
    },
  });

  return { methods, editEnvsSchema };
};
