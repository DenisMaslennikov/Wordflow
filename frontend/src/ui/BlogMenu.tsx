import Nav from "./Nav.tsx";
import MenuLink from "./MenuLink.tsx";
import MenuLinkList from "./MenuLinkList.tsx";
import { HiHome, HiLink } from "react-icons/hi2";

function BlogMenu() {
  return (
    <Nav>
      <MenuLinkList>
        <li>
          <MenuLink to={"/"}>
            <HiHome />
            <span>Главная</span>
          </MenuLink>
        </li>
        <li>
          <MenuLink to={"somelink"}>
            <HiLink />
            <span>Link #1</span>
          </MenuLink>
        </li>
        <li>
          <MenuLink to={"somelink2"}>
            <HiLink />
            <span>Link #2</span>
          </MenuLink>
        </li>
      </MenuLinkList>
    </Nav>
  );
}

export default BlogMenu;
