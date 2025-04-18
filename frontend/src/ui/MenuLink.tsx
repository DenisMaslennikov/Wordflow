import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HOVER_COLOR } from "../utils/constants.ts";

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

export default MenuLink;
