import useMyBlogs from "./hooks/useMyBlogs.ts";
import CreateBlog from "../blogs/CreateBlog.tsx";
import DropDownMenu from "../../ui/DropDownMenu.tsx";
import { useNavigate } from "react-router-dom";

function MyBlogs() {
  const { myBlogs } = useMyBlogs();
  const navigate = useNavigate();
  if (!myBlogs || myBlogs.length === 0)
    return <CreateBlog variant={"header"} />;
  return (
    <DropDownMenu>
      <DropDownMenu.Toggle
        $fullHeight
        $size={"medium"}
        $style={"link"}
        menuId="myBlogs"
      >
        Мои блоги
      </DropDownMenu.Toggle>
      <DropDownMenu.List menuId={"myBlogs"}>
        {myBlogs.map((blog) => (
          <DropDownMenu.ListItem
            onClick={() => navigate(`/admin/${blog.slug}`)}
            key={blog.id}
            $size={"small"}
            $style={"link"}
            $fullWidth
          >
            {blog.title}
          </DropDownMenu.ListItem>
        ))}
        <CreateBlog variant={"list"} />
      </DropDownMenu.List>
    </DropDownMenu>
  );
}

export default MyBlogs;
