import { HiPlus } from "react-icons/hi2";
import Button from "../../ui/Button.tsx";

function CreateBlog({ variant }: { variant: "list" | "header" }) {
  if (variant === "header")
    return (
      <Button $style={"link"} $size={"medium"}>
        <HiPlus />
        <span>Создать блог</span>
      </Button>
    );
  if (variant === "list")
    return (
      <Button $style={"link"} $size={"smallFullWidth"}>
        <HiPlus />
        <span>Создать блог</span>
      </Button>
    );
}

export default CreateBlog;
