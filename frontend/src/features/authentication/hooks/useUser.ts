import { useQuery } from "@tanstack/react-query";

import { userService } from "../api/userService.ts";
import { USER_PROFILE_STALE_TIME } from "../../../utils/constants.ts";

function useUser() {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryFn: userService.getUserMe,
    queryKey: ["user"],
    staleTime: USER_PROFILE_STALE_TIME,
  });
  return { isUserLoading, user };
}

export default useUser;
