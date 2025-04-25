import styled, { css } from "styled-components";

const Heading = styled.h1<{ as: string }>`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      hyphens: auto;
      word-break: break-word;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      hyphens: auto;
      word-break: break-word;
    `}  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      hyphens: auto;
      word-break: break-word;
    `}  

  line-height: 1.4
`;

export default Heading;
