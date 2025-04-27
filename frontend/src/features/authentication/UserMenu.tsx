import styled from "styled-components";

import useAuth from "../../hooks/useAuth.ts";
import Button from "../../ui/Button.tsx";
import Modal from "../../ui/Modal.tsx";
import UserCreateUpdateForm from "./UserCreateUpdateForm.tsx";
import LoginForm from "./LoginForm.tsx";
import UserProfileManagement from "./UserProfileManagement.tsx";
import MyBlogs from "./MyBlogs.tsx";
import useUser from "./hooks/useUser.ts";
import useMyBlogs from "./hooks/useMyBlogs.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
`;

function UserMenu() {
  const { isAuthenticated, logout } = useAuth();
  const { isUserLoading } = useUser();
  const { isMyBlogsLoading } = useMyBlogs();
  const isUserInfoLoading = isMyBlogsLoading || isUserLoading;

  return (
    <MenuContainer>
      {isAuthenticated ? (
        <>
          {isUserInfoLoading ? (
            <SpinnerMini />
          ) : (
            <>
              <MyBlogs />
              <UserProfileManagement />
            </>
          )}
          <Button $style={"regular"} $size={"medium"} onClick={logout}>
            Выход
          </Button>
        </>
      ) : (
        <Modal>
          <Modal.Open modalId={"registration"}>
            <Button $style={"regular"} $size={"medium"}>
              Регистрация
            </Button>
          </Modal.Open>
          <Modal.Window modalId={"registration"}>
            <UserCreateUpdateForm />
          </Modal.Window>
          <Modal.Open modalId={"Login"}>
            <Button $style={"regular"} $size={"medium"}>
              Вход
            </Button>
          </Modal.Open>
          <Modal.Window modalId={"Login"}>
            <LoginForm />
          </Modal.Window>
        </Modal>
      )}
    </MenuContainer>
  );
}

export default UserMenu;
