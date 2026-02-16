import './styles.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationControlProps {
    prevPageFunction: () => void,
    nextPageFunction: () => void,
    firstPage: boolean,
    lastPage: boolean,
    pageNumber: number
}

export default function PaginationControl({ prevPageFunction, nextPageFunction, firstPage, lastPage, pageNumber }: PaginationControlProps) {
    return (
        <div className="pagination-controls">
            <button onClick={prevPageFunction} disabled={firstPage}>
                <FaArrowLeft /> Anterior
            </button>
            <span>Página {pageNumber + 1}</span>
            <button onClick={nextPageFunction} disabled={lastPage}>
                Próxima <FaArrowRight />
            </button>
        </div>
    );
}