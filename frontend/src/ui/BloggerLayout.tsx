import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

function BloggerLayout() {
  return (
    <>
      <Header>BloggerLayout</Header>
      <Outlet />
    </>
  );
}

export default BloggerLayout;
