import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Logo from "./Logo.tsx";
import BlogMenu from "./BlogMenu.tsx";

function BlogLayout() {
  return (
    <>
      <Header>
        <Header.LeftHeaderBlock>
          <Logo />
          <BlogMenu />
        </Header.LeftHeaderBlock>
        <Header.RightHeaderBlock>
          <button>Регистрация</button>
        </Header.RightHeaderBlock>
      </Header>
      <Outlet />
    </>
  );
}

export default BlogLayout;
