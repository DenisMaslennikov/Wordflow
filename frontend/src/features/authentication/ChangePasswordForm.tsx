import { useForm } from "react-hook-form";
import type { ChangePasswordForm } from "./types/User.ts";
import Form from "../../ui/Form.tsx";
import FormRowVertical from "../../ui/FormRowVertical.tsx";
import Input from "../../ui/Input.tsx";
import {
  PASSWORD_MIN_LENGTH,
  WIDTH_LOGIN_MODAL,
} from "../../utils/constants.ts";
import usePasswordChange from "./hooks/usePasswordChange.ts";
import FormRowHorizontal from "../../ui/FormRowHorizontal.tsx";
import Button from "../../ui/Button.tsx";
import useUser from "./hooks/useUser.ts";

function ChangePasswordForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const { register, formState, handleSubmit } = useForm<ChangePasswordForm>();
  const { changePassword, isPasswordChanging } = usePasswordChange();

  const { user } = useUser();

  const { errors } = formState;

  function onSubmit(form: ChangePasswordForm) {
    changePassword(form, { onSuccess: () => onCloseModal?.() });
  }

  return (
    <Form $width={WIDTH_LOGIN_MODAL} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: "none" }}
        tabIndex={-1}
        disabled={true}
        value={user?.username}
      />
      <Input
        type="text"
        name="email"
        autoComplete="email"
        style={{ display: "none" }}
        tabIndex={-1}
        disabled={true}
        value={user?.email}
      />
      <FormRowVertical label={"Новый пароль"} error={errors?.password?.message}>
        <Input
          autoComplete={"new-password"}
          id={"password"}
          disabled={isPasswordChanging}
          placeholder={"Новый пароль"}
          type={"password"}
          {...register("password", {
            required: "Не указан пароль",
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Минимальная длинна пароля ${PASSWORD_MIN_LENGTH} символов`,
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label={"Повтор пароля"}
        error={errors?.repeatPassword?.message}
      >
        <Input
          id={"repeatPassword"}
          autoComplete={"new-password"}
          disabled={isPasswordChanging}
          placeholder={"Повтор пароля"}
          type={"password"}
          {...register("repeatPassword", {
            required: "Введите пароль повторно",
            validate: (value, formValues) =>
              value === formValues.password || "Пароли не совпадают",
          })}
        />
      </FormRowVertical>
      <FormRowHorizontal>
        <Button
          $fullWidth
          $size={"medium"}
          $style={"regular"}
          disabled={isPasswordChanging}
        >
          Изменить
        </Button>
      </FormRowHorizontal>
    </Form>
  );
}

export default ChangePasswordForm;
