import { UserShort } from "../authentication/types/User.ts";
import StyledLink from "../../ui/StyledLink.tsx";

interface AuthorLinkProps {
  author: UserShort;
}

function AuthorLink({ author }: AuthorLinkProps) {
  return <StyledLink to={`/user/${author.id}`}>{author.username}</StyledLink>;
}

export default AuthorLink;
