import { FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import ProcessesTable from "../../../components/ProcessesTable";
import useProcess from "../../../hooks/processes/use-processes";
import { useState } from "react";
import { ProcessMinDTO } from "../../../models/process";
import ProcessFormDialog from "../../../components/CreateProcessDialog";
import DeleteDialog from "../../../components/DeleteDialog";
import UseDeleteProcess from "../../../hooks/processes/use-delete-process";

export default function ProcessList() {

    const [showCreateProcessDialog, setShowCreateProcessDialog] = useState<boolean>(false);
    const [editingProcess, setEditingProcess] = useState<ProcessMinDTO | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [queryParams, setQueryParams] = useState<{ page: number, title: string }>({
        page: 0,
        title: "",
    });

    const { data: processesPaged, } = useProcess(queryParams.page, queryParams.title)
    const useDeleteProcess = UseDeleteProcess();

    function handleSearch(searchText: string) {
        setQueryParams({ ...queryParams, page: 0, title: searchText });
    }

    function onFilters() { }

    function openEdit(process: ProcessMinDTO) {
        setEditingProcess(process);
        setShowCreateProcessDialog(true);
    }

    async function handleDelete() {
        if (!deleteId) return;
        await useDeleteProcess.mutateAsync(deleteId);
        setDeleteId(null);
    }

    return (
        <section className="pfp-wrap">
            <header className="pfp-head">
                <div className="pfp-head__left">
                    <h2 className="pfp-title">Processos</h2>
                    <p className="pfp-subtitle">Acompanhe prazos, status e responsáveis em um só lugar.</p>
                </div>

                <div className="pfp-head__right">
                    <div className="pfp-search">
                        <FaSearch className="pfp-search__icon" />
                        <input
                            onChange={e => handleSearch(e.target.value.trim())}
                            type="text"
                            placeholder="Buscar por título, cliente ou documento..." />
                    </div>

                    <button className="pfp-btn pfp-btn--ghost" type="button" onClick={onFilters}>
                        <FaFilter /> Filtros
                    </button>

                    <button className="pfp-btn pfp-btn--primary" type="button" onClick={() => setShowCreateProcessDialog(true)}>
                        <FaPlus /> Novo processo
                    </button>
                </div>
            </header>

            <ProcessesTable
                processes={processesPaged?.content ?? []}
                pageNumber={queryParams.page}
                lastPage={processesPaged?.last ?? true}
                firstPage={queryParams.page === 0}
                nextPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page + 1 })}
                prevPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page - 1 })}
                openEdit={openEdit}
                openDelete={setDeleteId}
            />

            {
                showCreateProcessDialog && <ProcessFormDialog
                    open={showCreateProcessDialog}
                    onOpenChange={setShowCreateProcessDialog}
                    process={editingProcess}
                />
            }
            {
                deleteId &&
                <DeleteDialog
                    open={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    title="Confirmar exclusão"
                    description='Tem certeza que deseja excluir este processo? Essa ação não poderá ser desfeita.'
                    onConfirm={handleDelete}
                    loading={useDeleteProcess.isPending}
                />
            }
        </section >
    );
}
