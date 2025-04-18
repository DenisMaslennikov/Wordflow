import apiClient from "../../../service/apiClient.ts";

const userService = {
  getUserMe: async () => {
    const response = await apiClient.get("user/me/");
    return response.data;
  },
};

export { userService };
