import ButtonIcon from "../../ui/ButtonIcon.tsx";
import { HiPlus } from "react-icons/hi2";

function CreateBlog() {
  return (
    <ButtonIcon>
      <HiPlus />
      <span>Создать блог</span>
    </ButtonIcon>
  );
}

export default CreateBlog;
