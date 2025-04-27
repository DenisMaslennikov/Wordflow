import styled from "styled-components";
import { BORDER_COLOR, HEADER_SIZE } from "../utils/constants.ts";
import React from "react";

const StyledHeader = styled.header`
  border-bottom: 1px solid var(${BORDER_COLOR});
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.5rem 1rem;
  max-height: ${HEADER_SIZE};
`;

const LeftHeaderBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  height: 100%;
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
