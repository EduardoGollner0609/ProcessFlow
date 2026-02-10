import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import './styles.css';

interface ClientsTableProps {
    clients: any[]
}

export default function ClientsTable({ clients }: ClientsTableProps) {
    return (
        <div className="clients-table-container">
            <table className="clients-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Documento</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="clients-table-empty">
                                Nenhum cliente cadastrado ainda.
                            </td>
                        </tr>
                    ) : (
                        clients.map(client => (
                            <tr key={client.id}>
                                <td className="client-name">
                                    <div className="avatar">{client.name.charAt(0)}</div>
                                    {client.name}
                                </td>
                                <td>{client.email}</td>
                                <td>{client.document}</td>
                                <td>{client.phone}</td>
                                <td className="actions">
                                    <button className="action-btn view"><FaEye /> Ver</button>
                                    <button className="action-btn edit"><FaEdit /> Editar</button>
                                    <button className="action-btn remove"><FaTrash /> Remover</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}