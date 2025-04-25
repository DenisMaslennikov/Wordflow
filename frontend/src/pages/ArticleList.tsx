import PostList from "../features/blogs/PostList.tsx";
import styled from "styled-components";

const StyledArticleList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
`;

function ArticleList() {
  return (
    <StyledArticleList>
      <PostList />
    </StyledArticleList>
  );
}

export default ArticleList;
