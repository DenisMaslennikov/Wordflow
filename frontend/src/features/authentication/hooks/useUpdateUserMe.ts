import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { userService } from "../api/userService.ts";

function useUpdateUserMe() {
  const queryClient = useQueryClient();

  const { mutate: updateUserMe, isPending: isUserUpdating } = useMutation({
    mutationFn: userService.updateUserMe,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["user"] }, data);
      toast.success("Данные пользователя обновлены");
    },
    onError: () => toast.error("Ошибка обновления данных"),
  });
  return { updateUserMe, isUserUpdating };
}

export default useUpdateUserMe;
