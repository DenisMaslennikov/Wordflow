import styled from "styled-components";
import BlogLink from "./BlogLink.tsx";
import AuthorLink from "./AuthorLink.tsx";
import type { Post, PostDetailed } from "./types/Post.ts";

const StyledPostMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.75rem;
  width: 100%;
`;

function PostMeta({ post }: { post: Post | PostDetailed }) {
  return (
    <StyledPostMeta>
      <span>
        {`Опубликовано ${post.publishedAt.toLocaleDateString()} ${post.publishedAt.toLocaleTimeString()}\u00A0`}
      </span>
      {"blog" in post && (
        <>
          <span>В блоге:</span>
          <BlogLink blog={post.blog} />
        </>
      )}
      <span>Автором:</span>
      <AuthorLink author={post.user} />
    </StyledPostMeta>
  );
}

export default PostMeta;
