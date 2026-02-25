import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClientMinDTO } from "../../models/client";
import PaginationControl from "../PaginationControl";

/** ===== Componente ===== */
interface ClientsTableProps {
    clients: ClientMinDTO[];
    pageNumber: number;
    lastPage: boolean;
    firstPage: boolean;
    nextPageFunction: () => void;
    prevPageFunction: () => void;
    openEdit?: (client: ClientMinDTO) => void;
    openDelete?: (id: string) => void;
    onView?: (clientId: string) => void; // opcional se quiser controlar fora
}

export default function ClientsTable({
    clients,
    pageNumber,
    lastPage,
    firstPage,
    nextPageFunction,
    prevPageFunction,
    openEdit,
    openDelete,
    onView,
}: ClientsTableProps) {
    const navigate = useNavigate();

    function goToClient(clientId: string) {
        if (onView) return onView(clientId);
        navigate(`/dashboard/clients/${clientId}`); // ajuste sua rota aqui
    }

    return (
        <div className="pfp-card">
            <div className="pfp-tableWrap">
                <table className="pfp-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Contato</th>
                            <th>Documento</th>
                            <th>Telefone</th>
                            <th className="pfp-thActions">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.length === 0 ? (
                            <tr>
                                <td className="pfp-empty" colSpan={5}>
                                    Nenhum cliente cadastrado ainda.
                                </td>
                            </tr>
                        ) : (
                            clients.map((c) => (
                                <tr
                                    key={c.id}
                                    className="processes-link"
                                    onClick={() => goToClient(c.id)}
                                >
                                    <td>
                                        <div className="pfp-client">
                                            <div className="pfp-avatar" aria-hidden="true">
                                                {initials(c.name)}
                                            </div>

                                            <div className="pfp-client__text">
                                                <div className="pfp-client__name">{c.name}</div>
                                                <div className="pfp-client__sub">
                                                    <span className="pfp-mono">#{c.id.slice(0, 8)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="pfp-muted">{c.email}</td>

                                    <td>
                                        <span className="pfp-metaItem">
                                            <span className="pfp-metaDot" />
                                            <span className="pfp-mono">{c.document}</span>
                                        </span>
                                    </td>

                                    <td className="pfp-muted">{c.phone || "—"}</td>

                                    <td>
                                        <div className="pfp-actions">
                                            <button
                                                className="pfp-iconBtn"
                                                type="button"
                                                title="Ver"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    goToClient(c.id);
                                                }}
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="pfp-iconBtn"
                                                type="button"
                                                title="Editar"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEdit?.(c);
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
                                                    openDelete?.(c.id);
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
                    pageNumber={pageNumber}
                />
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