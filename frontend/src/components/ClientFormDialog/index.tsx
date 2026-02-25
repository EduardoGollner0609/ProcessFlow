import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.css";
import UseCreateClient from "../../hooks/clients/use-create-client";
import UseUpdateClient from "../../hooks/clients/use-update-client";


type Props = {
    open: boolean;
    onClose: () => void;
    client?: ClientMinDTO | null;
};

export type ClientMinDTO = {
    id: string;
    name: string;
    email: string;
    phone: string;
    document: string;
};

export type ClientPayload = {
    name: string;
    email: string;
    phone: string;
    document: string;
};

const schema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório").max(120, "Nome muito longo"),
    email: z.string().trim().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    phone: z.string().trim().min(1, "Telefone é obrigatório").max(30, "Telefone muito longo"),
    document: z.string().trim().min(1, "Documento é obrigatório").max(30, "Documento muito longo"),
});

type FormData = z.infer<typeof schema>;

export default function ClientFormDialog({ open, onClose, client }: Props) {
    const isEdit = !!client?.id;

    const createClient = UseCreateClient();
    const updateClient = UseUpdateClient();

    const loading = createClient.isPending || updateClient.isPending;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            document: "",
        },
    });

    // ✅ quando abrir: se for edit, preenche; se for create, limpa
    useEffect(() => {
        if (!open) return;

        if (client) {
            reset({
                name: client.name ?? "",
                email: client.email ?? "",
                phone: client.phone ?? "",
                document: client.document ?? "",
            });
        } else {
            reset({
                name: "",
                email: "",
                phone: "",
                document: "",
            });
        }
    }, [open, client, reset]);

    if (!open) return null;

    async function onSubmit(data: FormData) {
        try {
            if (isEdit && client?.id) {
                await updateClient.mutateAsync({ id: client.id, client: data });
            } else {
                await createClient.mutateAsync(data);
            }

            onClose();
            reset();
        } catch {
            setError("root", {
                type: "server",
                message: isEdit
                    ? "Não foi possível atualizar o cliente."
                    : "Não foi possível salvar o cliente.",
            });
        }
    }

    return (
        <>
            <div className="pfOverlay" onClick={onClose} />

            <div
                className="pfDialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pfClientFormTitle"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="pfDialog__header">
                    <div>
                        <h2 id="pfClientFormTitle" className="pfDialog__title">
                            {isEdit ? "Editar Cliente" : "Novo Cliente"}
                        </h2>
                        <p className="pfDialog__subtitle">
                            {isEdit
                                ? "Atualize os dados do cliente no ProcessFlow."
                                : "Preencha os dados para cadastrar um cliente no ProcessFlow."}
                        </p>
                    </div>

                    <button className="pfX" type="button" onClick={onClose} aria-label="Fechar">
                        ×
                    </button>
                </header>

                <div className="pfDivider" />

                <form className="pfForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {errors.root?.message && <p className="pfError">{errors.root.message}</p>}

                    <div className="pfGrid">
                        <div className="pfField pfField--full">
                            <label className="pfLabel" htmlFor="name">
                                Nome *
                            </label>
                            <input
                                id="name"
                                className={`pfInput ${errors.name ? "is-error" : ""}`}
                                type="text"
                                placeholder="Nome completo"
                                {...register("name")}
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && <small className="pfError">{errors.name.message}</small>}
                        </div>

                        <div className="pfField">
                            <label className="pfLabel" htmlFor="email">
                                E-mail *
                            </label>
                            <input
                                id="email"
                                className={`pfInput ${errors.email ? "is-error" : ""}`}
                                type="email"
                                placeholder="email@exemplo.com"
                                {...register("email")}
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && <small className="pfError">{errors.email.message}</small>}
                        </div>

                        <div className="pfField">
                            <label className="pfLabel" htmlFor="phone">
                                Telefone *
                            </label>
                            <input
                                id="phone"
                                className={`pfInput ${errors.phone ? "is-error" : ""}`}
                                type="tel"
                                placeholder="(00) 00000-0000"
                                {...register("phone")}
                                aria-invalid={!!errors.phone}
                            />
                            {errors.phone && <small className="pfError">{errors.phone.message}</small>}
                        </div>

                        <div className="pfField pfField--full">
                            <label className="pfLabel" htmlFor="document">
                                Documento *
                            </label>
                            <input
                                id="document"
                                className={`pfInput ${errors.document ? "is-error" : ""}`}
                                type="text"
                                placeholder="CPF ou CNPJ"
                                {...register("document")}
                                aria-invalid={!!errors.document}
                            />
                            {errors.document ? (
                                <small className="pfError">{errors.document.message}</small>
                            ) : (
                                <small className="pfHelp">Informe CPF ou CNPJ.</small>
                            )}
                        </div>
                    </div>

                    <div className="pfDivider pfDivider--soft" />

                    <footer className="pfActions">
                        <button
                            className="pfBtn pfBtn--ghost"
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>

                        <button className="pfBtn pfBtn--primary" type="submit" disabled={loading}>
                            {loading ? "Salvando..." : isEdit ? "Salvar Alterações" : "Salvar Cliente"}
                        </button>
                    </footer>
                </form>
            </div>
        </>
    );
}