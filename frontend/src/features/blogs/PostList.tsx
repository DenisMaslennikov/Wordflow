import usePosts from "./hooks/usePosts.ts";
import Spinner from "../../ui/Spinner.tsx";
import styled from "styled-components";
import Footer from "../../ui/Footer.tsx";

const StyledPostList = styled.div`
  flex: 1;
  display: flex;
`;

function PostList() {
  const { posts, isPostsLoading, pages, from, to, count } = usePosts();

  if (isPostsLoading) return <Spinner />;

  return (
    <>
      <StyledPostList>Список постов</StyledPostList>
      <Footer pages={pages} from={from} to={to} count={count} />
    </>
  );
}

export default PostList;
