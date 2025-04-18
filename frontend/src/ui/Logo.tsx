import styled from "styled-components";
import { TEXT_MAIN_COLOR } from "../utils/constants.ts";

const Img = styled.img`
  height: 3rem;
  width: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  text-align: center;
  align-items: center;
`;

const LogoText = styled.span`
  color: var(${TEXT_MAIN_COLOR});
  font-size: 2rem;
  font-weight: 400;
  font-family: "Permanent Marker", cursive;
  font-style: normal;
`;

function Logo() {
  return (
    <LogoContainer>
      <Img src={"/logo.png"} alt={"Logo"}></Img>
      <LogoText>Wordflow</LogoText>
    </LogoContainer>
  );
}

export default Logo;
