import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useClients from "../../hooks/clients/use-clients";
import UseCreateProcess from "../../hooks/processes/use-create-process";
import { ProcessMinDTO, ProcessRequestDTO } from "../../models/process";
import UseUpdateProcess from "../../hooks/processes/use-update-process";
import { FaArrowRight, FaSearch, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process?: ProcessMinDTO | null; // 👈 se vier, é edição
};

const schema = z.object({
  title: z.string().trim().min(1, "Título é obrigatório").max(120, "Título deve ter no máximo 120 caracteres"),
  description: z.string().trim().min(1, "Descrição é obrigatória").max(2000, "Descrição muito longa"),
  dueDate: z.string().min(1, "Prazo é obrigatório").regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  clientId: z.string(),
});

type FormData = z.infer<typeof schema>;

function isoToInputDate(iso: string) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export default function ProcessFormDialog({ open, onOpenChange, process }: Props) {
  const isEdit = !!process?.id;

  const createProcess = UseCreateProcess();
  const updateProcess = UseUpdateProcess();

  const loading = createProcess.isPending || updateProcess.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      clientId: "",
    },
  });

  // ✅ ao abrir: edit preenche, create limpa
  useEffect(() => {
    if (!open) return;

    if (process) {
      reset({
        title: process.title ?? "",
        description: process.description ?? "",
        dueDate: isoToInputDate(process.dueDate),
        clientId: process.client.id ?? "",
      });
    } else {
      reset({
        title: "",
        description: "",
        dueDate: "",
        clientId: "",
      });
    }
  }, [open, process, reset]);

  if (!open) return null;

  function close() {
    onOpenChange(false);
  }

  // client picker
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isFetching, isLoading } = useClients(page, search);

  const clients = data?.content ?? [];
  const hasNext = data ? !data.last : false;

  async function onSubmit(data: FormData) {
    try {
      const dueDateISO = new Date(`${data.dueDate}T00:00:00.000Z`).toISOString();

      const payload: ProcessRequestDTO = {
        title: data.title.trim(),
        description: data.description.trim(),
        dueDate: dueDateISO,
        clientId: data.clientId,
      };

      if (isEdit && process?.id) {
        await updateProcess.mutateAsync({ id: process.id, process: payload });
      } else {
        await createProcess.mutateAsync(payload);
      }

      reset();
      close();
    } catch {
      setError("root", {
        type: "server",
        message: isEdit ? "Não foi possível atualizar o processo." : "Não foi possível criar o processo.",
      });
    }
  }

  const selectedClientId = watch("clientId");

  return (
    <>
      <div className="pfOverlay" onClick={close} />

      <div
        className="pfDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pfProcessTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="pfDialog__header">
          <div>
            <h2 id="pfProcessTitle" className="pfDialog__title">
              {isEdit ? "Editar Processo" : "Novo Processo"}
            </h2>
            <p className="pfDialog__subtitle">
              {isEdit
                ? "Atualize os dados do processo no ProcessFlow."
                : "Preencha os dados para cadastrar um processo no ProcessFlow."}
            </p>
          </div>

          <button className="pfX" type="button" onClick={close} aria-label="Fechar">
            ×
          </button>
        </header>

        <div className="pfDivider" />

        <form className="pfForm" onSubmit={handleSubmit(onSubmit)} noValidate>
          {errors.root?.message && <p className="pfError">{errors.root.message}</p>}

          <div className="pfGrid">
            <div className="pfField pfField--full">
              <label className="pfLabel" htmlFor="title">Título *</label>
              <input
                id="title"
                className={`pfInput ${errors.title ? "is-error" : ""}`}
                type="text"
                maxLength={120}
                placeholder="Ex: Regularização de Documentação"
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              {errors.title ? (
                <small className="pfError">{errors.title.message}</small>
              ) : (
                <small className="pfHelp">Curto e específico (até 120 caracteres).</small>
              )}
            </div>

            <div className="pfField pfField--full">
              <label className="pfLabel" htmlFor="description">Descrição *</label>
              <textarea
                id="description"
                className={`pfTextarea ${errors.description ? "is-error" : ""}`}
                rows={4}
                placeholder="Descreva o que precisa ser feito, contexto e próximos passos..."
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && <small className="pfError">{errors.description.message}</small>}
            </div>

            <div className="pfField">
              <label className="pfLabel" htmlFor="dueDate">Prazo *</label>
              <input
                id="dueDate"
                className={`pfInput ${errors.dueDate ? "is-error" : ""}`}
                type="date"
                {...register("dueDate")}
                aria-invalid={!!errors.dueDate}
              />
              {errors.dueDate ? (
                <small className="pfError">{errors.dueDate.message}</small>
              ) : (
                <small className="pfHelp">Defina a data limite do processo.</small>
              )}
            </div>

    <div className="pfField pfField--full">
  <div className="pfClientSection">
    <div className="pfClientSection__header">
      <div>
        <label className="pfLabel pfClientSection__label">Cliente *</label>
        <p className="pfClientSection__subtitle">
          Busque e selecione o cliente responsável por este processo.
        </p>
      </div>

      {!isEdit && (
        <Link to="/dashboard/clients" className="pfClientLinkBtn">
          <FaUsers />
          Ir para clientes
          <FaArrowRight />
        </Link>
      )}
    </div>

    <div className="pfClientSection__divider" />

    <div className="pfClientSearchWrap">
      <FaSearch className="pfClientSearchIcon" />

      <input
        type="text"
        className="pfInput pfClientSearchInput"
        placeholder={isEdit ? "Busca desabilitada na edição" : "Buscar cliente pelo nome..."}
        value={search}
        onChange={(e) => {
          if (isEdit) return;
          setSearch(e.target.value);
          setPage(0);
        }}
        disabled={isEdit}
      />
    </div>

    <div
      className={`pfClientList ${isEdit ? "is-disabled" : ""}`}
    >
      {isLoading && (
        <div className="pfClientList__state">Carregando clientes...</div>
      )}

      {!isLoading && clients.length === 0 && (
        <div className="pfClientList__state">
          Nenhum cliente encontrado.
        </div>
      )}

      {clients.map((c, index) => {
        const selected = c.id === selectedClientId;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => setValue("clientId", c.id)}
            className={`pfClientOption ${selected ? "is-selected" : ""}`}
          >
            <div className="pfClientOption__top">
              <div className="pfClientOption__avatar">
                {c.name?.charAt(0)?.toUpperCase() || "C"}
              </div>

              <div className="pfClientOption__content">
                <div className="pfClientOption__name">{c.name}</div>
                <div className="pfClientOption__document">{c.document}</div>
              </div>
            </div>

            {selected && (
              <div className="pfClientOption__tag">Selecionado</div>
            )}

            {index < clients.length - 1 && <div className="pfClientOption__line" />}
          </button>
        );
      })}
    </div>

    <div className="pfClientPagination">
      <button
        type="button"
        className="pfBtn pfBtn--ghost"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0 || isFetching || isEdit}
      >
        Anterior
      </button>

      <button
        type="button"
        className="pfBtn pfBtn--ghost"
        onClick={() => setPage((p) => p + 1)}
        disabled={!hasNext || isFetching || isEdit}
      >
        {isFetching ? "..." : "Próxima"}
      </button>
    </div>

    {errors.clientId ? (
      <small className="pfError">{errors.clientId.message}</small>
    ) : (
      <small className="pfHelp">
        Selecione um cliente da lista abaixo.
      </small>
    )}
  </div>
</div>
          </div>

          <div className="pfDivider pfDivider--soft" />

          <footer className="pfActions">
            <button className="pfBtn pfBtn--ghost" type="button" onClick={close} disabled={loading}>
              Cancelar
            </button>

            <button className="pfBtn pfBtn--primary" type="submit" disabled={loading}>
              {loading ? "Salvando..." : isEdit ? "Salvar Alterações" : "Criar Processo"}
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}