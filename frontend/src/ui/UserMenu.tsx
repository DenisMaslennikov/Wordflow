import useUser from "../hooks/useUser.ts";
import AuthorizedUserMenu from "../features/authentication/AuthorizedUserMenu.tsx";
import UnauthorizedUserMenu from "../features/authentication/UnauthorizedUserMenu.tsx";
import SpinnerMini from "./SpinnerMini.tsx";

function UserMenu() {
  const { isUserLoading, user } = useUser();

  if (isUserLoading) return <SpinnerMini />;
  return user?.id ? <AuthorizedUserMenu /> : <UnauthorizedUserMenu />;
}

export default UserMenu;
