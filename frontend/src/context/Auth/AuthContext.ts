import { createContext } from "react";

interface AuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (tokens: { access: string; refresh: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setTokens: () => console.error("setTokens used outside AuthContextProvider"),
  logout: () => console.error("logout used outside AuthContextProvider"),
});

export { AuthContext };
