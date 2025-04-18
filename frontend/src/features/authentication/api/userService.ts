import apiClient from "../../../service/apiClient.ts";

import type { User } from "../types/User.ts";

const userService = {
  getUserMe: async () => {
    const response = await apiClient.get<User>("user/me/");
    return response.data;
  },
};

export { userService };
