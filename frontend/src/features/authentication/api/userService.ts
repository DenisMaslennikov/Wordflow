import apiClient from "../../../service/apiClient.ts";

import { ACCESS_KEY, REFRESH_KEY } from "../../../utils/constants.ts";

import type { Login, UserForm, UserProfile } from "../types/User.ts";
import type { TokensPair } from "../types/Tokens.ts";

const userService = {
  getUserMe: async () => {
    const response = await apiClient.get<UserProfile>("user/me/");
    return response.data;
  },

  createUser: async (data: UserForm) => {
    const response = await apiClient.post<UserProfile>("user/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
