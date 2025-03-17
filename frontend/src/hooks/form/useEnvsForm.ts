import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const envsSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  value: z.string().min(1, "Campo obrigatório"),
});

export type TEnvs = z.infer<typeof envsSchema>;

export const useEnvsForm = (envsData?: TEnvs) => {
  const methods = useForm<TEnvs>({
    resolver: zodResolver(envsSchema),
    defaultValues: {
      name: envsData?.name || "",
      value: envsData?.value || "",
    },
  });
  return { methods, envsSchema };
};
