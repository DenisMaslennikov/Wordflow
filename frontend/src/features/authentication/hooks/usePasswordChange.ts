import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/userService.ts";
import toast from "react-hot-toast";

function usePasswordChange() {
  const { mutate: changePassword, isPending: isPasswordChanging } = useMutation(
    {
      mutationFn: userService.updateUserMe,
      onSuccess: () => {
        toast.success("Пароль изменен");
      },
      onError: () => {
        toast.error("Ошибка изменения пароля");
      },
    },
  );
  return { changePassword, isPasswordChanging };
}

export default usePasswordChange;
