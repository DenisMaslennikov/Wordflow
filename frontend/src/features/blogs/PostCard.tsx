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

const LinkBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
      <LinkBlock>
        <AuthorLink author={post.user} />
        <BlogLink blog={post.blog} />
      </LinkBlock>
      <PostLink post={post}>
        {post.preview ? <Preview src={`${post.preview?.image}`} /> : null}
      </PostLink>
      <PostLink post={post}>
        <StyledTextBlock
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </PostLink>
    </StyledPostCard>
  );
}

export default PostCard;
