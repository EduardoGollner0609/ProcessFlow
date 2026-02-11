import { FaPlus, FaSearch } from 'react-icons/fa'
import ClientsTable from '../../../components/ClientsTable'
import './styles.css'
import { useState } from 'react'
import NewClientDialog from '../../../components/NewClientDialog'
import useClients from '../../../hooks/use-clients'

interface QueryParams {
    page: number;
    name: string;
};

export default function ClientsList() {

    const [newClientDialog, setNewClientDialog] = useState<boolean>(false)

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: "",
    });

    const { data, isLoading, isError } = useClients(queryParams.page, queryParams.name);

    function handleSearch(searchText: string) {
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }

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
                <button className="btn-primary" onClick={() => setNewClientDialog(true)}>
                    <FaPlus /> Novo Cliente
                </button>
            </div>
            {data && <ClientsTable
                clients={data?.content}
                pageNumber={queryParams.page}
                lastPage={data?.last}
                firstPage={queryParams.page === 0}
                nextPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page + 1 })}
                prevPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page - 1 })}
            />}
            {
                newClientDialog && <NewClientDialog open={newClientDialog} onClose={() => { setNewClientDialog(false) }} />
            }
        </div>
    )
}