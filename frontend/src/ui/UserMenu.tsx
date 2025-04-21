import AuthorizedUserMenu from "../features/authentication/AuthorizedUserMenu.tsx";
import UnauthorizedUserMenu from "../features/authentication/UnauthorizedUserMenu.tsx";
import SpinnerMini from "./SpinnerMini.tsx";
import useAuth from "../hooks/useAuth.ts";
import useUser from "../features/authentication/hooks/useUser.ts";

function UserMenu() {
  const { isAuthenticated } = useAuth();
  const { isUserLoading } = useUser();

  if (isUserLoading) return <SpinnerMini />;
  return isAuthenticated ? <AuthorizedUserMenu /> : <UnauthorizedUserMenu />;
}

export default UserMenu;
