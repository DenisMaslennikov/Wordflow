import Nav from "./Nav.tsx";
import MenuLink from "./MenuLink.tsx";
import MenuLinkList from "./MenuLinkList.tsx";

function BlogMenu() {
  return (
    <Nav>
      <MenuLinkList>
        <li>
          <MenuLink to={"/"}>Главная</MenuLink>
        </li>
        <li>
          <MenuLink to={"somelink"}>Link #1</MenuLink>
        </li>
        <li>
          <MenuLink to={"somelink2"}>Link #2</MenuLink>
        </li>
      </MenuLinkList>
    </Nav>
  );
}

export default BlogMenu;
