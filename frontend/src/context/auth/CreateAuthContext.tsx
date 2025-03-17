import { JwtPayload } from "jsonwebtoken";
import { createContext } from "react";

export interface IDecodedToken extends JwtPayload {
  id: number;
  username: string;
  photo: string;
}

export interface IAuthContext {
  isAuth: boolean;
  signIn: (data: ICredentials) => Promise<IDecodedToken>;
  signOut: VoidFunction;
  user?: IDecodedToken;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  signIn: async () => {
    return {} as IDecodedToken;
  },
  signOut: () => {},
});
