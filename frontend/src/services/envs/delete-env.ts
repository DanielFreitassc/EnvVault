import { api } from "../axios";

export const deleteEnv = async (name: string) => {
  const res = await api.delete(`/env/${name}`);

  return res.data;
};
