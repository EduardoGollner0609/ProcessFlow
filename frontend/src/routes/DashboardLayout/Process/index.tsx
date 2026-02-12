import "./styles.css";
import { FaSearch, FaFilter, FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

type ProcessStatus = "open" | "progress" | "waiting" | "done" | "late";
type ProcessPriority = "low" | "medium" | "high" | "urgent";

export interface ClientMinDTO {
    name: string;
    email: string;
    document: string;
    phone?: string;
}

export interface ProcessRowDTO {
    id: string;
    code?: string;
    title: string;
    description?: string;
    status: ProcessStatus;
    priority?: ProcessPriority;
    nextDue?: string; // ISO date
    nextDueHint?: string; // ex: "em 6 dias"
    createdAt: string; // ISO date
    client: ClientMinDTO;
}

interface ProcessesTableProps {
    onView?: (processId: string) => void;
    onEdit?: (processId: string) => void;
    onDelete?: (processId: string) => void;
    onCreate?: () => void;
    onFilters?: () => void;
}

export default function ProcessesTable({
    onView,
    onEdit,
    onDelete,
    onCreate,
    onFilters,
}: ProcessesTableProps) {

    const processes: ProcessRowDTO[] = [
        {
            id: "1",
            code: "PF-1023",
            title: "Abertura de Empresa",
            description: "Organização de documentos, análise e protocolo na junta comercial.",
            status: "progress",
            priority: "high",
            nextDue: "2026-02-18",
            nextDueHint: "em 6 dias",
            createdAt: "2026-01-30",
            client: {
                name: "Alves & Souza",
                email: "contato@alvessouza.com",
                document: "12.345.678/0001-90",
                phone: "(27) 99999-9999",
            },
        },
        {
            id: "2",
            code: "PF-1024",
            title: "Transferência de Veículo",
            description: "Envio de ATPV e regularização junto ao DETRAN.",
            status: "waiting",
            priority: "medium",
            nextDue: "2026-01-13",
            nextDueHint: "amanhã",
            createdAt: "2026-01-29",
            client: {
                name: "Faria & Eresa",
                email: "faria@empresa.com",
                document: "23.456.789/0001-10",
                phone: "(27) 98888-8888",
            },
        },
        {
            id: "3",
            code: "PF-1025",
            title: "Registro de Marca",
            description: "Protocolo e acompanhamento do pedido no INPI.",
            status: "open",
            priority: "low",
            nextDue: "2026-02-23",
            nextDueHint: "em 7 dias",
            createdAt: "2026-01-23",
            client: {
                name: "Beila Todas",
                email: "contato@beila.com",
                document: "34.567.890/0001-22",
                phone: "(27) 97777-7777",
            },
        },
        {
            id: "4",
            code: "PF-1026",
            title: "Regularização Fiscal",
            description: "Ajuste de pendências fiscais junto à Receita Federal.",
            status: "late",
            priority: "urgent",
            nextDue: "2026-01-10",
            nextDueHint: "há 5 dias",
            createdAt: "2026-01-25",
            client: {
                name: "João A. Insouta",
                email: "joao@empresa.com",
                document: "456.789.123-99",
                phone: "(27) 96666-6666",
            },
        },
        {
            id: "5",
            code: "PF-1027",
            title: "Gestão de Contabilidade",
            description: "Organização de documentos contábeis e envio mensal.",
            status: "done",
            priority: "medium",
            nextDue: "2026-01-02",
            nextDueHint: "concluído",
            createdAt: "2026-01-28",
            client: {
                name: "Maria Ceié",
                email: "maria@contabilidade.com",
                document: "123.456.789-00",
                phone: "(27) 95555-5555",
            },
        },
    ];

    return (
        <section className="pfp-wrap">
            <header className="pfp-head">
                <div className="pfp-head__left">
                    <h2 className="pfp-title">Processos</h2>
                    <p className="pfp-subtitle">Acompanhe prazos, status e responsáveis em um só lugar.</p>
                </div>

                <div className="pfp-head__right">
                    <div className="pfp-search">
                        <FaSearch className="pfp-search__icon" />
                        <input placeholder="Buscar por título, cliente ou documento..." />
                    </div>

                    <button className="pfp-btn pfp-btn--ghost" type="button" onClick={onFilters}>
                        <FaFilter /> Filtros
                    </button>

                    <button className="pfp-btn pfp-btn--primary" type="button" onClick={onCreate}>
                        <FaPlus /> Novo processo
                    </button>
                </div>
            </header>

            <div className="pfp-card">
                <div className="pfp-tableWrap">
                    <table className="pfp-table">
                        <thead>
                            <tr>
                                <th>Processo</th>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Próximo prazo</th>
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
                                    <tr key={p.id}>
                                        <td>
                                            <div className="pfp-proc">
                                                <div className="pfp-proc__top">
                                                    <span className="pfp-proc__title">{p.title}</span>

                                                    {p.priority && (
                                                        <span className={`pfp-chip pfp-chip--${p.priority}`}>
                                                            {labelPriority(p.priority)}
                                                        </span>
                                                    )}
                                                </div>

                                                {p.description ? <div className="pfp-proc__desc">{p.description}</div> : null}

                                                <div className="pfp-proc__meta">
                                                    <span className="pfp-metaItem">
                                                        <span className="pfp-metaDot" />
                                                        #{p.code ?? p.id.slice(0, 8)}
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
                                            <span className={`pfp-status pfp-status--${p.status}`}>
                                                <span className="pfp-statusDot" />
                                                {labelStatus(p.status)}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="pfp-date">
                                                <span className="pfp-date__main">{formatDate(p.nextDue)}</span>
                                                {p.nextDueHint ? <span className="pfp-date__hint">{p.nextDueHint}</span> : null}
                                            </div>
                                        </td>

                                        <td className="pfp-muted">{formatDate(p.createdAt)}</td>

                                        <td>
                                            <div className="pfp-actions">
                                                <button
                                                    className="pfp-iconBtn"
                                                    type="button"
                                                    title="Visualizar"
                                                    onClick={() => onView?.(p.id)}
                                                >
                                                    <FaEye />
                                                </button>

                                                <button
                                                    className="pfp-iconBtn"
                                                    type="button"
                                                    title="Editar"
                                                    onClick={() => onEdit?.(p.id)}
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    className="pfp-iconBtn pfp-iconBtn--danger"
                                                    type="button"
                                                    title="Excluir"
                                                    onClick={() => onDelete?.(p.id)}
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
                </div>

                <footer className="pfp-footer">
                    <span className="pfp-footer__info">Mostrando 1–10 de 42</span>
                    <div className="pfp-pagination">
                        <button className="pfp-pageBtn" type="button">‹</button>
                        <button className="pfp-pageBtn is-active" type="button">1</button>
                        <button className="pfp-pageBtn" type="button">2</button>
                        <button className="pfp-pageBtn" type="button">3</button>
                        <button className="pfp-pageBtn" type="button">›</button>
                    </div>
                </footer>
            </div>
        </section>
    );
}

/* helpers (tipados) */
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

function labelPriority(p: ProcessPriority): string {
    const map: Record<ProcessPriority, string> = {
        low: "Baixa",
        medium: "Média",
        high: "Alta",
        urgent: "Urgente",
    };
    return map[p];
}

function labelStatus(s: ProcessStatus): string {
    const map: Record<ProcessStatus, string> = {
        open: "Aberto",
        progress: "Em andamento",
        waiting: "Aguardando",
        done: "Concluído",
        late: "Atrasado",
    };
    return map[s];
}
