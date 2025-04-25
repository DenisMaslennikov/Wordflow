import usePosts from "./hooks/usePosts.ts";
import Spinner from "../../ui/Spinner.tsx";
import styled from "styled-components";
import FooterPaginator from "../../ui/FooterPaginator.tsx";
import { DEFAULT_POSTS_PER_PAGE } from "../../utils/constants.ts";
import { useSearchParams } from "react-router-dom";
import PostCard from "./PostCard.tsx";

const StyledPostList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
`;

function PostList() {
  const { posts, isPostsLoading, pages, from, to, count } = usePosts();
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get("limit") ?? DEFAULT_POSTS_PER_PAGE);

  if (isPostsLoading) return <Spinner />;

  return (
    <>
      <StyledPostList>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </StyledPostList>

      <FooterPaginator
        pagesNumber={pages}
        from={from}
        to={to}
        countResults={count}
        limit={limit}
      />
    </>
  );
}

export default PostList;
