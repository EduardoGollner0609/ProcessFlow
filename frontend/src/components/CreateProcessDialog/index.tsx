import "./styles.css";
import { useMemo, useState } from "react";

export enum ProcessStatus {
  EM_ESPERA = "EM_ESPERA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CANCELADO = "CANCELADO",
  CONCLUIDO = "CONCLUIDO",
}

export type ClientMinDTO = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
};

export type UserMinDTO = {
  id: string;
  name: string;
  email: string;
};

export type CreateProcessPayload = {
  title: string;
  description: string;
  status: ProcessStatus;
  dueDate: string; // ISO string
  clientId: string;
  responsibleUserId?: string | null;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  clients: ClientMinDTO[];
  users?: UserMinDTO[];

  /** dispara no submit com payload pronto */
  onSubmit: (payload: CreateProcessPayload) => void | Promise<void>;

  /** opcional: valores iniciais */
  defaultStatus?: ProcessStatus;
};

export default function CreateProcessDialog({
  open,
  onOpenChange,
  clients,
  users = [],
  onSubmit,
  defaultStatus = ProcessStatus.EM_ESPERA,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProcessStatus>(defaultStatus);
  const [dueDate, setDueDate] = useState(""); // yyyy-mm-dd
  const [clientId, setClientId] = useState("");
  const [responsibleUserId, setResponsibleUserId] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      !!status &&
      !!dueDate &&
      !!clientId
    );
  }, [title, description, status, dueDate, clientId]);

  if (!open) return null;

  function close() {
    onOpenChange(false);
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus(defaultStatus);
    setDueDate("");
    setClientId("");
    setResponsibleUserId("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // date input vem yyyy-mm-dd. Transformando em ISO (UTC) no início do dia.
    const dueDateISO = new Date(`${dueDate}T00:00:00.000Z`).toISOString();

    const payload: CreateProcessPayload = {
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate: dueDateISO,
      clientId,
      responsibleUserId: responsibleUserId ? responsibleUserId : null,
    };

    await onSubmit(payload);
    resetForm();
    close();
  }

  return (
    <>
      <div className="pfOverlay" onClick={close} />

      <div
        className="pfDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pfCreateTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="pfDialog__header">
          <div>
            <h2 id="pfCreateTitle" className="pfDialog__title">
              Novo Processo
            </h2>
            <p className="pfDialog__subtitle">
              Preencha os dados para cadastrar um processo no ProcessFlow.
            </p>
          </div>

          <button className="pfX" type="button" onClick={close} aria-label="Fechar">
            ×
          </button>
        </header>

        <div className="pfDivider" />

        <form className="pfForm" onSubmit={handleSubmit}>
          <div className="pfGrid">
            <div className="pfField pfField--full">
              <label className="pfLabel" htmlFor="title">
                Título *
              </label>
              <input
                id="title"
                name="title"
                className="pfInput"
                type="text"
                maxLength={120}
                placeholder="Ex: Regularização de Documentação"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <small className="pfHelp">Curto e específico (até 120 caracteres).</small>
            </div>

            <div className="pfField pfField--full">
              <label className="pfLabel" htmlFor="description">
                Descrição *
              </label>
              <textarea
                id="description"
                name="description"
                className="pfTextarea"
                rows={4}
                placeholder="Descreva o que precisa ser feito, contexto e próximos passos..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="pfField">
              <label className="pfLabel" htmlFor="status">
                Status *
              </label>
              <select
                id="status"
                name="status"
                className="pfSelect"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProcessStatus)}
                required
              >
                <option value={ProcessStatus.EM_ESPERA}>Em espera</option>
                <option value={ProcessStatus.EM_ANDAMENTO}>Em andamento</option>
                <option value={ProcessStatus.CANCELADO}>Cancelado</option>
                <option value={ProcessStatus.CONCLUIDO}>Concluído</option>
              </select>
            </div>

            <div className="pfField">
              <label className="pfLabel" htmlFor="dueDate">
                Prazo *
              </label>
              <input
                id="dueDate"
                name="dueDate"
                className="pfInput"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <small className="pfHelp">Defina a data limite do processo.</small>
            </div>

            <div className="pfField pfField--full">
              <label className="pfLabel" htmlFor="clientId">
                Cliente *
              </label>
              <select
                id="clientId"
                name="clientId"
                className="pfSelect"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} • {c.document}
                  </option>
                ))}
              </select>
              <small className="pfHelp">O processo sempre precisa estar vinculado a um cliente.</small>
            </div>

            <div className="pfField pfField--full">
              <label className="pfLabel" htmlFor="responsibleUserId">
                Responsável (opcional)
              </label>
              <select
                id="responsibleUserId"
                name="responsibleUserId"
                className="pfSelect"
                value={responsibleUserId}
                onChange={(e) => setResponsibleUserId(e.target.value)}
              >
                <option value="">Nenhum</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pfDivider pfDivider--soft" />

          <footer className="pfActions">
            <button className="pfBtn pfBtn--ghost" type="button" onClick={close}>
              Cancelar
            </button>

            <button className="pfBtn pfBtn--primary" type="submit" disabled={!canSubmit}>
              Criar Processo
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
