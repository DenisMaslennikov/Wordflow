import usePosts from "./hooks/usePosts.ts";
import Spinner from "../../ui/Spinner.tsx";
import styled from "styled-components";

const StyledPostList = styled.div`
  flex: 1;
  display: flex;
`;

function PostList() {
  const { posts, isPostsLoading } = usePosts();

  if (isPostsLoading) return <Spinner />;

  return <StyledPostList>Список постов</StyledPostList>;
}

export default PostList;
