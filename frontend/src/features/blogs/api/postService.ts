import apiClient from "../../../service/apiClient.ts";
import { PostApi, PostDetailedApi } from "../types/Post.ts";
import { PaginatedResults } from "../../../types/PaginatedResults.ts";
import { isAxiosError } from "axios";

interface GetPostsParams {
  limit: number;
  offset: number;
  blogSlug?: string | null;
}

export const postService = {
  getPosts: async ({ limit, offset, blogSlug }: GetPostsParams) => {
    const response = await apiClient.get<PaginatedResults<PostApi>>("posts/", {
      params: { limit, offset, blog__slug: blogSlug },
    });
    return response.data;
  },
  getPost: async (postId: number) => {
    try {
      const response = await apiClient.get<PostDetailedApi>(
        `blog_post/${postId}`,
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.status === 404) return null;
      throw error;
    }
  },
};
