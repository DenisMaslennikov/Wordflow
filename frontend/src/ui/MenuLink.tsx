import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MenuLink = styled(NavLink)`
  padding: 1rem;
  text-decoration: none;

  &.active {
    color: var(--color-active);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }
`;

export default MenuLink;
