import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Logo from "./Logo.tsx";
import BlogMenu from "./BlogMenu.tsx";
import UserMenu from "../features/authentication/UserMenu.tsx";
import DarkModeToggle from "./DarkModeToggle.tsx";

function BlogLayout() {
  return (
    <>
      <Header>
        <Header.LeftHeaderBlock>
          <Logo />
          <BlogMenu />
        </Header.LeftHeaderBlock>
        <Header.RightHeaderBlock>
          <UserMenu />
          <DarkModeToggle />
        </Header.RightHeaderBlock>
      </Header>
      <Outlet />
    </>
  );
}

export default BlogLayout;
