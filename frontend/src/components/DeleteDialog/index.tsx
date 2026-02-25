import "./styles.css";

type Props = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    onConfirm: () => void;
    loading?: boolean;
};

export default function DeleteDialog({
    open,
    onClose,
    title,
    description,
    onConfirm,
    loading = false,
}: Props) {

    if (!open) return null;

    return (
        <div className="pf-dialog-overlay">
            <div className="pf-dialog">
                <h2 className="pf-dialog-title">{title}</h2>

                <p className="pf-dialog-description">
                    {description}
                </p>

                <div className="pf-dialog-actions">
                    <button
                        className="pf-btn pf-btn-secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        className="pf-btn pf-btn-danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            </div>
        </div>
    );
}