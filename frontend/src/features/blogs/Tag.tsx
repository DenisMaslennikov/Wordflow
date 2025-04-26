import type { Tag } from "./types/Tag";
import Button from "../../ui/Button.tsx";
import { useSearchParams } from "react-router-dom";

interface TagProps {
  tag: Tag;
}

function Tag({ tag }: TagProps) {
  const [seachParams, setSeachParams] = useSearchParams();

  function handleClick() {
    seachParams.set("tag", tag.slug);
    setSeachParams(seachParams);
  }

  return (
    <Button onClick={handleClick} $style={"tag"} $size={"micro"}>
      {tag.name}
    </Button>
  );
}

export default Tag;
