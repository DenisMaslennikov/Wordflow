import apiClient from "../../service/apiClient.ts";

const userAPI = {
  getUserMe: async () => {
    const response = await apiClient.get("user/me/");
    return response.data;
  },
};

export { userAPI };
