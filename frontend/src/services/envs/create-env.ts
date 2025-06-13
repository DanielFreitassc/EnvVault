import { TCreateEnvs } from "@/hooks/form/useCreateEnvsForm";
import { api } from "../axios";

export const createEnv = async (envData: TCreateEnvs) => {
  const res = await api.post("/env", envData);

  return res.data;
};
