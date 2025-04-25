import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledPostListView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
`;

function PostListView() {
  return (
    <StyledPostListView>
      <Outlet />
    </StyledPostListView>
  );
}

export default PostListView;
