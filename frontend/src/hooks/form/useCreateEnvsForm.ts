import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createEnvsSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  value: z.string().min(1, "Campo obrigatório"),
});

export type TCreateEnvs = z.infer<typeof createEnvsSchema>;

export const useCreateEnvsForm = () => {
  const methods = useForm<TCreateEnvs>({
    resolver: zodResolver(createEnvsSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  return { methods, createEnvsSchema };
};
