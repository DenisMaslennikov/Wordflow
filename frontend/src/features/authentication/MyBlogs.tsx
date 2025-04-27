import useMyBlogs from "./hooks/useMyBlogs.ts";
import CreateBlog from "../blogs/CreateBlog.tsx";
import DropDownMenu from "../../ui/DropDownMenu.tsx";

function MyBlogs() {
  const { myBlogs } = useMyBlogs();
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
