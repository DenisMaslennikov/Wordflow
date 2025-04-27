import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postService } from "../api/postService.ts";
import { toDetailedPost } from "../transform/toPost.ts";
import { POST_QUERY_KEY } from "../../../utils/constants.ts";

function usePost() {
  const postId = Number(useParams().postId);

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryFn: () => postService.getPost(postId),
    queryKey: [POST_QUERY_KEY, postId],
    select: (data) => toDetailedPost(data),
  });

  return { post, isPostLoading };
}

export default usePost;
