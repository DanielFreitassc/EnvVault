import { TCreateEnvs } from "@/hooks/form/useCreateEnvsForm";
import { api } from "../axios";

export const editEnv = async (envData: TCreateEnvs) => {
  const res = await api.put("/env", envData);

  return res.data;
};
