import apiClient from "../../../service/apiClient.ts";

import { ACCESS_KEY, REFRESH_KEY } from "../../../utils/constants.ts";

import type { Login, User } from "../types/User.ts";
import type { TokensPair } from "../types/Tokens.ts";

const userService = {
  getUserMe: async () => {
    const response = await apiClient.get<User>("user/me/");
    return response.data;
  },

  login: async (login: Login) => {
    const response = await apiClient.post<TokensPair>("token/", login);
    return response.data;
  },

  refreshTokens: async (refresh: string) => {
    const response = await apiClient.post<TokensPair>("token/refresh/", {
      refresh,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export { userService };
