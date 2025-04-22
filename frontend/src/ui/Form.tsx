import styled from "styled-components";
import { BORDER_COLOR } from "../utils/constants.ts";

const Form = styled.form`
  border-radius: var(--border-radius-md);
  border: 1px solid var(${BORDER_COLOR});
`;

export default Form;
