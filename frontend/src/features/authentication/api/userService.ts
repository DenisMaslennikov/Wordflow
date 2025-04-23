import apiClient from "../../../service/apiClient.ts";

import type { LoginForm, UserForm, UserProfile } from "../types/User.ts";
import type { TokensPair } from "../types/Tokens.ts";

const userService = {
  getUserMe: async () => {
    const response = await apiClient.get<UserProfile>("user/me/");
    return response.data;
  },

  createUser: async (data: UserForm) => {
    const body =
      data.avatar instanceof FileList
        ? { ...data, avatar: data.avatar[0] }
        : data;
    const response = await apiClient.post<UserProfile>("user/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateUserMe: async (data: UserForm) => {
    const body =
      typeof data.avatar === "string"
        ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (({ avatar, ...rest }) => rest)(data)
        : data.avatar instanceof FileList
          ? { ...data, avatar: data.avatar[0] }
          : data;
    const response = await apiClient.patch<UserProfile>("user/me/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  login: async (login: LoginForm) => {
    const response = await apiClient.post<TokensPair>("token/", login);
    return response.data;
  },
};

export { userService };
