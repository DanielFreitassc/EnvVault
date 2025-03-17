import { useContext } from "react";
import { AuthContext } from "./CreateAuthContext";

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
