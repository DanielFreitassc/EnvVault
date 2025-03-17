import { TEnvs } from "@/hooks/form/useEnvsForm";
import { api } from "../axios";

export const createEnv = async (envData: TEnvs) => {
  const res = await api.post("/env-windows", envData);

  return res.data;
};
