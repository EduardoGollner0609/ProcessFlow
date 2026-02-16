import { FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import ProcessesTable from "../../../components/ProcessesTable";
import "./styles.css";
import useProcess from "../../../hooks/processes/use-processes";
import { useState } from "react";
import CreateProcessDialog from "../../../components/CreateProcessDialog";
import useClients from "../../../hooks/clients/use-clients";

export default function ProcessList() {

    const [showCreateProcessDialog, setShowCreateProcessDialog] = useState<boolean>(false);
    const [queryParams, setQueryParams] = useState<{ page: number, title: string }>({
        page: 0,
        title: "",
    });

    const { data: clientsPaged, } = useClients(0, "");
    const { data: processesPaged, } = useProcess(queryParams.page, queryParams.title)

    function handleSearch(searchText: string) {
        setQueryParams({ ...queryParams, page: 0, title: searchText });
    }

    function onFilters() { }

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
                prevPageFunction={() => setQueryParams({ ...queryParams, page: queryParams?.page - 1 })} />
            {
                showCreateProcessDialog && <CreateProcessDialog
                    open={showCreateProcessDialog}
                    onOpenChange={setShowCreateProcessDialog}
                    clients={clientsPaged?.content ?? []}
                    users={[]}
                    onSubmit={() => { }}
                />
            }
        </section >
    );
}
