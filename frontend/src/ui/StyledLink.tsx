import styled from "styled-components";
import { Link } from "react-router-dom";
import { HOVER_COLOR, LINK_COLOR } from "../utils/constants.ts";

const StyledLink = styled(Link)`
  padding: 0.3rem;
  color: var(${LINK_COLOR});
  &:hover {
    background-color: var(${HOVER_COLOR});
  }
`;

export default StyledLink;
