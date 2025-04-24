import type { Post, PostApi } from "../types/Post.ts";
import { toBlog } from "./toBlog.ts";

function toPost(post: PostApi): Post {
  const { published_at, blog, ...data } = post;

  return { publishedAt: new Date(published_at), blog: toBlog(blog), ...data };
}

export { toPost };
