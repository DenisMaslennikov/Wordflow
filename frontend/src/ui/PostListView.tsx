import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledPostListView = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

function PostListView() {
  return (
    <StyledPostListView>
      <Outlet />
    </StyledPostListView>
  );
}

export default PostListView;
