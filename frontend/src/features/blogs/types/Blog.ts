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
  created_at: Date;
}

export type { BlogApi, Blog };
