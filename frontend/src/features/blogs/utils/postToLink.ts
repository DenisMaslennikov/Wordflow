import type { Post } from "../types/Post.ts";

export default function postToLink(post: Post): string {
  return `/blog/${post.blog.slug}/${post.slug}/${post.id}`;
}
