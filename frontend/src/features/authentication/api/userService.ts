import apiClient from "../../../service/apiClient.ts";

import {
  type LoginForm,
  type UserSignupForm,
  type UserProfile,
  type UserUpdateForm,
  type ChangePasswordForm,
  isUserUpdateForm,
} from "../types/User.ts";
import type { TokensPair } from "../types/Tokens.ts";
import { isAxiosError } from "axios";
import { BlogShort } from "../../blogs/types/Blog.ts";

const userService = {
  getUserMe: async () => {
    try {
      const response = await apiClient.get<UserProfile>("user/me/");
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) {
        // Возвращаем null, если пользователь не авторизован
        return null;
      }

      // Пробрасываем ошибку дальше, если она не 401 или не Axios
      throw error;
    }
  },

  getMyBlogs: async () => {
    try {
      const response = await apiClient.get<BlogShort[]>("user/my_blogs/");
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 401) return null;
      throw error;
    }
  },

  createUser: async (data: UserSignupForm) => {
    const body =
      data.avatar instanceof FileList
        ? { ...data, avatar: data.avatar[0] }
        : data;
    const response = await apiClient.post<UserProfile>("user/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  updateUserMe: async (data: UserUpdateForm | ChangePasswordForm) => {
    let body = data;
    if (isUserUpdateForm(body)) {
      body =
        typeof body.avatar === "string"
          ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (({ avatar, ...rest }) => rest)(body)
          : body.avatar instanceof FileList
            ? { ...body, avatar: body.avatar[0] }
            : body;
    }
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
