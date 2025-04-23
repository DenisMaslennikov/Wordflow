import styled from "styled-components";

import useAuth from "../../hooks/useAuth.ts";
import Button from "../../ui/Button.tsx";
import Modal from "../../ui/Modal.tsx";
import UserCreateUpdateForm from "./UserCreateUpdateForm.tsx";
import LoginForm from "./LoginForm.tsx";
import UserProfileManagement from "./UserProfileManagement.tsx";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

function UserMenu() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <MenuContainer>
      {isAuthenticated ? (
        <>
          <UserProfileManagement />
          <Button $style={"regular"} $size={"small"} onClick={logout}>
            Выход
          </Button>
        </>
      ) : (
        <Modal>
          <Modal.Open modalId={"registration"}>
            <Button $style={"regular"} $size={"small"}>
              Регистрация
            </Button>
          </Modal.Open>
          <Modal.Window modalId={"registration"}>
            <UserCreateUpdateForm />
          </Modal.Window>
          <Modal.Open modalId={"Login"}>
            <Button $style={"regular"} $size={"small"}>
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
