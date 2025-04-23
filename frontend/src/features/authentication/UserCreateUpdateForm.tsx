import { useEffect } from "react";

import Form from "../../ui/Form.tsx";
import useUser from "./hooks/useUser.ts";
import Spinner from "../../ui/Spinner.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { useForm } from "react-hook-form";
import type { UserForm } from "./types/User.ts";
import useCreateUser from "./hooks/useCreateUser.ts";
import FormRowVertical from "../../ui/FormRowVertical.tsx";
import Input from "../../ui/Input.tsx";
import TextArea from "../../ui/TextArea.tsx";
import Button from "../../ui/Button.tsx";
import FormRowHorizontal from "../../ui/FormRowHorizontal.tsx";
import FileInput from "../../ui/FileInput.tsx";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9_-]{2,29}$/;

function UserCreateUpdateForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const { user, isUserLoading } = useUser();
  const { isAuthenticated } = useAuth();

  const { register, handleSubmit, reset, formState } = useForm<UserForm>();

  const { isUserCreating, createUser } = useCreateUser();

  useEffect(() => {
    if (user)
      reset({
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
  }, [user, reset]);

  const isBusy = isUserCreating || false;

  const { errors } = formState;

  if (isUserLoading || !user) return <Spinner />;

  function onSubmit(form: UserForm) {
    if (!isAuthenticated) {
      const user = { ...form };

      if (form.avatar instanceof FileList) {
        user.avatar = form.avatar[0];
      }

      createUser(user, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  return (
    <Form $width={"350px"} onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label={"Имя пользователя"}
        error={errors?.username?.message}
      >
        <Input
          id={"username"}
          disabled={isBusy}
          placeholder={"Имя пользователя"}
          {...register("username", {
            required: "Не указано имя пользователя",
            pattern: {
              value: USERNAME_REGEX,
              message:
                "Имя пользователя должно начинаться с буквы и содержать латиницу, буквы русского алфавита, цифры  символы _-",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label={"Email"} error={errors?.email?.message}>
        <Input
          id={"email"}
          disabled={isBusy}
          placeholder={"Email"}
          type="email"
          {...register("email", {
            required: "Не указан email",
            pattern: {
              value: EMAIL_REGEX,
              message: "Введите валидный email",
            },
          })}
        />
      </FormRowVertical>
      {!isAuthenticated && (
        <>
          <FormRowVertical label={"Пароль"} error={errors?.password?.message}>
            <Input
              id={"password"}
              disabled={isBusy}
              placeholder={"Пароль"}
              type={"password"}
              {...register("password", {
                required: "Не указан пароль",
                minLength: {
                  value: 8,
                  message: "Минимальная длинна пароля 8 символов",
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
              disabled={isBusy}
              placeholder={"Повтор пароля"}
              type={"password"}
              {...register("repeatPassword", {
                required: "Введите пароль повторно",
                validate: (value, formValues) =>
                  value === formValues.password || "Пароли не совпадают",
              })}
            />
          </FormRowVertical>
        </>
      )}
      <FormRowVertical label={"Имя"} error={errors?.first_name?.message}>
        <Input
          id={"first_name"}
          disabled={isBusy}
          placeholder={"Имя"}
          {...register("first_name")}
        />
      </FormRowVertical>
      <FormRowVertical label={"Фамилия"} error={errors?.last_name?.message}>
        <Input
          id={"last_name"}
          disabled={isBusy}
          placeholder={"Фамилия"}
          {...register("last_name")}
        />
      </FormRowVertical>
      <FormRowVertical label={"О себе"} error={errors?.bio?.message}>
        <TextArea
          id={"bio"}
          disabled={isBusy}
          rows={5}
          placeholder={"О себе"}
          {...register("bio")}
        />
      </FormRowVertical>
      <FormRowVertical label={"Аватар"} error={errors?.bio?.message}>
        <FileInput
          id={"image"}
          disabled={isBusy}
          {...register("avatar")}
          accept="image/*"
          multiple={false}
        />
      </FormRowVertical>

      <FormRowHorizontal>
        <Button $size={"medium"} $style={"regular"} disabled={isBusy}>
          {isAuthenticated ? "Сохранить" : "Регистрация"}
        </Button>
        <Button
          $size={"medium"}
          $style={"link"}
          disabled={isBusy}
          type={"reset"}
        >
          Отмена
        </Button>
      </FormRowHorizontal>
    </Form>
  );
}

export default UserCreateUpdateForm;
