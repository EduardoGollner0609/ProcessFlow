import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaCommentDots,
  FaDownload,
  FaImage,
  FaLink,
  FaPlus,
  FaRegTrashAlt,
  FaTasks,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import UseProcessById from "../../../hooks/processes/use-process";
import TaskForm from "../../../components/TaskForm/index.tsx";
import TasksCheckList from "../../../components/TasksCheckList/index.tsx";
import EmptyState from "../../../components/EmptyState/index.tsx";

/** ===== Tipos (ajuste conforme seu backend) ===== */
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
  phone?: string;
};

export type UserMinDTO = {
  id: string;
  name: string;
  email: string;
};

export type ProcessDetailsDTO = {
  id: string;
  title: string;
  description?: string | null;
  status: ProcessStatus;
  dueDate?: string;
  createMoment?: string;

  client: ClientMinDTO;
  responsibleUser?: UserMinDTO | null;

  // exemplos para “tabs”
  images?: { id: string; url: string; name?: string; uploadedAt?: string }[];
  comments?: { id: string; author: string; message: string; createdAt: string }[];
  tasks?: { id: string; title: string; done: boolean; createdAt: string }[];
};

type Props = {
  onBack?: () => void;
  onEdit?: (processId: string) => void;
  onDelete?: (processId: string) => void;

  // ações das tabs (opcionais)
  onAddImage?: (file: File) => void;
  onAddComment?: (message: string) => void;
  onAddTask?: (title: string) => void;
  onToggleTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onDeleteComment?: (commentId: string) => void;
};

type TabKey = "images" | "comments" | "tasks";

export default function ProcessDetailsPage({
  onEdit,
  onDelete,
  onAddImage,
  onAddComment,
  onAddTask,
  onDeleteComment,
}: Props) {

  const { processId } = useParams()

  const { data: process } = UseProcessById(processId!!);

  const images = [
    {
      id: "img-01",
      url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=60",
      name: "Comprovante_01.jpg",
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: "img-02",
      url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=60",
      name: "Documento_Assinado.png",
      uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    },
  ];

  const navigate = useNavigate();

  const [tab, setTab] = useState<TabKey>("tasks");
  const [commentDraft, setCommentDraft] = useState("");
  const [taskDraft, setTaskDraft] = useState("");

  const late = useMemo(() => isLate(process?.dueDate, process?.status), [process?.dueDate, process?.status]);

  const statusLabel = useMemo(() => labelStatus(process?.status!!), [process?.status]);
  const statusCls = useMemo(() => statusClass(process?.status!!, late), [process?.status, late]);

  const initialsClient = useMemo(() => initials(process?.client?.name ?? ""), [process?.client?.name]);

  function handlePickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onAddImage?.(file);
    e.target.value = "";
  }

  function submitComment() {
    const msg = commentDraft.trim();
    if (!msg) return;
    onAddComment?.(msg);
    setCommentDraft("");
  }

  function submitTask() {
    const title = taskDraft.trim();
    if (!title) return;
    onAddTask?.(title);
    setTaskDraft("");
  }

  return (
    <div className="pfd-page">
      {/* ===== Topbar ===== */}
      <div className="pfd-topbar">
        <button className="pfd-backBtn" type="button" onClick={() => navigate("/dashboard/processes")} title="Voltar">
          <FaArrowLeft />
          Voltar
        </button>

        <div className="pfd-topActions">
          <button className="pfd-btn pfd-btn--ghost" type="button" onClick={() => onEdit?.(process?.id!!)}>
            <FaLink /> Editar
          </button>
          <button className="pfd-btn pfd-btn--danger" type="button" onClick={() => onDelete?.(process?.id!!)}>
            <FaRegTrashAlt /> Excluir
          </button>
        </div>
      </div>

      {/* ===== Card principal (Detalhes) ===== */}
      <div className="pfd-card">
        <div className="pfd-head">
          <div className="pfd-headLeft">
            <div className="pfd-titleRow">
              <h1 className="pfd-title">{process?.title}</h1>

              <span className={`pfd-status pfd-status--${statusCls}`}>
                <span className="pfd-statusDot" />
                {statusLabel}
                {late ? <span className="pfd-lateHint">Atrasado</span> : null}
              </span>

              <span className="pfd-idChip">
                <span className="pfd-idDot" />
                #{process?.id.slice(0, 8)}
              </span>
            </div>

            {process?.description ? <p className="pfd-desc">{process?.description}</p> : null}

            <div className="pfd-metaGrid">
              <MetaItem
                icon={<FaCalendarAlt />}
                label="Prazo"
                value={formatDate(process?.dueDate) || "—"}
                hint={process?.dueDate ? relativeDateHint(process?.dueDate, process?.status) : ""}
                danger={late}
              />
              <MetaItem
                icon={<FaClock />}
                label="Criado em"
                value={formatDate(process?.createMoment) || "—"}
                hint={process?.createMoment ? formatTime(process?.createMoment) : ""}
              />
              <MetaItem
                icon={<FaUserTie />}
                label="Responsável"
                value={"Eduardo"}
                hint={"dudu@gmail.com"}
              />
            </div>
          </div>

          {/* ===== Card cliente ===== */}
          <div className="pfd-clientCard">
            <div className="pfd-clientTop">
              <div className="pfd-avatar" aria-hidden="true">
                {initialsClient}
              </div>
              <div className="pfd-clientText">
                <div className="pfd-clientName">{process?.client.name}</div>
                <div className="pfd-clientSub">
                  <span>{process?.client.email}</span>
                  <span className="pfd-sep">•</span>
                  <span className="pfd-mono">{process?.client.document}</span>
                </div>
              </div>
            </div>

            <div className="pfd-clientInfo">
              <div className="pfd-kv">
                <span className="pfd-k">Telefone</span>
                <span className="pfd-v">{process?.client.phone || "—"}</span>
              </div>
              <div className="pfd-kv">
                <span className="pfd-k">Responsável</span>
                <span className="pfd-v">
                  <span className="pfd-miniAvatar" aria-hidden="true">
                    {"E"}
                  </span>
                  {"Eduardo"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Tabs / Conteúdo abaixo ===== */}
        <div className="pfd-tabs">
          <TabButton active={tab === "tasks"} onClick={() => setTab("tasks")} icon={<FaTasks />} label="Tarefas" />
          <TabButton active={tab === "images"} onClick={() => setTab("images")} icon={<FaImage />} label="Imagens" />
          <TabButton
            active={tab === "comments"}
            onClick={() => setTab("comments")}
            icon={<FaCommentDots />}
            label="Comentários"
          />
        </div>

        <div className="pfd-tabContent">
          {tab === "images" ? (
            <div className="pfd-grid2">
              <div className="pfd-panel">
                <div className="pfd-panelHead">
                  <div className="pfd-panelTitle">Adicionar imagem</div>
                  <label className="pfd-btn pfd-btn--primary pfd-fileBtn">
                    <FaPlus /> Selecionar
                    <input type="file" accept="image/*" onChange={handlePickFile} hidden />
                  </label>
                </div>
                <div className="pfd-panelBody">
                  <div className="pfd-uploadHint">
                    Dica: use imagens do andamento do process?o (documentos, fotos, comprovantes).
                  </div>
                </div>
              </div>

              <div className="pfd-panel">
                <div className="pfd-panelHead">
                  <div className="pfd-panelTitle">Galeria</div>
                  <div className="pfd-panelSub">{(images?.length ?? 0).toString()} item(ns)</div>
                </div>

                <div className="pfd-panelBody">
                  {!images?.length ? (
                    <EmptyState
                      icon={<FaImage />}
                      title="Nenhuma imagem por aqui"
                      subtitle="Quando você adicionar, elas aparecem nesta galeria."
                    />
                  ) : (
                    <div className="pfd-gallery">
                      {images.map((img) => (
                        <div className="pfd-imgCard" key={img.id}>
                          <div className="pfd-imgWrap">
                            <img className="pfd-img" src={img.url} alt={img.name || "Imagem do process?o"} />
                          </div>
                          <div className="pfd-imgMeta">
                            <div className="pfd-imgName">{img.name || "Imagem"}</div>
                            <div className="pfd-imgSub">
                              {img.uploadedAt ? formatDate(img.uploadedAt) : "—"}
                            </div>
                          </div>
                          <a className="pfd-iconLink" href={img.url} target="_blank" rel="noreferrer" title="Abrir/baixar">
                            <FaDownload />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {tab === "comments" ? (
            <div className="pfd-grid2">
              <div className="pfd-panel">
                <div className="pfd-panelHead">
                  <div className="pfd-panelTitle">Novo comentário</div>
                  <button className="pfd-btn pfd-btn--primary" type="button" onClick={submitComment}>
                    <FaPlus /> Publicar
                  </button>
                </div>

                <div className="pfd-panelBody">
                  <textarea
                    className="pfd-textarea"
                    placeholder="Escreva um comentário para registrar atualizações, pendências ou observações..."
                    value={commentDraft}
                    onChange={(e) => setCommentDraft(e.target.value)}
                    rows={6}
                  />
                  <div className="pfd-helper">
                    Use comentários para criar um histórico claro do que foi feito e do que falta.
                  </div>
                </div>
              </div>

              <div className="pfd-panel">
                <div className="pfd-panelHead">
                  <div className="pfd-panelTitle">Linha do tempo</div>
                  <div className="pfd-panelSub">{(process?.comments?.length ?? 0).toString()} registro(s)</div>
                </div>

                <div className="pfd-panelBody">
                  {!process?.comments?.length ? (
                    <EmptyState
                      icon={<FaCommentDots />}
                      title="Sem comentários ainda"
                      subtitle="Quando você publicar, eles aparecem em ordem."
                    />
                  ) : (
                    <div className="pfd-timeline">
                      {process?.comments.map((c) => (
                        <div className="pfd-comment" key={c.id}>
                          <div className="pfd-commentHead">
                            <div className="pfd-commentAuthor">Eduardo</div>
                            <div className="pfd-commentDate">
                              {formatDate(c.createMoment)} • {formatTime(c.createMoment)}
                            </div>

                            {onDeleteComment ? (
                              <button
                                className="pfd-miniDanger"
                                type="button"
                                title="Excluir comentário"
                                onClick={() => onDeleteComment(c.id)}
                              >
                                <FaRegTrashAlt />
                              </button>
                            ) : null}
                          </div>
                          <div className="pfd-commentBody">{c.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {tab === "tasks" ? (
            <div className="pfd-grid2">
              <TaskForm processId={processId!!} />
              <TasksCheckList processId={processId!!} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** ===== Subcomponentes ===== */
function MetaItem({
  icon,
  label,
  value,
  hint,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  danger?: boolean;
}) {
  return (
    <div className={`pfd-metaItem ${danger ? "is-danger" : ""}`}>
      <div className="pfd-metaIcon" aria-hidden="true">
        {icon}
      </div>
      <div className="pfd-metaText">
        <div className="pfd-metaLabel">{label}</div>
        <div className="pfd-metaValue">{value}</div>
        {hint ? <div className="pfd-metaHint">{hint}</div> : null}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className={`pfd-tab ${active ? "is-active" : ""}`} type="button" onClick={onClick}>
      <span className="pfd-tabIcon" aria-hidden="true">
        {icon}
      </span>
      {label}
    </button>
  );
}

/** ===== Helpers ===== */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const value = parts.map((p) => p[0]?.toUpperCase()).join("");
  return value || "PF";
}

function formatDate(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR");
}

function formatTime(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
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

function statusClass(s: ProcessStatus, late: boolean): "waiting" | "progress" | "cancelled" | "done" | "late" {
  if (late) return "late";
  const map: Record<ProcessStatus, "waiting" | "progress" | "cancelled" | "done"> = {
    [ProcessStatus.EM_ESPERA]: "waiting",
    [ProcessStatus.EM_ANDAMENTO]: "progress",
    [ProcessStatus.CANCELADO]: "cancelled",
    [ProcessStatus.CONCLUIDO]: "done",
  };
  return map[s];
}

function isLate(dueDate?: string, status?: ProcessStatus): boolean {
  if (!dueDate) return false;
  if (status === ProcessStatus.CONCLUIDO || status === ProcessStatus.CANCELADO) return false;
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}

function relativeDateHint(dueDate: string, status: ProcessStatus): string {
  if (status === ProcessStatus.CONCLUIDO || status === ProcessStatus.CANCELADO) return "";
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "vence hoje";
  if (diff === 1) return "vence amanhã";
  if (diff === -1) return "venceu ontem";
  return diff > 0 ? `faltam ${diff} dias` : `atrasado ${Math.abs(diff)} dia(s)`;
}


