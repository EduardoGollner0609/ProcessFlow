import { FaPlus, FaSearch } from 'react-icons/fa'
import ClientsTable from '../../../components/ClientsTable'
import './styles.css'
import { useState } from 'react'
import NewClientDialog from '../../../components/NewClientDialog'
import useClients from '../../../hooks/use-clients'
import { formatReplaceLetters } from '../../../utils/format'

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

    const { data: clientsPaged, isLoading, isError } = useClients(queryParams.page, queryParams.name);

    function handleSearch(searchText: string) {
        setQueryParams({ ...queryParams, page: 0, name: searchText });
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
                        <input
                            onChange={e => handleSearch(e.target.value.trim())}
                            type="text"
                            placeholder="Buscar pelo nome" />
                    </div>
                </div>
                <button className="btn-primary" onClick={() => setNewClientDialog(true)}>
                    <FaPlus /> Novo Cliente
                </button>
            </div>
            <ClientsTable
                clients={clientsPaged?.content ?? []}
                pageNumber={queryParams.page}
                lastPage={clientsPaged?.last ?? true}
                firstPage={queryParams.page === 0}
                nextPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page + 1 })}
                prevPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page - 1 })}
            />
            {
                newClientDialog && <NewClientDialog open={newClientDialog} onClose={() => { setNewClientDialog(false) }} />
            }
        </div>
    )
}