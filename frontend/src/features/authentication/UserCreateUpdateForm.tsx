import { useEffect } from "react";

import Form from "../../ui/Form.tsx";
import useUser from "./hooks/useUser.ts";
import Spinner from "../../ui/Spinner.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { FieldErrors, useForm } from "react-hook-form";
import type { UserSignupForm, UserUpdateForm } from "./types/User.ts";
import useCreateUser from "./hooks/useCreateUser.ts";
import FormRowVertical from "../../ui/FormRowVertical.tsx";
import Input from "../../ui/Input.tsx";
import TextArea from "../../ui/TextArea.tsx";
import Button from "../../ui/Button.tsx";
import FormRowHorizontal from "../../ui/FormRowHorizontal.tsx";
import useUpdateUserMe from "./hooks/useUpdateUserMe.ts";
import ImageInput from "../../ui/ImageInput.tsx";
import {
  PASSWORD_MIN_LENGTH,
  WIDTH_REGISTRATION_MODAL,
} from "../../utils/constants.ts";
import CheckBox from "../../ui/CheckBox.tsx";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё0-9_-]{2,29}$/;

function UserCreateUpdateForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const { user, isUserLoading } = useUser();
  const { isAuthenticated } = useAuth();

  const { register, handleSubmit, reset, formState, watch } = useForm<
    UserSignupForm | UserUpdateForm
  >();

  const { isUserCreating, createUser } = useCreateUser();
  const { updateUserMe, isUserUpdating } = useUpdateUserMe();

  const isAvatarDelete = watch("avatar_delete");

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

  const isBusy = isUserCreating || isUserUpdating;

  const { errors } = formState;

  if (isUserLoading) return <Spinner />;

  function onSubmit(form: UserSignupForm | UserUpdateForm) {
    if (!isAuthenticated) {
      createUser(form as UserSignupForm, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } else {
      updateUserMe(form as UserUpdateForm, {
        onSuccess: () => onCloseModal?.(),
      });
    }
  }

  function handleReset() {
    if (user)
      reset({
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    else reset();
  }

  return (
    <Form $width={WIDTH_REGISTRATION_MODAL} onSubmit={handleSubmit(onSubmit)}>
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
          autoComplete={"email"}
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
          <FormRowVertical
            label={"Пароль"}
            error={(errors as FieldErrors<UserSignupForm>)?.password?.message}
          >
            <Input
              autoComplete={"new-password"}
              id={"password"}
              disabled={isBusy}
              placeholder={"Пароль"}
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
            error={
              (errors as FieldErrors<UserSignupForm>)?.repeatPassword?.message
            }
          >
            <Input
              id={"repeatPassword"}
              autoComplete={"new-password"}
              disabled={isBusy}
              placeholder={"Повтор пароля"}
              type={"password"}
              {...register("repeatPassword", {
                required: "Введите пароль повторно",
                validate: (value, formValues) =>
                  value === (formValues as UserSignupForm).password ||
                  "Пароли не совпадают",
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
      {isAuthenticated && user?.avatar && (
        <FormRowVertical
          error={
            (errors as FieldErrors<UserUpdateForm>)?.avatar_delete?.message
          }
        >
          <CheckBox
            label={"Удалить аватар"}
            id={"deleteAvatar"}
            {...register("avatar_delete")}
          />
        </FormRowVertical>
      )}
      <FormRowVertical label={"Аватар"} error={errors?.avatar?.message}>
        <ImageInput
          id={"image"}
          disabled={isBusy || isAvatarDelete}
          {...register("avatar")}
          $width={WIDTH_REGISTRATION_MODAL}
          src={user?.avatar ? user?.avatar : undefined}
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
          type={"button"}
          onClick={handleReset}
        >
          Отмена
        </Button>
      </FormRowHorizontal>
    </Form>
  );
}

export default UserCreateUpdateForm;
