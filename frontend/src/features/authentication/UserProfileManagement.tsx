import Modal from "../../ui/Modal.tsx";
import UserCreateUpdateForm from "./UserCreateUpdateForm.tsx";
import useUser from "./hooks/useUser.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";
import DropDownMenu from "../../ui/DropDownMenu.tsx";
import ChangePasswordForm from "./ChangePasswordForm.tsx";
import Avatar from "../../ui/Avatar.tsx";
import { IMG_HEADER_SIZE } from "../../utils/constants.ts";
import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

function UserProfileManagement() {
  const { isUserLoading, user } = useUser();

  if (isUserLoading || !user) return <SpinnerMini />;

  return (
    <DropDownMenu>
      <Modal>
        <DropDownMenu.Toggle
          $style={"link"}
          $size={"small"}
          id={"user-profile-management"}
        >
          <UserContainer>
            <span>{user.username}</span>
            <Avatar $width={IMG_HEADER_SIZE} src={user.avatar} />
          </UserContainer>
        </DropDownMenu.Toggle>
        <DropDownMenu.List id="user-profile-management">
          <Modal.Open modalId={"editUser"}>
            <DropDownMenu.ListItem $size={"smallFullWidth"} $style={"link"}>
              Редактировать профиль
            </DropDownMenu.ListItem>
          </Modal.Open>
          <Modal.Open modalId={"changePassword"}>
            <DropDownMenu.ListItem $size={"smallFullWidth"} $style={"link"}>
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
