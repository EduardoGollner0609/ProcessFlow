import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import UseRegister from "../../hooks/auth/useRegister";

const schema = z
    .object({
        name: z.string(),
        document: z.string(),
        phone: z.string(),
        email: z.string(),
        password: z.string(),
        confirmPassword: z.string(),

    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não conferem",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof schema>;

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            document: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const useRegister = UseRegister();

    function onSubmit(data: RegisterFormData) {
        useRegister.mutate(data)
    }

    return (
        <form className="pf-login__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="pf-field">
                <label className="pf-label" htmlFor="name">
                    Nome
                </label>

                <div className={`pf-inputWrap ${errors.name ? "is-error" : ""}`}>
                    <input
                        className="pf-input"
                        id="name"
                        type="text"
                        placeholder="Seu nome"
                        autoComplete="name"
                        {...register("name")}
                        aria-invalid={!!errors.name}
                    />
                </div>

                {errors.name && <p className="pf-error">{errors.name.message}</p>}
            </div>

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
                        autoComplete="new-password"
                        {...register("password")}
                        aria-invalid={!!errors.password}
                    />
                </div>

                {errors.password && <p className="pf-error">{errors.password.message}</p>}
            </div>

            <div className="pf-field">
                <label className="pf-label" htmlFor="confirmPassword">
                    Confirmar senha
                </label>

                <div className={`pf-inputWrap ${errors.confirmPassword ? "is-error" : ""}`}>
                    <input
                        className="pf-input"
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...register("confirmPassword")}
                        aria-invalid={!!errors.confirmPassword}
                    />
                </div>

                {errors.confirmPassword && (
                    <p className="pf-error">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button className="pf-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar conta"}
            </button>

            <p className="pf-login__foot">
                Já tem conta?{" "}
                <Link className="pf-link" to="/login">
                    Entrar
                </Link>
            </p>
        </form>
    );
}
