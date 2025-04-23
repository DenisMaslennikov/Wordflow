import Modal from "../../ui/Modal.tsx";
import UserCreateUpdateForm from "./UserCreateUpdateForm.tsx";
import useUser from "./hooks/useUser.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";
import DropDownMenu from "../../ui/DropDownMenu.tsx";

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
          {user.username}
        </DropDownMenu.Toggle>
        <DropDownMenu.List id="user-profile-management">
          <Modal.Open modalId={"editUser"}>
            <DropDownMenu.ListItem $size={"smallFullWidth"} $style={"link"}>
              Редактировать профиль
            </DropDownMenu.ListItem>
          </Modal.Open>
          <DropDownMenu.ListItem $size={"smallFullWidth"} $style={"link"}>
            Сменить пароль
          </DropDownMenu.ListItem>
        </DropDownMenu.List>
        <Modal.Window modalId={"editUser"}>
          <UserCreateUpdateForm />
        </Modal.Window>
      </Modal>
    </DropDownMenu>
  );
}

export default UserProfileManagement;
