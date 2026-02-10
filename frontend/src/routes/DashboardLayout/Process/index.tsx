import ProcessCard from "../../../components/ProcessCard";
import "./styles.css";

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

export default function ProcessList() {

    const processes: Process[] = [
        {
            id: "1",
            title: "Abertura de Empresa",
            description: "Processo de abertura para cliente João Silva.",
            status: "OPEN",
            createMoment: "2026-02-01T10:00:00Z",
            dueDate: "2026-02-20T00:00:00Z",
            responsibleUser: { name: "Eduardo" },
            client: { name: "João Silva" },
        },
        {
            id: "2",
            title: "Regularização Fiscal",
            description: "Ajuste de pendências fiscais.",
            status: "IN_PROGRESS",
            createMoment: "2026-02-03T09:30:00Z",
            dueDate: "2026-02-25T00:00:00Z",
            responsibleUser: { name: "Ana Paula" },
            client: { name: "Empresa XPTO" },
        },
    ];

    return (
        <div className="dashboard-processes">
            <div className="processes-header">
                <div>
                    <h1>Processos</h1>
                    <p className="subtitle">Acompanhe e gerencie seus processos.</p>
                </div>

                <button className="btn-primary">+ Novo Processo</button>
            </div>

            <div className="processes-cards">
                {processes.length === 0 ? (
                    <p className="processes-empty">Nenhum processo cadastrado.</p>
                ) : (
                    processes.map(process => (
                        <ProcessCard process={process}/>
                    ))
                )}
            </div>
        </div>
    );
}

