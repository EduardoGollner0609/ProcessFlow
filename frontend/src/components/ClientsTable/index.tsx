import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import './styles.css';
import { ClientMinDTO } from '../../models/client';
import PaginationControl from '../PaginationControl';

interface ClientsTableProps {
    clients: ClientMinDTO[]
    pageNumber: number
    lastPage: boolean
    firstPage: boolean
    nextPageFunction: () => void
    prevPageFunction: () => void
    openEdit: (client: ClientMinDTO) => void,
    openDelete: (id: string) => void
}

export default function ClientsTable({ clients, pageNumber, lastPage, firstPage, nextPageFunction, prevPageFunction, openEdit, openDelete}: ClientsTableProps) {
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
                    {clients?.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="clients-table-empty">
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
                                    <button className="action-btn edit" onClick={() => openEdit(client)}><FaEdit /> Editar</button>
                                    <button className="action-btn remove" onClick={() => openDelete(client.id)}><FaTrash /> Remover</button>
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
    )
}
