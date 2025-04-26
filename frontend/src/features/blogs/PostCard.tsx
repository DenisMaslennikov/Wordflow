import type { Post } from "./types/Post.ts";
import Heading from "../../ui/Heading.tsx";
import styled from "styled-components";
import {
  BORDER_COLOR,
  MAX_POST_PREVIEW_HEIGHT,
  MAX_POST_PREVIEW_WIDTH,
  MAX_WIDTH_POST_IN_LIST,
} from "../../utils/constants.ts";
import DOMPurify from "dompurify";
import PostLink from "./PostLink.tsx";
import BlogLink from "./BlogLink.tsx";
import AuthorLink from "./AuthorLink.tsx";
import Tag from "./Tag.tsx";

const StyledPostCard = styled.div`
  margin: 1rem auto;
  border: var(${BORDER_COLOR}) 1px solid;
  max-width: ${MAX_WIDTH_POST_IN_LIST};
  width: 100%;
  padding: 1rem 1rem;
  border-radius: var(--border-radius-lg);

  & img {
    max-width: ${MAX_POST_PREVIEW_WIDTH};
    max-height: ${MAX_POST_PREVIEW_HEIGHT};
  }

  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.75rem;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const StyledTextBlock = styled.div`
  hyphens: auto;
  word-break: break-word;
`;

const Preview = styled.img`
  float: left;
  max-width: ${MAX_POST_PREVIEW_WIDTH};
  max-height: ${MAX_POST_PREVIEW_HEIGHT};
  margin-right: 1rem;
  display: block;
`;

function PostCard({ post }: { post: Post }) {
  return (
    <StyledPostCard>
      <PostLink post={post}>
        <Heading as={"h3"}>{post.title}</Heading>
      </PostLink>
      <PostMeta>
        <span>
          Опубликовано {post.publishedAt.toLocaleDateString()}{" "}
          {post.publishedAt.toLocaleTimeString()} в блоге
        </span>
        <BlogLink blog={post.blog} />
        <span>Автором</span>
        <AuthorLink author={post.user} />
      </PostMeta>
      <PostLink post={post}>
        {post.preview ? <Preview src={`${post.preview?.image}`} /> : null}
      </PostLink>
      <PostLink post={post}>
        <StyledTextBlock
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </PostLink>
      {post.tags.length > 0 && (
        <Tags>
          {post.tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </Tags>
      )}
    </StyledPostCard>
  );
}

export default PostCard;
