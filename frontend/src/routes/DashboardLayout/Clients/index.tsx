import { FaPlus, FaSearch } from 'react-icons/fa'
import ClientsTable from '../../../components/ClientsTable'
import './styles.css'

export default function ClientsList() {

    const clients = [
        { id: 1, name: "Eduardo", email: "eduardo@gmail.com", phone: "27992657127", document: "1991921001" },
        { id: 2, name: "Rayra", email: "rayra@gmail.com", phone: "27992657127", document: "1991921001" }
    ]

    return (
        <div className="dashboard-clients">
            <div className="clients-header">
                <div>
                    <h1>Clientes</h1>
                    <p>Aqui estão os seus clientes cadastrados.</p>
                </div>


            </div>

            <div className="clients-toolbar">
                <div className="clients-toolbar-search">
                    <div className="search-box">
                        <FaSearch />
                        <input type="text" placeholder="Buscar por nome, email ou documento..." />
                    </div>

                    <select className="filter-select">
                        <option value="">Sem filtro</option>
                        <option value="ativos">Ordem Alfábetica</option>
                        <option value="inativos">Ordem de Criação</option>
                    </select>
                </div>
                <button className="btn-primary">
                    <FaPlus /> Novo Cliente
                </button>
            </div>
            <ClientsTable clients={clients} />
        </div>
    )
}