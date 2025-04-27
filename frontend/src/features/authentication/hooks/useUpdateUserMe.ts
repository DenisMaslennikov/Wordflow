import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { userService } from "../api/userService.ts";
import { USER_QUERY_KEY } from "../../../utils/constants.ts";

function useUpdateUserMe() {
  const queryClient = useQueryClient();

  const { mutate: updateUserMe, isPending: isUserUpdating } = useMutation({
    mutationFn: userService.updateUserMe,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: [USER_QUERY_KEY] }, data);
      toast.success("Данные пользователя обновлены");
    },
    onError: () => toast.error("Ошибка обновления данных"),
  });
  return { updateUserMe, isUserUpdating };
}

export default useUpdateUserMe;
