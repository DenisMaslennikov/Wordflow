import styled from "styled-components";

const Form = styled.form<{ $width?: string }>`
  width: ${({ $width = "100%" }) => $width};
`;

export default Form;
