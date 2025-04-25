import styled from "styled-components";
import { BACKGROUND_COLOR } from "../utils/constants.ts";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(${BACKGROUND_COLOR});
  min-height: 0;
`;

export default AppWrapper;
