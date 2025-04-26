import DOMPurify from "dompurify";
import styled from "styled-components";
import { Link } from "react-router-dom";

import type { Post } from "./types/Post.ts";
import Heading from "../../ui/Heading.tsx";
import {
  BORDER_COLOR,
  MAX_POST_PREVIEW_HEIGHT,
  MAX_POST_PREVIEW_WIDTH,
  MAX_WIDTH_POST_IN_LIST,
} from "../../utils/constants.ts";
import Tag from "./Tag.tsx";
import postToLink from "./utils/postToLink.ts";
import Tags from "./Tags.tsx";
import PostBottomContainer from "./PostBottomContainer.tsx";
import PostMeta from "./PostMeta.tsx";

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

      <PostMeta post={post} />

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
