import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/userService.ts";
import toast from "react-hot-toast";
import { TokensPair } from "../types/Tokens.ts";
import currentUserCachePredicate from "../../../utils/currentUserCachePredicate.ts";

function useLogin({ setTokens }: { setTokens: (tokens: TokensPair) => void }) {
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: userService.login,
    onSuccess: (data) => {
      setTokens(data);
      queryClient.invalidateQueries({
        predicate: currentUserCachePredicate,
      });

      toast.success("Вы вошли в систему");
    },
    onError: () => {
      toast.error("Неверный логин или пароль");
    },
  });

  return { login, isLogin };
}

export default useLogin;
