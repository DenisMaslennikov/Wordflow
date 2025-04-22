import { useForm } from "react-hook-form";
import type { LoginForm } from "./types/User.ts";
import useLogin from "./hooks/useLogin.ts";
import Form from "../../ui/Form.tsx";
import FormRowVertical from "../../ui/FormRowVertical.tsx";
import Button from "../../ui/Button.tsx";
import Input from "../../ui/Input.tsx";
import SpinnerMini from "../../ui/SpinnerMini.tsx";
import useAuth from "../../hooks/useAuth.ts";

function LoginForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const { register, formState, handleSubmit } = useForm<LoginForm>();
  const { setTokens } = useAuth();
  const { login, isLogin } = useLogin({ setTokens });

  const { errors } = formState;

  function onSubmit(form: LoginForm) {
    login(form, { onSuccess: () => onCloseModal?.() });
  }

  return (
    <Form $width={"350px"} onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label={"Email"} error={errors?.email?.message}>
        <Input disabled={isLogin} type={"email"} {...register("email")} />{" "}
      </FormRowVertical>
      <FormRowVertical label={"Пароль"}>
        <Input disabled={isLogin} type={"password"} {...register("password")} />
      </FormRowVertical>
      <FormRowVertical error={errors?.password?.message}>
        <Button $style={"regular"} $size={"medium"} disabled={isLogin}>
          {isLogin ? <SpinnerMini /> : "Войти"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
