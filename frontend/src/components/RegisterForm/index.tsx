import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import UseRegister from "../../hooks/auth/useRegister";

const schema = z
    .object({
        name: z
            .string()
            .min(2, "Nome deve ter no mínimo 2 caracteres")
            .max(120, "Nome muito longo")
            .regex(/^[\p{L} ]+$/u, "Nome deve conter apenas letras"),
        document: z
            .string()
            .min(11, "Documento inválido")
            .max(14, "Documento inválido")
            .regex(/^\d+$/, "Documento deve conter apenas números"),
        phone: z
            .string()
            .min(10, "Telefone inválido")
            .max(11, "Telefone inválido")
            .regex(/^\d+$/, "Telefone deve conter apenas números"),
        email: z.string().email("Email inválido").max(254, "Email muito longo"),
        password: z
            .string()
            .min(6, "Senha deve ter entre 6 e 18 caracteres")
            .max(18, "Senha deve ter entre 6 e 18 caracteres"),
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
        formState: { errors },
        setError,
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

    function onSubmit(formData: RegisterFormData) {
        // normaliza antes de enviar
        const registerData = {
            name: formData.name.trim().replace(/\s+/g, " "),
            document: formData.document.replace(/\D/g, ""),
            phone: formData.phone.replace(/\D/g, ""),
            email: formData.email.trim(),
            password: formData.password,
        };

        useRegister.mutate({ registerData, setError });
    }

    return (
        <form className="pf-login__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* erro geral do back (setError("root", ...)) */}
            {errors.root?.message && <p className="pf-error">{errors.root.message}</p>}

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
                <label className="pf-label" htmlFor="document">
                    Documento (CPF/CNPJ)
                </label>

                <div className={`pf-inputWrap ${errors.document ? "is-error" : ""}`}>
                    <input
                        className="pf-input"
                        id="document"
                        type="text"
                        inputMode="numeric"
                        placeholder="Somente números"
                        autoComplete="off"
                        {...register("document", {
                            onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            },
                        })}
                        aria-invalid={!!errors.document}
                    />
                </div>

                {errors.document && <p className="pf-error">{errors.document.message}</p>}
            </div>

            <div className="pf-field">
                <label className="pf-label" htmlFor="phone">
                    Telefone
                </label>

                <div className={`pf-inputWrap ${errors.phone ? "is-error" : ""}`}>
                    <input
                        className="pf-input"
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="DDD + número (somente números)"
                        autoComplete="tel"
                        {...register("phone", {
                            onChange: (e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            },
                        })}
                        aria-invalid={!!errors.phone}
                    />
                </div>

                {errors.phone && <p className="pf-error">{errors.phone.message}</p>}
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

            <button className="pf-btn" type="submit" disabled={useRegister.isPending}>
                {useRegister.isPending ? "Criando..." : "Criar conta"}
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