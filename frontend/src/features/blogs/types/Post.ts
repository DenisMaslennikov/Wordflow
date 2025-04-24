import { UserShort } from "../../authentication/types/User.ts";
import { Tag } from "./Tag.ts";
import { BlogApi } from "./Blog.ts";

interface BasePost {
  user: UserShort;
  slug: string;
  title: string;
  content: string;
  tags: Tag[];
  blog: BlogApi;
}

interface PostApi extends BasePost {
  id: number;
  published_at: string;
}

interface Post extends BasePost {
  id: number;
  published_at: Date;
}

export type { PostApi, Post };
