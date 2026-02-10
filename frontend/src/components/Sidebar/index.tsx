import './styles.css';
import {
    FaHome,
    FaTasks,
    FaUsers,
    FaBell,
    FaFolderOpen,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export default function SideBar() {
    return (
        <aside className="side-bar-navegation">
            <div className="side-bar-header-logo">
                <h2>ProcessFlow</h2>
            </div>
            <div className="side-bar-navegation-list">

                <div className="side-bar-option-navegation">
                    <NavLink to="/home" className={({ isActive }) =>
                        isActive ? "side-bar-option-navegation-active" : ""
                    }>
                        <FaHome />
                        <p className="side-bar-label">Visão Geral</p>
                    </NavLink>
                </div>

                   <div className="side-bar-option-navegation">
                    <NavLink to="/processes" className={({ isActive }) =>
                        isActive ? "side-bar-option-navegation-active" : ""
                    }>
                        <FaFolderOpen />
                        <p className="side-bar-label">Processos</p>
                    </NavLink>
                </div>

                <div className="side-bar-option-navegation">
                    <NavLink to="/search" className={({ isActive }) =>
                        isActive ? "side-bar-option-navegation-active" : ""
                    }>
                        <FaTasks />
                        <p className="side-bar-label">Tarefas</p>
                    </NavLink>
                </div>


                <div className="side-bar-option-navegation">
                    <NavLink to="/clients" className={({ isActive }) =>
                        isActive ? "side-bar-option-navegation-active" : ""
                    }>
                        <FaUsers />
                        <p className="side-bar-label">Clientes</p>
                    </NavLink>
                </div>

                <div className="side-bar-option-navegation">
                    <NavLink to="/search" className={({ isActive }) =>
                        isActive ? "side-bar-option-navegation-active" : ""
                    }>
                        <FaBell />
                        <p className="side-bar-label">Sobre nós</p>
                    </NavLink>
                </div>
            </div>
        </aside>
    );
}