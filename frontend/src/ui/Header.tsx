import styled from "styled-components";
import { BORDER_COLOR } from "../utils/constants.ts";
import React from "react";

const StyledHeader = styled.header`
  height: auto;
  border-bottom: 1px solid var(${BORDER_COLOR});
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.5rem 1rem;
  min-height: 73px;
`;

const LeftHeaderBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const RightHeaderBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

function Header({ children }: { children: React.ReactNode }) {
  return <StyledHeader>{children}</StyledHeader>;
}

Header.LeftHeaderBlock = LeftHeaderBlock;
Header.RightHeaderBlock = RightHeaderBlock;

export default Header;
