import type { Blog } from "./types/Blog.ts";
import StyledLink from "../../ui/StyledLink.tsx";

interface BlogLinkProps {
  blog: Blog;
}

function BlogLink({ blog }: BlogLinkProps) {
  return <StyledLink to={`/blog/${blog.slug}`}>{blog.title}</StyledLink>;
}

export default BlogLink;
