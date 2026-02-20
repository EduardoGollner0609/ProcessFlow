import RegisterForm from "../../../components/RegisterForm";


export default function RegisterPage() {
    return (
        <main className="pf-login">
            <div className="pf-login__bg" aria-hidden="true" />

            <div className="pf-login__wrap">
                <section className="pf-login__card" aria-label="Cadastro ProcessFlow">
                    {/* LEFT / FORM */}
                    <div className="pf-login__left">
                        <header className="pf-login__brand">
                            <div className="pf-login__logo" aria-hidden="true">
                                <span>P</span>
                            </div>

                            <div>
                                <h1 className="pf-login__title">ProcessFlow</h1>
                                <p className="pf-login__subtitle">
                                    Crie sua conta para organizar processos com eficiência.
                                </p>
                            </div>
                        </header>

                        <RegisterForm />
                    </div>

                    {/* RIGHT / PANEL */}
                    <aside className="pf-login__right" aria-label="Resumo do sistema">
                        <div className="pf-login__rightInner">
                            <div className="pf-badge">Comece agora</div>

                            <h2 className="pf-rightTitle">Seu fluxo, do seu jeito.</h2>

                            <p className="pf-rightText">
                                Em poucos passos você cria a conta e já começa a gerenciar
                                processos, prazos e responsáveis.
                            </p>

                            <div className="pf-stats">
                                <div className="pf-stat">
                                    <span className="pf-statNum">Rápido</span>
                                    <span className="pf-statLabel">Cadastro em segundos</span>
                                </div>

                                <div className="pf-stat">
                                    <span className="pf-statNum">Seguro</span>
                                    <span className="pf-statLabel">Acesso com autenticação</span>
                                </div>

                                <div className="pf-stat">
                                    <span className="pf-statNum">Escalável</span>
                                    <span className="pf-statLabel">Cresce com seu time</span>
                                </div>
                            </div>

                            <div className="pf-quote">
                                <p>
                                    “Uma conta, um painel, tudo sob controle.”
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
