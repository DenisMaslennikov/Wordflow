import apiClient from "../../../service/apiClient.ts";

import type { LoginForm, UserForm, UserProfile } from "../types/User.ts";
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

  login: async (login: LoginForm) => {
    const response = await apiClient.post<TokensPair>("token/", login);
    return response.data;
  },

  refreshTokens: async (refresh: string) => {
    const response = await apiClient.post<TokensPair>("token/refresh/", {
      refresh,
    });
    return response.data;
  },
};

export { userService };
