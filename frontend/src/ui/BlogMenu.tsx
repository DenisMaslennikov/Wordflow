import { HiHome, HiLink } from "react-icons/hi2";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { HOVER_COLOR } from "../utils/constants.ts";

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const MenuLinkList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  list-style: none;
`;

const MenuLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;

    gap: 0.3rem;

    color: var(--color-grey-700);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 0.5rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-active);
    background-color: var(${HOVER_COLOR});
    border-radius: var(--border-radius-sm);
  }

  & svg {
    color: var(--color-grey-900);
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-active);
  }
`;

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
