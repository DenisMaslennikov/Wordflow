import type { Blog, BlogApi } from "../types/Blog.ts";

function toBlog(blog: BlogApi): Blog {
  const { created_at, ...data } = blog;
  return {
    createdAt: new Date(created_at),
    ...data,
  };
}

export { toBlog };
