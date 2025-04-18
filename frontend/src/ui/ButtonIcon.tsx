import styled from "styled-components";
import { HOVER_COLOR, BUTTON_TEXT_COLOR } from "../utils/constants.ts";

const ButtonIcon = styled.button<{ $height?: string; $width?: string }>`
  background: none;
  border: none;
  padding: 0.5rem;

  & svg {
    width: ${({ $width = "2.2rem" }) => $width};
    height: ${({ $height = "2.2rem" }) => $height};
    color: var(${BUTTON_TEXT_COLOR});
  }

  &:hover {
    background-color: var(${HOVER_COLOR});
  }
`;

export default ButtonIcon;
