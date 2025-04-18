import { useQuery } from "@tanstack/react-query";
import { userAPI } from "../features/authentication/userAPI.ts";

function useUser() {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryFn: userAPI.getUserMe,
    queryKey: ["user"],
    staleTime: 60_000,
  });
  return { isUserLoading, user };
}

export default useUser;
