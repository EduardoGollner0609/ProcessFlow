import { FaPlus, FaSearch } from 'react-icons/fa'
import ClientsTable from '../../../components/ClientsTable'
import './styles.css'
import { useState } from 'react'
import useClients from '../../../hooks/clients/use-clients'
import CreateClientDialog from '../../../components/CreateClientDialog'

export default function ClientsList() {

    const [showCreateClientDialog, setShowCreateClientDialog] = useState<boolean>(false)

    const [queryParams, setQueryParams] = useState<{ page: number, name: string }>({
        page: 0,
        name: "",
    });

    const { data: clientsPaged, isLoading, isError } = useClients(queryParams.page, queryParams.name);

    function handleSearch(searchText: string) {
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    return (
        <section className="pfp-wrap">
            <header className="pfp-head">
                <div className="pfp-head__left">
                    <h2 className="pfp-title">Clientes</h2>
                    <p className="pfp-subtitle">
                        Aqui estão os seus clientes cadastrados.
                    </p>
                </div>

                <div className="pfp-head__right">
                    <div className="pfp-search">
                        <FaSearch className="pfp-search__icon" />
                        <input
                            onChange={e => handleSearch(e.target.value.trim())}
                            type="text"
                            placeholder="Buscar pelo nome..."
                        />
                    </div>

                    <button
                        className="pfp-btn pfp-btn--primary"
                        onClick={() => setShowCreateClientDialog(true)}
                    >
                        <FaPlus /> Novo Cliente
                    </button>
                </div>
            </header>

            <ClientsTable
                clients={clientsPaged?.content ?? []}
                pageNumber={queryParams.page}
                lastPage={clientsPaged?.last ?? true}
                firstPage={queryParams.page === 0}
                nextPageFunction={() =>
                    setQueryParams({ ...queryParams, page: queryParams.page + 1 })
                }
                prevPageFunction={() =>
                    setQueryParams({ ...queryParams, page: queryParams.page - 1 })
                }
            />

            {showCreateClientDialog && (
                <CreateClientDialog
                    open={showCreateClientDialog}
                    onClose={() => setShowCreateClientDialog(false)}
                />
            )}
        </section>
    )
}