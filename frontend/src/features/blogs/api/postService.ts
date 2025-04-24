import apiClient from "../../../service/apiClient.ts";
import { PostApiPagination } from "../types/Post.ts";

export const postService = {
  getPosts: async () => {
    const response = await apiClient.get<PostApiPagination>("posts/");
    return response.data;
  },
};
