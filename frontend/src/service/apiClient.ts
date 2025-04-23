import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCESS_KEY, API_BASE_URL, REFRESH_KEY } from "../utils/constants.ts";
import { getTokenFromLocalStorage } from "../utils/jwt.ts";
import { TokensPair } from "../features/authentication/types/Tokens.ts";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const access = getTokenFromLocalStorage(ACCESS_KEY);
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

let setTokensFromContext:
  | ((tokens: { access: string; refresh: string }) => void)
  | null = null;

function setAuthTokenUpdater(updater: (tokens: TokensPair) => void) {
  setTokensFromContext = updater;
}

function processQueue(error: AxiosError | null, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  async (err: AxiosError): Promise<AxiosResponse | void> => {
    const originalRequest = err.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (!getTokenFromLocalStorage(REFRESH_KEY)) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = "Bearer " + token;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh = getTokenFromLocalStorage(REFRESH_KEY);
        const { data }: AxiosResponse<{ access: string; refresh: string }> =
          await apiClient.post("/token/refresh/", { refresh });

        if (setTokensFromContext) setTokensFromContext(data);

        apiClient.defaults.headers.common["Authorization"] =
          "Bearer " + data.access;
        processQueue(null, data.access);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = "Bearer " + data.access;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
export { setAuthTokenUpdater };
