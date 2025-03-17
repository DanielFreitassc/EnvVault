import { api } from "../axios";

interface ListAllEnvsOutput {
  name: string;
}

export const listAllEnvs = async (): Promise<ListAllEnvsOutput[]> => {
  const res = await api.get("/env-windows");

  return res.data;
};
