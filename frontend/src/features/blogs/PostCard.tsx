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

const StyledPostCard = styled.div`
  margin: 1rem auto;
  border: var(${BORDER_COLOR}) 1px solid;
  max-width: ${MAX_WIDTH_POST_IN_LIST};
  width: 100%;
  padding: 1rem 1rem;

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
    <PostLink post={post}>
      <StyledPostCard>
        <Heading as={"h3"}>{post.title}</Heading>
        {post.preview ? <Preview src={`${post.preview?.image}`} /> : null}
        <StyledTextBlock
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </StyledPostCard>
    </PostLink>
  );
}

export default PostCard;
