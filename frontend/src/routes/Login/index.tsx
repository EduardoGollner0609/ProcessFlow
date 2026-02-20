import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="pf-login">
      <div className="pf-login__bg" aria-hidden="true" />

      <div className="pf-login__wrap">
        <section className="pf-login__card" aria-label="Login ProcessFlow">
          {/* LEFT / FORM */}
          <div className="pf-login__left">
            <header className="pf-login__brand">
              <div className="pf-login__logo" aria-hidden="true">
                <span>P</span>
              </div>

              <div>
                <h1 className="pf-login__title">ProcessFlow</h1>
                <p className="pf-login__subtitle">
                  Entre para gerenciar seus processos com eficiência.
                </p>
              </div>
            </header>
            <LoginForm />
          </div>

          {/* RIGHT / PANEL */}
          <aside className="pf-login__right" aria-label="Resumo do sistema">
            <div className="pf-login__rightInner">
              <div className="pf-badge">Novo</div>

              <h2 className="pf-rightTitle">Fluxo claro. Controle total.</h2>

              <p className="pf-rightText">
                Acompanhe status, prazos e responsáveis em um só lugar. Tudo com
                visual limpo e rápido.
              </p>

              <div className="pf-stats">
                <div className="pf-stat">
                  <span className="pf-statNum">+30%</span>
                  <span className="pf-statLabel">Mais organização</span>
                </div>

                <div className="pf-stat">
                  <span className="pf-statNum">2x</span>
                  <span className="pf-statLabel">Agilidade no dia a dia</span>
                </div>

                <div className="pf-stat">
                  <span className="pf-statNum">∞</span>
                  <span className="pf-statLabel">Clareza no fluxo</span>
                </div>
              </div>

              <div className="pf-quote">
                <p>
                  “Quando o fluxo está claro, o time trabalha leve — e entrega
                  mais.”
                </p>
                <span>ProcessFlow</span>
              </div>
            </div>
          </aside>
        </section>

        <p className="pf-login__meta">
          © {new Date().getFullYear()} ProcessFlow • Segurança e simplicidade
        </p>
      </div>
    </main>
  );
}
