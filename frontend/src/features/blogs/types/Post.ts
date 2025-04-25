import type { UserShort } from "../../authentication/types/User.ts";
import type { Tag } from "./Tag.ts";
import type { Blog, BlogApi } from "./Blog.ts";
import type { Image } from "./Image.ts";

interface BasePost {
  user: UserShort;
  slug: string;
  title: string;
  content: string;
  tags: Tag[];
  preview: Image | null;
}

interface PostApi extends BasePost {
  id: number;
  published_at: string;
  blog: BlogApi;
}

interface Post extends BasePost {
  id: number;
  publishedAt: Date;
  blog: Blog;
}

export type { PostApi, Post };
