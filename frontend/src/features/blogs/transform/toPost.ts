import type {
  Post,
  PostApi,
  PostDetailed,
  PostDetailedApi,
} from "../types/Post.ts";
import { toBlog } from "./toBlog.ts";

function toPost(post: PostApi): Post {
  const { published_at, blog, ...data } = post;

  return { publishedAt: new Date(published_at), blog: toBlog(blog), ...data };
}

function toDetailedPost(post: PostDetailedApi | null): PostDetailed | null {
  if (!post) return null;

  const { published_at, ...data } = post;

  return { publishedAt: new Date(published_at), ...data };
}

export { toPost, toDetailedPost };
