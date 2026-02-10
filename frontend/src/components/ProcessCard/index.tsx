import { FaBuilding, FaClock, FaEdit, FaEye, FaTrash, FaUser } from 'react-icons/fa';
import './styles.css'

interface Process {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE" | "CANCELED";
    createMoment: string;
    dueDate: string;
    responsibleUser: { name: string };
    client: { name: string };
}

export default function ProcessCard({process} : {process: Process}) {
    return (
        <div className="process-card" key={process.id}>
            <div className="process-card-header">
                <h3>{process.title}</h3>
                <span className={`status-badge ${process.status.toLowerCase()}`}>
                    {formatStatus(process.status)}
                </span>
            </div>

            <p className="process-description">{process.description}</p>

            <div className="process-info">
                <div>
                    <FaBuilding />
                    <span>{process.client.name}</span>
                </div>
                <div>
                    <FaUser />
                    <span>{process.responsibleUser?.name || "Não atribuído"}</span>
                </div>
                <div>
                    <FaClock />
                    <span>{formatDate(process.dueDate)}</span>
                </div>
            </div>

            <div className="process-actions">
                <button className="action-btn view"><FaEye /></button>
                <button className="action-btn edit"><FaEdit /></button>
                <button className="action-btn remove"><FaTrash /></button>
            </div>
        </div>
    );
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR");
}

function formatStatus(status: string) {
    const map: Record<string, string> = {
        OPEN: "Aberto",
        IN_PROGRESS: "Em andamento",
        DONE: "Concluído",
        CANCELED: "Cancelado",
    };
    return map[status] || status;
}
