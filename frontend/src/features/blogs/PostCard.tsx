import type { Post } from "./types/Post.ts";
import Heading from "../../ui/Heading.tsx";
import styled from "styled-components";
import { BORDER_COLOR } from "../../utils/constants.ts";

const StyledPostCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  border: var(${BORDER_COLOR}) 1px solid;
  max-width: 1024px;
  width: 100%;
`;

function PostCard({ post }: { post: Post }) {
  return (
    <StyledPostCard>
      <Heading as={"h3"}>{post.title}</Heading>
    </StyledPostCard>
  );
}

export default PostCard;
