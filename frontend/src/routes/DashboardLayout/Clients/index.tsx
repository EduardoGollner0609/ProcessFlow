import { FaPlus, FaSearch } from 'react-icons/fa'
import ClientsTable from '../../../components/ClientsTable'
import { useState } from 'react'
import useClients from '../../../hooks/clients/use-clients'
import UseDeleteClient from '../../../hooks/clients/use-delete-client'
import ClientFormDialog from '../../../components/ClientFormDialog'
import { ClientMinDTO } from '../../../models/client'
import DeleteDialog from '../../../components/DeleteDialog'

export default function ClientsList() {

    const [clientDialogOpen, setClientDialogOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<ClientMinDTO | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);


    const [queryParams, setQueryParams] = useState<{ page: number, name: string }>({
        page: 0,
        name: "",
    });

    const { data: clientsPaged, isLoading, isError } = useClients(queryParams.page, queryParams.name);

    const useDeleteClient = UseDeleteClient();


    function handleSearch(searchText: string) {
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    function openCreate() {
        setEditingClient(null);
        setClientDialogOpen(true);
    }

    function openEdit(client: ClientMinDTO) {
        setEditingClient(client);
        setClientDialogOpen(true);
    }

    async function handleDelete() {
        if (!deleteId) return;
        await useDeleteClient.mutateAsync(deleteId);
        setDeleteId(null);
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
                        onClick={() => openCreate()}
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
                openEdit={openEdit}
                openDelete={setDeleteId}
            />

            {clientDialogOpen && (
                <ClientFormDialog
                    open={clientDialogOpen}
                    onClose={() => setClientDialogOpen(false)}
                    client={editingClient}
                />
            )}
            {
                deleteId &&
                <DeleteDialog
                    open={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    title="Confirmar exclusão"
                    description='Tem certeza que deseja excluir este usuário? Essa ação não poderá ser desfeita.'
                    onConfirm={handleDelete}
                    loading={useDeleteClient.isPending}
                />
            }

        </section>
    )
}