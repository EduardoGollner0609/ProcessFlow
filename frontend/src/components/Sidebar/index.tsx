import {
  FaHome,
  FaTasks,
  FaUsers,
  FaBell,
  FaFolderOpen,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as authService from '../../services/auth-service';

export default function SideBar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // fecha com ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function close() {
    setOpen(false);
  }

  function logOut() {
    authService.removeToken();
    navigate("/login");
  }

  return (
    <>
      {/* TOPBAR MOBILE */}
      <header className="pf-mobileTopbar">
        <button
          className="pf-mobileIconBtn"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <FaBars />
        </button>

        <div className="pf-mobileBrand">
          <div className="pf-logo pf-logo--sm">P</div>
          <strong>ProcessFlow</strong>
        </div>

        <div className="pf-mobileRight" aria-hidden="true" />
      </header>

      {/* OVERLAY MOBILE */}
      <div
        className={open ? "pf-overlay is-open" : "pf-overlay"}
        onClick={close}
        aria-hidden="true"
      />

      {/* SIDEBAR */}
      <aside className={open ? "pf-sidebar is-open" : "pf-sidebar"}>
        {/* Close (mobile) */}
        <button
          className="pf-closeBtn"
          type="button"
          onClick={close}
          aria-label="Fechar menu"
        >
          <FaTimes />
        </button>

        <div className="pf-sidebar__brand">
          <div className="pf-logo">P</div>
          <h2 className="pf-brandText">ProcessFlow</h2>
        </div>

        <nav className="pf-nav" aria-label="Menu">
          <NavLink
            to="/dashboard/home"
            onClick={close}
            className={({ isActive }) =>
              isActive ? "pf-navItem is-active" : "pf-navItem"
            }
          >
            <FaHome />
            <span className="pf-navLabel">Visão Geral</span>
          </NavLink>

          <NavLink
            to="/dashboard/processes"
            onClick={close}
            className={({ isActive }) =>
              isActive ? "pf-navItem is-active" : "pf-navItem"
            }
          >
            <FaFolderOpen />
            <span className="pf-navLabel">Processos</span>
          </NavLink>
          <NavLink
            to="/dashboard/clients"
            onClick={close}
            className={({ isActive }) =>
              isActive ? "pf-navItem is-active" : "pf-navItem"
            }
          >
            <FaUsers />
            <span className="pf-navLabel">Clientes</span>
          </NavLink>

          <NavLink
            to="/about-us"
            onClick={close}
            className={({ isActive }) =>
              isActive ? "pf-navItem is-active" : "pf-navItem"
            }
          >
            <FaBell />
            <span className="pf-navLabel">Sobre nós</span>
          </NavLink>
        </nav>

        {/* USUÁRIO */}
        <div className="pf-sidebar__footer">
          <div className="pf-userBlock">
            <div className="pf-avatar">EG</div>
            <div className="pf-userInfo">
              <strong>Eduardo</strong>
              <span>Administrador</span>
            </div>
          </div>

          <button className="pf-logoutBtn" type="button" onClick={logOut}>
            <FaSignOutAlt />
            <span className="pf-navLabel">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
