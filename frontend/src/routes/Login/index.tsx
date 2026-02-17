import "./styles.css";

export default function Login() {
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

            <form className="pf-login__form" onSubmit={(e) => e.preventDefault()}>
              <div className="pf-field">
                <label className="pf-label" htmlFor="email">
                  E-mail
                </label>

                <div className="pf-inputWrap">
                  <input
                    className="pf-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seuemail@empresa.com"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* erro opcional */}
                {/* <p className="pf-error">E-mail inválido</p> */}
              </div>

              <div className="pf-field">
                <label className="pf-label" htmlFor="password">
                  Senha
                </label>

                <div className="pf-inputWrap">
                  <input
                    className="pf-input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />
                </div>

                {/* erro opcional */}
                {/* <p className="pf-error">Senha inválida</p> */}
              </div>

              <div className="pf-login__row">
                <label className="pf-check">
                  <input type="checkbox" name="remember" defaultChecked />
                  <span>Lembrar de mim</span>
                </label>

                <a className="pf-link" href="#">
                  Esqueci minha senha
                </a>
              </div>

              <button className="pf-btn" type="submit">
                Entrar
              </button>

              <p className="pf-login__foot">
                Não tem conta?{" "}
                <a className="pf-link" href="#">
                  Criar agora
                </a>
              </p>
            </form>
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
