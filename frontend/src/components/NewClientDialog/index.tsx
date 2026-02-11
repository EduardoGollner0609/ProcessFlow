import { FaTimes } from "react-icons/fa";
import "./styles.css";

interface NewClientDialogProps {
    open: boolean,
    onClose: () => void
}
export default function NewClientDialog({ open, onClose }: NewClientDialogProps) {
    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Novo Cliente</h2>
                    <button className="dialog-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form className="dialog-form">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" placeholder="Nome completo" required />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="email@exemplo.com" required />
                    </div>

                    <div className="form-group">
                        <label>Telefone</label>
                        <input type="tel" placeholder="(00) 00000-0000" required />
                    </div>

                    <div className="form-group">
                        <label>Documento</label>
                        <input type="text" placeholder="CPF ou CNPJ" required />
                    </div>

                    <div className="dialog-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary">
                            Salvar Cliente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
