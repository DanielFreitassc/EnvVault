import { api } from "../axios";

interface ChangePasswordPayload {
  password: string;
}

export const changePassword = async (payload: ChangePasswordPayload) => {
  const res = await api.patch("/users", payload);

  return res.data;
};
