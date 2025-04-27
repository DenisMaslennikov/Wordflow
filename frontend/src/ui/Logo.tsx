import styled from "styled-components";
import { IMG_HEADER_SIZE, TEXT_MAIN_COLOR } from "../utils/constants.ts";
import { Link } from "react-router-dom";

const Img = styled.img`
  height: ${IMG_HEADER_SIZE};
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
    <Link to={"/"}>
      <LogoContainer>
        <Img src={"/logo.png"} alt={"Logo"}></Img>
        <LogoText>Wordflow</LogoText>
      </LogoContainer>
    </Link>
  );
}

export default Logo;
