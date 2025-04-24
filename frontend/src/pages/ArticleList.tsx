import PostList from "../features/blogs/PostList.tsx";
import styled from "styled-components";

const StyledArticleList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

function ArticleList() {
  return (
    <StyledArticleList>
      <PostList />
    </StyledArticleList>
  );
}

export default ArticleList;
