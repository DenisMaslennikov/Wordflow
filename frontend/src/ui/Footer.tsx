import styled from "styled-components";
import { BORDER_COLOR } from "../utils/constants.ts";

const StyledFooter = styled.footer`
  display: flex;
  gap: 1rem;
  width: 100%;
  border-top: var(${BORDER_COLOR}) 1px solid;
`;

type FooterProps = {
  count: number;
  pages: number;
  to: number;
  from: number;
};

function Footer({ count, pages, from, to }: FooterProps) {
  return (
    <StyledFooter>{`Всего ${count} результатов показаны с ${from} по ${to} страниц ${pages}`}</StyledFooter>
  );
}

export default Footer;
