import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Logo from "./Logo.tsx";
import BlogMenu from "./BlogMenu.tsx";
import useDarkMode from "../hooks/useDarkMode.ts";
import ButtonIcon from "./ButtonIcon.tsx";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import UserMenu from "../features/authentication/UserMenu.tsx";

function BlogLayout() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <Header>
        <Header.LeftHeaderBlock>
          <Logo />
          <BlogMenu />
        </Header.LeftHeaderBlock>
        <Header.RightHeaderBlock>
          <UserMenu />
          <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </ButtonIcon>
        </Header.RightHeaderBlock>
      </Header>
      <Outlet />
    </>
  );
}

export default BlogLayout;
