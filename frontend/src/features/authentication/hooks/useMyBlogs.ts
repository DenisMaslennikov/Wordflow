import { useQuery } from "@tanstack/react-query";

import { userService } from "../api/userService.ts";
import { USER_PROFILE_STALE_TIME } from "../../../utils/constants.ts";

function useMyBlogs() {
  const { data: myBlogs, isLoading: isMyBlogsLoading } = useQuery({
    queryFn: userService.getMyBlogs,
    queryKey: ["myBlogs"],
    staleTime: USER_PROFILE_STALE_TIME,
  });

  return { myBlogs, isMyBlogsLoading };
}

export default useMyBlogs;
