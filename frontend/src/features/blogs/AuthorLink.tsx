import { UserShort } from "../authentication/types/User.ts";
import StyledLink from "../../ui/StyledLink.tsx";
import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

interface AuthorLinkProps {
  author: UserShort;
}

function AuthorLink({ author }: AuthorLinkProps) {
  return (
    <StyledLink to={`/user/${author.username}`}>
      <UserContainer>{author.username}</UserContainer>
    </StyledLink>
  );
}

export default AuthorLink;
