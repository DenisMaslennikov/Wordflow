import useMyBlogs from "./hooks/useMyBlogs.ts";
import CreateBlog from "../blogs/CreateBlog.tsx";

function MyBlogs() {
  const { myBlogs } = useMyBlogs();
  if (!myBlogs || myBlogs.length === 0)
    return <CreateBlog variant={"header"} />;
  return <div>Список блогов</div>;
}

export default MyBlogs;
