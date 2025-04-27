import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "../api/postService.ts";
import { toPost } from "../transform/toPost.ts";
import { PaginatedResults } from "../../../types/PaginatedResults.ts";
import type { Post, PostApi } from "../types/Post.ts";
import { useParams, useSearchParams } from "react-router-dom";
import {
  DEFAULT_POSTS_PER_PAGE,
  POSTS_QUERY_KEY,
} from "../../../utils/constants.ts";

function usePosts() {
  const queryClient = useQueryClient();
  const { blogSlug } = useParams();
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? DEFAULT_POSTS_PER_PAGE);
  const page = Number(searchParams.get("page") ?? 1);
  const tagSlug = searchParams.get("tag");
  const offset = limit * (page - 1);

  function select(data: PaginatedResults<PostApi>): PaginatedResults<Post> {
    const results = data.results.map(toPost);
    return { ...data, results };
  }

  const { data, isLoading: isPostsLoading } = useQuery<
    PaginatedResults<PostApi>,
    Error,
    PaginatedResults<Post>
  >({
    queryFn: () => postService.getPosts({ limit, offset, blogSlug, tagSlug }),
    queryKey: [POSTS_QUERY_KEY, limit, offset, blogSlug, tagSlug],
    select,
  });

  const count = data?.count || 0;
  const next = data?.next || null;
  const previous = data?.previous || null;
  const posts = data?.results || [];

  if (next)
    queryClient.prefetchQuery({
      queryKey: [POSTS_QUERY_KEY, limit, offset + limit],
      queryFn: () => postService.getPosts({ limit, offset: offset + limit }),
    });

  if (previous)
    queryClient.prefetchQuery({
      queryKey: [POSTS_QUERY_KEY, limit, offset - limit],
      queryFn: () => postService.getPosts({ limit, offset: offset - limit }),
    });

  return {
    posts,
    isPostsLoading,
    count,
    pages: Math.ceil(count / limit),
    from: (page - 1) * limit + 1,
    to: page * limit <= count ? page * limit : count,
  };
}

export default usePosts;
