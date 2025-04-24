import apiClient from "../../../service/apiClient.ts";
import { PostApi } from "../types/Post.ts";
import { PaginatedResults } from "../../../types/PaginatedResults.ts";

export const postService = {
  getPosts: async () => {
    const response = await apiClient.get<PaginatedResults<PostApi>>("posts/");
    return response.data;
  },
};
