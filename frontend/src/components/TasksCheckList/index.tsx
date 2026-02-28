import { useState } from "react";
import { FaCalendarAlt, FaClock, FaRegTrashAlt, FaTasks } from "react-icons/fa";
import { UseTasks } from "../../hooks/tasks/use-tasks";
import { TaskDTO, TaskRequestDTO } from "../../models/task";
import EmptyState from "../EmptyState";
import UseUpdateTask from "../../hooks/tasks/use-update-task";

interface TasksCheckListProps {
    processId: string;
}

type TaskStatus = "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";

const TASK_STATUS_OPTIONS: {
    value: TaskStatus;
    label: string;
    cls: string;
}[] = [
        { value: "EM_ANDAMENTO", label: "Em andamento", cls: "progress" },
        { value: "CONCLUIDA", label: "Concluída", cls: "done" },
        { value: "CANCELADA", label: "Cancelada", cls: "cancelled" },
    ];

export default function TasksCheckList({ processId }: TasksCheckListProps) {
    const { data: tasks } = UseTasks(processId);
    const taskUpdate = UseUpdateTask();

    const [openStatusTaskId, setOpenStatusTaskId] = useState<string | null>(null);

    function toggleStatusMenu(taskId: string) {
        setOpenStatusTaskId((cur) => (cur === taskId ? null : taskId));
    }

    /** 🔥 AQUI você envia a task atualizada */
    async function changeStatus(task: TaskDTO, status: TaskStatus) {
        const updatedTask: TaskRequestDTO = {
            title: task.title,
            description: task.description,
            status: status,
            dueDate: task.dueDate,
            processId: processId
        };


        await taskUpdate.mutateAsync({ id: task?.id, task: updatedTask })
        console.log("TASK ALTERADA:", updatedTask);
        // updateTaskStatus.mutate(updatedTask)

        setOpenStatusTaskId(null);
    }

    function onDeleteTask(id: string) {
        console.log("delete", id);
    }

    return (
        <div className="pfd-panel">
            <div className="pfd-panelHead">
                <div className="pfd-panelTitle">Checklist</div>
                <div className="pfd-panelSub">{(tasks?.length ?? 0).toString()} item(ns)</div>
            </div>

            <div className="pfd-panelBody">
                {!tasks?.length ? (
                    <EmptyState
                        icon={<FaTasks />}
                        title="Nenhuma tarefa"
                        subtitle="Adicione tarefas e marque conforme concluir."
                    />
                ) : (
                    <div className="pfd-taskList">
                        {tasks.map((t: TaskDTO) => {
                            const statusCls = taskStatusClass(t.status);

                            return (
                                <div className={`pfd-taskCard ${statusCls}`} key={t.id}>
                                    {/* HEADER */}
                                    <div className="pfd-taskHeader">
                                        <div className="pfd-taskTitle">{t.title}</div>

                                        {/* DIREITA DO HEADER: STATUS + LIXEIRA */}
                                        <div className="pfd-taskHeadRight">
                                            {/* STATUS CLICK */}
                                            <div className="pfd-statusWrap">
                                                <button
                                                    className={`pfd-statusChip ${statusCls}`}
                                                    type="button"
                                                    onClick={() => toggleStatusMenu(t.id)}
                                                >
                                                    {taskStatusLabel(t.status)} ▾
                                                </button>

                                                {openStatusTaskId === t.id && (
                                                    <div className="pfd-statusMenu">
                                                        {TASK_STATUS_OPTIONS.map((opt) => (
                                                            <button
                                                                key={opt.value}
                                                                className={`pfd-statusOption ${opt.cls}`}
                                                                type="button"
                                                                onClick={() => changeStatus(t, opt.value)}
                                                            >
                                                                {opt.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* LIXEIRA NO TOPO À DIREITA DO CARD */}
                                            <button
                                                className="pfd-miniDanger pfd-taskTrashTop"
                                                type="button"
                                                title="Excluir tarefa"
                                                onClick={() => onDeleteTask(t.id)}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </div>
                                    </div>

                                    {/* DESCRIÇÃO */}
                                    {t.description && <div className="pfd-taskDescription">{t.description}</div>}

                                    {/* METAS */}
                                    <div className="pfd-taskMeta">
                                        <span>
                                            <FaClock /> Criado em: {formatDate(t.createMoment)} {formatTime(t.createMoment)}
                                        </span>

                                        <span>
                                            <FaCalendarAlt /> Prazo: {t.dueDate ? formatDate(t.dueDate) : "—"}
                                        </span>
                                    </div>

                                    {/* ACTIONS (agora vazio / pode remover se quiser) */}
                                    {/* <div className="pfd-taskActions" /> */}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ================= HELPERS ================= */

function taskStatusClass(status: string) {
    const map: Record<string, string> = {
        EM_ANDAMENTO: "progress",
        CONCLUIDA: "done",
        CANCELADA: "cancelled",
    };

    return map[status] ?? "waiting";
}

function taskStatusLabel(status: string) {
    const map: Record<string, string> = {
        EM_ANDAMENTO: "Em andamento",
        CONCLUIDA: "Concluída",
        CANCELADA: "Cancelada",
    };

    return map[status] ?? status;
}

function formatDate(value?: string): string {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("pt-BR");
}

function formatTime(value?: string): string {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}