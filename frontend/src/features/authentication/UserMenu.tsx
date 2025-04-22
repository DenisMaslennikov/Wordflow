import styled from "styled-components";

import SpinnerMini from "../../ui/SpinnerMini.tsx";
import useUser from "./hooks/useUser.ts";
import useAuth from "../../hooks/useAuth.ts";
import Button from "../../ui/Button.tsx";
import Modal from "../../ui/Modal.tsx";
import UserCreateUpdateForm from "./UserCreateUpdateForm.tsx";
import LoginForm from "./LoginForm.tsx";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

function UserMenu() {
  const { isUserLoading, user } = useUser();
  const { isAuthenticated } = useAuth();

  if (isUserLoading || user === undefined) return <SpinnerMini />;

  return (
    <MenuContainer>
      {isAuthenticated ? (
        <Button $style={"link"} $size={"large"}>
          {user.username}
        </Button>
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
