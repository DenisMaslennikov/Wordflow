import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postService } from "../api/postService.ts";
import { toDetailedPost } from "../transform/toPost.ts";

function usePost() {
  const postId = Number(useParams().postId);

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryFn: () => postService.getPost(postId),
    queryKey: ["post", postId],
    select: (data) => toDetailedPost(data),
  });

  return { post, isPostLoading };
}

export default usePost;
