interface BaseBlog {
  title: string;
  description: string;
  slug: string;
}

interface BlogApi extends BaseBlog {
  id: number;
  created_at: string;
}

interface Blog extends BaseBlog {
  id: number;
  createdAt: Date;
}

interface BlogShort {
  id: number;
  title: string;
  slug: string;
}

export type { BlogApi, Blog, BlogShort };
