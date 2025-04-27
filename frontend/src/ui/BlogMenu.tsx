import { HiHome, HiLink } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import MenuLink from "./MenuLink.tsx";
import Nav from "./Nav.tsx";
import MenuLinkList from "./MenuLinkList.tsx";

function BlogMenu() {
  const { blogSlug } = useParams();
  const home = blogSlug ? `/blog/${blogSlug}` : "/";
  return (
    <Nav>
      <MenuLinkList>
        <li>
          <MenuLink to={home}>
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
