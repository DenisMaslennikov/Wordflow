import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/userService.ts";

function useUser() {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryFn: userService.getUserMe,
    queryKey: ["user"],
    staleTime: 60_000,
  });
  return { isUserLoading, user };
}

export default useUser;
