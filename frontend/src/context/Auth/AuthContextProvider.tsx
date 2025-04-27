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
import {
  ACCESS_KEY,
  MY_BLOGS_QUERY_KEY,
  REFRESH_KEY,
  TOKEN_REFRESH_SLEEP_TIMOUT_IF_ERROR,
  TOKEN_REFRESH_THRESHOLD,
  USER_QUERY_KEY,
} from "../../utils/constants.ts";
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
    queryClient.removeQueries({
      predicate: (query) =>
        query.queryKey[0] === USER_QUERY_KEY ||
        query.queryKey[0] === MY_BLOGS_QUERY_KEY,
    });
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, [queryClient, setAccessToken, setRefreshToken]);

  const scheduleTokenRefresh = useCallback(
    (accessToken: string) => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);

      function getTokenExpirationTime(token: string): number | null {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          return payload.exp ? payload.exp * 1000 : null; // convert to ms
        } catch {
          return null;
        }
      }

      const expTime = getTokenExpirationTime(accessToken);
      if (!expTime) return;

      const delay = expTime - Date.now() - TOKEN_REFRESH_THRESHOLD;

      async function refreshAccessToken() {
        try {
          if (!refreshToken) throw new Error("No refresh token");

          const { data } = await apiClient.post<TokensPair>("/token/refresh/", {
            refresh: refreshToken,
          });
          setTokens(data);
          scheduleTokenRefresh(data.access);
        } catch (error) {
          if (Math.abs(delay) < TOKEN_REFRESH_THRESHOLD)
            refreshTimeoutRef.current = setTimeout(() => {
              refreshAccessToken();
            }, TOKEN_REFRESH_SLEEP_TIMOUT_IF_ERROR);
          else {
            logout();
            throw error;
          }
        }
      }

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

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
