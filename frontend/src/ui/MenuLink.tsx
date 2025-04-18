import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MenuLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;

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
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }
`;

export default MenuLink;
