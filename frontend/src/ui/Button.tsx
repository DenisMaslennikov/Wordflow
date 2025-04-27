import styled, { css } from "styled-components";
import {
  BACKGROUND_COLOR,
  HOVER_COLOR,
  LINK_COLOR,
} from "../utils/constants.ts";

const styles = {
  tag: css`
    color: var(${LINK_COLOR});
    border: none;
    background-color: var(${BACKGROUND_COLOR});
    padding: 0.1rem 0.2rem;

    &:hover {
      background-color: var(${HOVER_COLOR});
    }
  `,
  link: css`
    border: none;
    background-color: var(${BACKGROUND_COLOR});

    &:hover {
      background-color: var(${HOVER_COLOR});
    }
  `,
  regular: css`
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
};

const sizes = {
  micro: css`
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  `,
  small: css`
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: 500;
    text-align: center;
  `,
  medium: css`
    font-size: 1.3rem;
    padding: 0.5rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 0.5rem;
    font-weight: 500;
  `,
};

export type ButtonProps = {
  $style: keyof typeof styles;
  $size: keyof typeof sizes;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
  $center?: boolean;
};

const Button = styled.button<ButtonProps>`
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  ${({ $fullHeight }) => $fullHeight && "height: 100%;"}
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}
  ${({ $center }) => $center && "justify-content: center;"}
  
  ${({ $style }) => styles[$style]};
  ${({ $size }) => sizes[$size]}
`;

export default Button;
