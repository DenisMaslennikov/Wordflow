import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./AuthContext.ts";
import useLocalStorageState from "../../hooks/useLocalStorageState.ts";
import { getTokenExpirationTime } from "../../utils/jwt.ts";
import { ACCESS_KEY, REFRESH_KEY } from "../../utils/constants.ts";
import apiClient, { setAuthTokenUpdater } from "../../service/apiClient.ts";

import { type TokensPair } from "../../features/authentication/types/Tokens.ts";

function AuthContextProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useLocalStorageState<string | null>(
    null,
    ACCESS_KEY,
  );
  const [refreshToken, setRefreshToken] = useLocalStorageState<string | null>(
    null,
    REFRESH_KEY,
  );
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const isAuthenticated = !!accessToken;

  const setTokens = useCallback(
    ({ access, refresh }: TokensPair) => {
      setAccessToken(access);
      setRefreshToken(refresh);
      localStorage.setItem(ACCESS_KEY, JSON.stringify(access));
      localStorage.setItem(REFRESH_KEY, JSON.stringify(refresh));
    },
    [setAccessToken, setRefreshToken],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(ACCESS_KEY);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, [queryClient, setAccessToken, setRefreshToken]);

  const scheduleTokenRefresh = useCallback(
    (accessToken: string) => {
      async function refreshAccessToken() {
        try {
          if (!refreshToken) throw new Error("No refresh token");

          const { data } = await apiClient.post("/token/refresh/", {
            refresh: refreshToken,
          });
          setTokens(data);
          scheduleTokenRefresh(data.access);
        } catch (error) {
          logout();
          throw error;
        }
      }

      const expTime = getTokenExpirationTime(accessToken);
      if (!expTime) return;

      const delay = expTime - Date.now() - 30_000; // обновим за 30 секунд до истечения

      if (delay <= 0) {
        refreshAccessToken(); // сразу обновим
        return;
      }

      refreshTimeoutRef.current = setTimeout(() => {
        refreshAccessToken();
      }, delay);
    },
    [logout, refreshToken, setTokens],
  );

  useEffect(() => {
    if (accessToken) {
      scheduleTokenRefresh(accessToken);
    }
  }, [accessToken, scheduleTokenRefresh]);

  // Установка в axios
  useEffect(() => {
    setAuthTokenUpdater(setTokens);
  }, [setTokens]);

  const contextValue = useMemo<AuthContext>(() => {
    return { accessToken, refreshToken, setTokens, logout, isAuthenticated };
  }, [accessToken, refreshToken, setTokens, logout, isAuthenticated]);

  useEffect(() => {
    if (!refreshToken) return;
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
