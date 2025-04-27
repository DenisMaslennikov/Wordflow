import Modal from "../../ui/Modal.tsx";
import UserCreateUpdateForm from "./UserCreateUpdateForm.tsx";
import useUser from "./hooks/useUser.ts";
import DropDownMenu from "../../ui/DropDownMenu.tsx";
import ChangePasswordForm from "./ChangePasswordForm.tsx";
import Avatar from "../../ui/Avatar.tsx";
import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  height: 100%;
`;

function UserProfileManagement() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <DropDownMenu>
      <Modal>
        <DropDownMenu.Toggle
          $style={"link"}
          $size={"medium"}
          $fullHeight
          id={"user-profile-management"}
        >
          <UserContainer>
            <span>{user.username}</span>
            {user.avatar && <Avatar $size={"100%"} src={user.avatar} />}
          </UserContainer>
        </DropDownMenu.Toggle>
        <DropDownMenu.List id="user-profile-management">
          <Modal.Open modalId={"editUser"}>
            <DropDownMenu.ListItem $fullWidth $size={"small"} $style={"link"}>
              Редактировать профиль
            </DropDownMenu.ListItem>
          </Modal.Open>
          <Modal.Open modalId={"changePassword"}>
            <DropDownMenu.ListItem $fullWidth $size={"small"} $style={"link"}>
              Сменить пароль
            </DropDownMenu.ListItem>
          </Modal.Open>
        </DropDownMenu.List>
        <Modal.Window modalId={"editUser"}>
          <UserCreateUpdateForm />
        </Modal.Window>
        <Modal.Window modalId={"changePassword"}>
          <ChangePasswordForm />
        </Modal.Window>
      </Modal>
    </DropDownMenu>
  );
}

export default UserProfileManagement;
