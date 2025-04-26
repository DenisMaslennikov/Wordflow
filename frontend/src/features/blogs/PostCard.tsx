import DOMPurify from "dompurify";
import styled from "styled-components";

import type { Post } from "./types/Post.ts";
import Heading from "../../ui/Heading.tsx";
import {
  BORDER_COLOR,
  MAX_POST_PREVIEW_HEIGHT,
  MAX_POST_PREVIEW_WIDTH,
  MAX_WIDTH_POST_IN_LIST,
} from "../../utils/constants.ts";
import BlogLink from "./BlogLink.tsx";
import AuthorLink from "./AuthorLink.tsx";
import Tag from "./Tag.tsx";
import { Link } from "react-router-dom";
import postToLink from "./utils/postToLink.ts";

const ReadMore = styled(Link)`
  border: none;
  color: var(--color-brand-50);
  background-color: var(--color-brand-500);
  border-radius: var(--border-radius-sm);
  font-size: 1rem;

  padding: 0.5rem 1rem;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const PostBottomContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

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
    height: auto;
    width: 100%;
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
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex: 1 1 auto;
`;

const StyledTextBlock = styled.div`
  hyphens: auto;
  word-break: break-word;
`;

const Preview = styled.img`
  align-self: center;
  justify-self: center;
  max-width: ${MAX_POST_PREVIEW_WIDTH};
  max-height: ${MAX_POST_PREVIEW_HEIGHT};
  height: auto;
  width: 100%;
  margin-right: 1rem;
  display: block;
`;

function PostCard({ post }: { post: Post }) {
  return (
    <StyledPostCard>
      <Link to={postToLink(post)}>
        <Heading as={"h3"}>{post.title}</Heading>
      </Link>
      <PostMeta>
        <span>
          Опубликовано {post.publishedAt.toLocaleDateString()}{" "}
          {post.publishedAt.toLocaleTimeString()} в блоге
        </span>
        <BlogLink blog={post.blog} />
        <span>Автором</span>
        <AuthorLink author={post.user} />
      </PostMeta>

      {post.preview ? (
        <Link to={postToLink(post)}>
          <Preview src={`${post.preview?.image}`} />
        </Link>
      ) : null}

      <StyledTextBlock
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />
      <PostBottomContainer>
        {post.tags.length > 0 && (
          <Tags>
            {post.tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </Tags>
        )}
        <ReadMore to={postToLink(post)}>Далее</ReadMore>
      </PostBottomContainer>
    </StyledPostCard>
  );
}

export default PostCard;
