import styled from "styled-components";
import { NavLink } from "react-router-dom";
import type { Post } from "./types/Post.ts";

const StyledPostLink = styled(NavLink)``;

interface PostLinkProps {
  children: React.ReactNode;
  post: Post;
}

function PostLink({ children, post }: PostLinkProps) {
  return (
    <StyledPostLink to={`blog/${post.blog.slug}/${post.slug}/${post.id}`}>
      {children}
    </StyledPostLink>
  );
}

export default PostLink;
