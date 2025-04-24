import styled from "styled-components";
import { BORDER_COLOR } from "../utils/constants.ts";

const StyledFooter = styled.footer`
  display: flex;
  gap: 1rem;
  width: 100%;
  border-top: var(${BORDER_COLOR}) 1px solid;
`;

function Footer() {
  return <StyledFooter>footer</StyledFooter>;
}

export default Footer;
