import { useNavigate } from "react-router-dom";
import { ProcessMinDTO } from "../../models/process";
import PaginationControl from "../PaginationControl";
import "./styles.css";
import { FaEdit, FaTrash } from "react-icons/fa";

/** ===== Tipos corretos ===== */
export enum ProcessStatus {
  EM_ESPERA = "EM_ESPERA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CANCELADO = "CANCELADO",
  CONCLUIDO = "CONCLUIDO",
}

/** ===== Componente ===== */
interface ProcessesTableProps {
  processes: ProcessMinDTO[];
  pageNumber: number
  lastPage: boolean
  firstPage: boolean
  nextPageFunction: () => void
  prevPageFunction: () => void
  openEdit?: (process: ProcessMinDTO) => void;
  openDelete?: (processId: string) => void;
  onCreate?: () => void;
  onFilters?: () => void;
}

export default function ProcessesTable({
  processes,
  openEdit,
  openDelete,
  pageNumber,
  lastPage,
  firstPage,
  nextPageFunction,
  prevPageFunction
}: ProcessesTableProps) {
  const navigate = useNavigate();

  return (
    <div className="pfp-card">
      <div className="pfp-tableWrap">
        <table className="pfp-table">
          <thead>
            <tr>
              <th>Processo</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Prazo</th>
              <th>Criado em</th>
              <th className="pfp-thActions">Ações</th>
            </tr>
          </thead>

          <tbody>
            {processes.length === 0 ? (
              <tr>
                <td className="pfp-empty" colSpan={6}>
                  Nenhum processo cadastrado ainda.
                </td>
              </tr>
            ) : (
              processes.map((p) => (
                <tr key={p.id} onClick={() => navigate(`/dashboard/process/${p.id}`)} className="processes-link">
                  <td>
                    <div className="pfp-proc">
                      <div className="pfp-proc__top">
                        <span className="pfp-proc__title">{p.title}</span>
                      </div>

                      {p.description ? (
                        <div className="pfp-proc__desc">{p.description}</div>
                      ) : null}

                      <div className="pfp-proc__meta">
                        <span className="pfp-metaItem">
                          <span className="pfp-metaDot" />
                          #{p.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="pfp-client">
                      <div className="pfp-avatar" aria-hidden="true">
                        {initials(p.client.name)}
                      </div>

                      <div className="pfp-client__text">
                        <div className="pfp-client__name">{p.client.name}</div>
                        <div className="pfp-client__sub">
                          <span>{p.client.email}</span>
                          <span className="pfp-sep">•</span>
                          <span className="pfp-mono">{p.client.document}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`pfp-status pfp-status--${statusClass(p.status)}`}>
                      <span className="pfp-statusDot" />
                      {labelStatus(p.status)}
                    </span>
                  </td>

                  <td>
                    <div className="pfp-date">
                      <span className="pfp-date__main">{formatDate(p.dueDate)}</span>
                    </div>
                  </td>

                  <td className="pfp-muted">{formatDate(p.createMoment)}</td>

                  <td>
                    <div className="pfp-actions">
                      <button
                        className="pfp-iconBtn"
                        type="button"
                        title="Editar"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit?.(p);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="pfp-iconBtn pfp-iconBtn--danger"
                        type="button"
                        title="Excluir"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDelete?.(p.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <PaginationControl
          prevPageFunction={prevPageFunction}
          nextPageFunction={nextPageFunction}
          firstPage={firstPage}
          lastPage={lastPage}
          pageNumber={pageNumber} />
      </div>
    </div>
  );
}

/** ===== helpers ===== */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const value = parts.map((p) => p[0]?.toUpperCase()).join("");
  return value || "CL";
}

function formatDate(value?: string): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR");
}

function labelStatus(s: ProcessStatus): string {
  const map: Record<ProcessStatus, string> = {
    [ProcessStatus.EM_ESPERA]: "Em espera",
    [ProcessStatus.EM_ANDAMENTO]: "Em andamento",
    [ProcessStatus.CANCELADO]: "Cancelado",
    [ProcessStatus.CONCLUIDO]: "Concluído",
  };
  return map[s];
}

/**
 * Se você quiser CSS tipo:
 * .pfp-status--waiting, .pfp-status--progress etc
 * aqui você faz o “de/para” do enum -> classe.
 */
function statusClass(s: ProcessStatus): "waiting" | "progress" | "cancelled" | "done" {
  const map: Record<ProcessStatus, "waiting" | "progress" | "cancelled" | "done"> = {
    [ProcessStatus.EM_ESPERA]: "waiting",
    [ProcessStatus.EM_ANDAMENTO]: "progress",
    [ProcessStatus.CANCELADO]: "cancelled",
    [ProcessStatus.CONCLUIDO]: "done",
  };
  return map[s];
}
