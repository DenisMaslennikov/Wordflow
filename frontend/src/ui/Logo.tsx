import styled from "styled-components";
import { TEXT_MAIN_COLOR } from "../utils/constants.ts";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  height: 100%;
`;

const Img = styled.img`
  height: 100%;
  object-fit: cover;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  text-align: center;
  align-items: center;
  height: 100%;
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
    <StyledLink to={"/"}>
      <LogoContainer>
        <Img src={"/logo.png"} alt={"Logo"}></Img>
        <LogoText>Wordflow</LogoText>
      </LogoContainer>
    </StyledLink>
  );
}

export default Logo;
