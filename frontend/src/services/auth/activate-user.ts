import { api } from "../axios";

export const activateUser = async () => {
  const res = await api.get("/users/activate");

  return res.data;
};
