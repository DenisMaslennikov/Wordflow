import { PropsWithChildren, useCallback, useMemo } from "react";

import { AuthContext } from "./AuthContext.ts";
import useLocalStorageState from "../../hooks/useLocalStorageState.ts";
import { ACCESS_KEY, REFRESH_KEY } from "../../utils/constants.ts";
import { TokensPair } from "../../features/authentication/types/Tokens.ts";

function AuthContextProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useLocalStorageState<string | null>(
    null,
    ACCESS_KEY,
  );
  const [refreshToken, setRefreshToken] = useLocalStorageState<string | null>(
    null,
    REFRESH_KEY,
  );

  const isAuthenticated = !!accessToken;

  const setTokens = useCallback(
    ({ access, refresh }: TokensPair) => {
      setAccessToken(access);
      setRefreshToken(refresh);
    },
    [setAccessToken, setRefreshToken],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
  }, [setAccessToken, setRefreshToken]);

  const contextValue = useMemo<AuthContext>(() => {
    return { accessToken, refreshToken, setTokens, logout, isAuthenticated };
  }, [accessToken, refreshToken, setTokens, logout, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
