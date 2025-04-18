import useUser from "../hooks/useUser.ts";
import AuthorizedUserMenu from "../features/authentication/AuthorizedUserMenu.tsx";
import UnauthorizedUserMenu from "../features/authentication/UnauthorizedUserMenu.tsx";

function UserMenu() {
  const user = useUser();
  return user?.id ? <AuthorizedUserMenu /> : <UnauthorizedUserMenu />;
}

export default UserMenu;
