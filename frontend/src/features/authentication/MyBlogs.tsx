import useMyBlogs from "./hooks/useMyBlogs.ts";

function MyBlogs() {
  const { myBlogs } = useMyBlogs();
  return <div>Список блогов</div>;
}

export default MyBlogs;
