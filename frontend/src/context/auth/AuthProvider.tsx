import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "@/services/axios";
import { AuthContext, IDecodedToken } from "./CreateAuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { "animedex.token": token } = parseCookies();
  const { push } = useRouter();
  const [user, setUser] = useState<IDecodedToken>();
  const isAuth = !!token;

  const signIn = async ({ password, username }: ICredentials) => {
    return api
      .post("/auth/login", {
        username,
        password,
      })
      .then(({ data }) => {
        const { token } = data;
        setCookie(null, "token", token, {
          maxAge: 60 * 60 * 24 * 2, // 2 dias
          path: "/",
        });

        const decoded = jwt.decode(token) as IDecodedToken;

        setUser(decoded);

        return decoded;
      });
  };

  const signOut = () => {
    destroyCookie(null, "animedex.token");
    push("/login");
  };

  useEffect(() => {
    if (!user) {
      const decodedToken = jwt.decode(token) as IDecodedToken;
      console.log(decodedToken);

      setUser(decodedToken);
    }
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ isAuth, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
