import styled from "styled-components";
import { MAX_WIDTH_POST_IN_LIST } from "../../utils/constants.ts";
import usePost from "./hooks/usePost.ts";
import Spinner from "../../ui/Spinner.tsx";
import ResourceNotFound from "../../ui/ResourceNotFound.tsx";
import Heading from "../../ui/Heading.tsx";
import DOMPurify from "dompurify";
import PostMeta from "./PostMeta.tsx";
import Tags from "./Tags.tsx";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${MAX_WIDTH_POST_IN_LIST};
  margin: 1rem auto;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1 1 auto;
`;

const ContentContainer = styled.div`
  & img {
    max-width: ${MAX_WIDTH_POST_IN_LIST};
    width: 100%;
  }
`;

function PostDetailed() {
  const { post, isPostLoading } = usePost();

  if (isPostLoading) return <Spinner />;

  if (!post) return <ResourceNotFound message={"Пост не найден"} />;

  return (
    <PostContainer>
      <Heading as={"h1"}>{post.title}</Heading>
      <PostMeta post={post} />
      <ContentContainer
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />
      <Tags tags={post.tags} />
    </PostContainer>
  );
}

export default PostDetailed;
