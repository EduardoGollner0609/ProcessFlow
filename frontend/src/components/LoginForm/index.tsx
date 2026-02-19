import "./styles.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseLogin from "../../hooks/auth/useLogin";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const useLogin = UseLogin()

  function onSubmit(data: LoginFormData) {
    useLogin.mutateAsync(data)
  }

  return (
    <form className="pf-login__form" onSubmit={handleSubmit(onSubmit)}  noValidate>
      <div className="pf-field">
        <label className="pf-label" htmlFor="email">
          E-mail
        </label>

        <div className={`pf-inputWrap ${errors.email ? "is-error" : ""}`}>
          <input
            className="pf-input"
            id="email"
            type="email"
            placeholder="seuemail@empresa.com"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
        </div>

        {errors.email && <p className="pf-error">{errors.email.message}</p>}
      </div>

      <div className="pf-field">
        <label className="pf-label" htmlFor="password">
          Senha
        </label>

        <div className={`pf-inputWrap ${errors.password ? "is-error" : ""}`}>
          <input
            className="pf-input"
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
            aria-invalid={!!errors.password}
          />
        </div>

        {errors.password && (
          <p className="pf-error">{errors.password.message}</p>
        )}
      </div>

      <div className="pf-login__row">
        <a className="pf-link" href="#">
          Esqueci minha senha
        </a>
      </div>

      <button className="pf-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>

      <p className="pf-login__foot">
        Não tem conta?{" "}
        <a className="pf-link" href="#">
          Criar agora
        </a>
      </p>
    </form>
  );
}
