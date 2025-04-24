import apiClient from "../../../service/apiClient.ts";
import { PostApi } from "../types/Post.ts";
import { PaginatedResults } from "../../../types/PaginatedResults.ts";

interface GetPostsParams {
  limit: number;
  offset: number;
}

export const postService = {
  getPosts: async ({ limit, offset }: GetPostsParams) => {
    const response = await apiClient.get<PaginatedResults<PostApi>>("posts/", {
      params: { limit, offset },
    });
    return response.data;
  },
};
