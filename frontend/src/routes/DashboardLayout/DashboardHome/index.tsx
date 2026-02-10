import "./styles.css";
import { FaTasks, FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

export default function DashboardHome() {
    return (
        <div className="dashboard-home">
            <h1>Bem-vindo ao ProcessFlow</h1>
            <p className="subtitle">Aqui está o resumo dos seus processos hoje.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <FaTasks className="card-icon" />
                    <div>
                        <h3>Tarefas Totais</h3>
                        <span>124</span>
                    </div>
                </div>

                <div className="dashboard-card">
                    <FaClock className="card-icon warning" />
                    <div>
                        <h3>Em Andamento</h3>
                        <span>38</span>
                    </div>
                </div>

                <div className="dashboard-card">
                    <FaCheckCircle className="card-icon success" />
                    <div>
                        <h3>Concluídas</h3>
                        <span>86</span>
                    </div>
                </div>

                <div className="dashboard-card">
                    <FaUsers className="card-icon info" />
                    <div>
                        <h3>Clientes Ativos</h3>
                        <span>52</span>
                    </div>
                </div>
            </div>


            <div className="dashboard-sections">
                <section className="dashboard-box">
                    <h2>📋 Próximas Tarefas</h2>
                    <ul>
                        <li>Enviar contrato - João Silva</li>
                        <li>Revisar documentação - Maria Oliveira</li>
                        <li>Atualizar processo 4587</li>
                    </ul>
                    <div className="dashboard-box-bottom">
                        <p>{"Ver todas as tarefas >"}</p>
                    </div>
                </section>

                <section className="dashboard-box">
                    <div className="dashboard-box-top">
                        <h2>Clientes</h2>
                        <input type="text" placeholder="Buscar clientes" />
                        <button>+ Novo cliente</button>
                    </div>

                    <ul>
                        <li>Ana Paula - 19999999</li>
                        <li>Carlos Mendes - 110000001</li>
                        <li>Fernanda Rocha - 2020020001</li>
                    </ul>
                    <div className="dashboard-box-bottom">
                        <p>{"Ver todos os clientes >"}</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
