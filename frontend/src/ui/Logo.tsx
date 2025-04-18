import styled from "styled-components";

const Img = styled.img`
  height: 3rem;
  width: auto;
`;

function Logo() {
  return <Img src={"/logo.png"} alt={"Logo"}></Img>;
}

export default Logo;
