import apiClient from "../../../service/apiClient.ts";

export const postService = {
  getMainPagePost: async () => {
    const response = await apiClient.get("main_page/posts");
    return response.data;
  },
};
