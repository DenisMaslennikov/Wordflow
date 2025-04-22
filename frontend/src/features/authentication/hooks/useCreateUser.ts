import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/userService.ts";
import toast from "react-hot-toast";

function useCreateUser() {
  const { mutate: createUser, isPending: isUserCreating } = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      toast.success("Вы зарегистрированы");
    },
    onError: (error) => {
      toast.error(`Ошибка регистрации: ${error.message}`);
    },
  });
  return { createUser, isUserCreating };
}

export default useCreateUser;
