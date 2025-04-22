import styled, { css } from "styled-components";
import { BACKGROUND_COLOR, HOVER_COLOR } from "../utils/constants.ts";

const styles = {
  link: css`
    border: none;
    background-color: var(${BACKGROUND_COLOR});

    &:hover {
      background-color: var(${HOVER_COLOR});
    }
  `,
};

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

type ButtonProps = {
  $style: keyof typeof styles;
  $size: keyof typeof sizes;
};

const Button = styled.button<ButtonProps>`
  border-radius: var(--border-radius-sm);
  ${({ $style }) => styles[$style]};
  ${({ $size }) => sizes[$size]}
`;

export default Button;
