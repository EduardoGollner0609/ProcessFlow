import "./styles.css";

export default function AboutUs() {
  return (
    <div className="pf-about">
      {/* HERO */}
      <header className="pf-hero">
        <div className="pf-hero__bg">
          <div className="pf-hero__waves" aria-hidden="true" />
          <div className="pf-hero__dots" aria-hidden="true" />
        </div>

        <div className="pf-container pf-hero__content">
          <div className="pf-hero__left">
            <h1 className="pf-hero__title">Sobre Nós</h1>
            <p className="pf-hero__subtitle">
              Conheça a história por trás do ProcessFlow e nossa missão de ajudar pequenas e
              médias empresas a organizarem seus processos de forma eficiente.
            </p>

            <button className="pf-btn pf-btn--primary" type="button">
              Fale Conosco
            </button>
          </div>

          <div className="pf-hero__right">
            <div className="pf-hero__illustration" role="img" aria-label="Ilustração de equipe e painel de indicadores">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="pf-container pf-main">
        {/* Nossa História */}
        <section className="pf-card pf-history">
          <div className="pf-history__text">
            <h2 className="pf-section-title">Nossa História</h2>
            <p className="pf-paragraph">
              Fundada para resolver o caos da rotina operacional, o ProcessFlow nasceu da necessidade
              real de organizar prazos, documentos e tarefas em um só lugar — com rastreabilidade e
              segurança.
            </p>

            <ul className="pf-checklist">
              <li>Mais organização e controle</li>
              <li>Menos perda de prazos e documentos</li>
              <li>Empresas mais produtivas e seguras</li>
            </ul>
          </div>

          <div className="pf-history__media" aria-hidden="true">
            <CardIllustration />
          </div>
        </section>

        {/* Grid: Missão / Valores */}
        <section className="pf-grid">
          <article className="pf-card pf-mini">
            <div className="pf-mini__head">
              <span className="pf-icon pf-icon--target" aria-hidden="true">
                <TargetIcon />
              </span>
              <h3 className="pf-mini__title">Nossa Missão</h3>
            </div>

            <p className="pf-paragraph">
              Simplificar a gestão operacional para que pequenas e médias empresas se mantenham
              organizadas e eficientes.
            </p>

            <ul className="pf-checklist pf-checklist--compact">
              <li>Centralizando informações</li>
              <li>Automatizando tarefas repetitivas</li>
              <li>Garantindo segurança dos dados</li>
            </ul>
          </article>

          <article className="pf-card pf-mini">
            <div className="pf-mini__head">
              <h3 className="pf-mini__title">Nossos Valores</h3>
            </div>

            <p className="pf-paragraph">
              Priorizamos relações transparentes e um produto que realmente facilite o dia a dia.
            </p>

            <ul className="pf-checklist pf-checklist--compact">
              <li>Transparência</li>
              <li>Compromisso com o cliente</li>
              <li>Inovação</li>
              <li>Excelência</li>
            </ul>
          </article>
        </section>

        {/* CTA icons row */}
        <section className="pf-card pf-cta">
          <h3 className="pf-cta__title">Pronto para organizar seus processos?</h3>
          <p className="pf-cta__subtitle">
            Experimente o ProcessFlow e veja como podemos ajudar sua empresa a ser mais eficiente.
          </p>

          <div className="pf-cta__icons">
            <div className="pf-ctaIcon">
              <span className="pf-ctaIcon__badge" aria-hidden="true"><ShieldIcon /></span>
              <span className="pf-ctaIcon__label">Transparência</span>
            </div>

            <div className="pf-ctaIcon">
              <span className="pf-ctaIcon__badge" aria-hidden="true"><ChecklistIcon /></span>
              <span className="pf-ctaIcon__label">Compromisso</span>
            </div>

            <div className="pf-ctaIcon">
              <span className="pf-ctaIcon__badge" aria-hidden="true"><BulbIcon /></span>
              <span className="pf-ctaIcon__label">Inovação</span>
            </div>

            <div className="pf-ctaIcon">
              <span className="pf-ctaIcon__badge" aria-hidden="true"><StarIcon /></span>
              <span className="pf-ctaIcon__label">Excelência</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER CTA BAND */}
      <section className="pf-footerCta">
        <div className="pf-footerCta__bg" aria-hidden="true" />
        <div className="pf-container pf-footerCta__content">
          <h3 className="pf-footerCta__title">
            Pronto para organizar seus <span>processos</span>?
          </h3>
          <p className="pf-footerCta__subtitle">
            Experimente o ProcessFlow e veja como podemos ajudar sua empresa a ser mais eficiente.
          </p>

          <button className="pf-btn pf-btn--gold" type="button">
            Fale com a nossa equipe <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* =============== Inline SVGs (sem dependências externas) =============== */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 860 420" className="pf-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pfSoft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF2FF" />
          <stop offset="1" stopColor="#CFE0FF" />
        </linearGradient>
        <linearGradient id="pfPanel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0B3C91" />
          <stop offset="1" stopColor="#1E66D0" />
        </linearGradient>
      </defs>

      {/* panel */}
      <rect x="280" y="60" rx="18" ry="18" width="520" height="260" fill="url(#pfSoft)" />
      <rect x="310" y="90" rx="14" ry="14" width="460" height="52" fill="#FFFFFF" opacity="0.9" />
      <rect x="340" y="200" rx="10" ry="10" width="280" height="16" fill="#B8CDF6" />
      <rect x="340" y="232" rx="10" ry="10" width="340" height="16" fill="#B8CDF6" opacity="0.85" />
      <rect x="340" y="264" rx="10" ry="10" width="240" height="16" fill="#B8CDF6" opacity="0.7" />

      {/* chart bars */}
      <rect x="640" y="170" width="18" height="80" rx="6" fill="#0B3C91" />
      <rect x="665" y="150" width="18" height="100" rx="6" fill="#1E66D0" />
      <rect x="690" y="190" width="18" height="60" rx="6" fill="#2F80ED" />
      <rect x="715" y="130" width="18" height="120" rx="6" fill="#0B3C91" opacity="0.85" />

      {/* small chips */}
      <rect x="330" y="104" rx="10" width="68" height="24" fill="url(#pfPanel)" opacity="0.95" />
      <rect x="406" y="104" rx="10" width="56" height="24" fill="#2F80ED" opacity="0.9" />
      <rect x="468" y="104" rx="10" width="88" height="24" fill="#0B3C91" opacity="0.65" />

      {/* people simplified */}
      <g>
        <circle cx="130" cy="120" r="38" fill="#FFD6C9" />
        <rect x="88" y="158" width="84" height="120" rx="18" fill="#0B3C91" />
        <rect x="105" y="178" width="50" height="10" rx="5" fill="#FFFFFF" opacity="0.9" />
      </g>

      <g>
        <circle cx="250" cy="160" r="32" fill="#FFD6C9" />
        <rect x="215" y="192" width="70" height="110" rx="16" fill="#1E66D0" />
      </g>

      <g>
        <circle cx="720" cy="130" r="32" fill="#FFD6C9" />
        <rect x="686" y="162" width="68" height="120" rx="16" fill="#0B3C91" opacity="0.9" />
      </g>

      <g>
        <circle cx="810" cy="170" r="30" fill="#FFD6C9" />
        <rect x="782" y="200" width="56" height="100" rx="14" fill="#1E66D0" opacity="0.9" />
      </g>

      {/* floating icons */}
      <g opacity="0.9">
        <rect x="370" y="20" width="74" height="48" rx="14" fill="#FFFFFF" />
        <path d="M390 45h34" stroke="#0B3C91" strokeWidth="6" strokeLinecap="round" />
        <path d="M390 58h22" stroke="#2F80ED" strokeWidth="6" strokeLinecap="round" />
      </g>

      <g opacity="0.9">
        <rect x="520" y="10" width="88" height="58" rx="16" fill="#FFFFFF" />
        <path d="M545 48c10-12 32-12 42 0" stroke="#0B3C91" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M552 40c7-8 22-8 29 0" stroke="#2F80ED" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="566" cy="54" r="6" fill="#0B3C91" />
      </g>
    </svg>
  );
}

function CardIllustration() {
  return (
    <svg viewBox="0 0 520 320" className="pf-svg pf-svg--card" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pfCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF2FF" />
          <stop offset="1" stopColor="#D7E7FF" />
        </linearGradient>
      </defs>

      <rect x="20" y="20" width="480" height="280" rx="22" fill="url(#pfCard)" />
      <rect x="60" y="60" width="240" height="18" rx="9" fill="#B8CDF6" />
      <rect x="60" y="90" width="320" height="14" rx="7" fill="#B8CDF6" opacity="0.8" />
      <rect x="60" y="118" width="280" height="14" rx="7" fill="#B8CDF6" opacity="0.7" />

      <rect x="60" y="170" width="160" height="14" rx="7" fill="#0B3C91" opacity="0.9" />
      <rect x="60" y="198" width="220" height="14" rx="7" fill="#2F80ED" opacity="0.85" />
      <rect x="60" y="226" width="140" height="14" rx="7" fill="#0B3C91" opacity="0.7" />

      <circle cx="400" cy="185" r="38" fill="#FFD6C9" />
      <rect x="365" y="220" width="70" height="60" rx="14" fill="#1E66D0" opacity="0.9" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="pf-svgIcon" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#0B3C91" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="#2F80ED" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="#0B3C91" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="pf-svgIcon" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l8 4v6c0 5-3.4 9.6-8 10-4.6-.4-8-5-8-10V6l8-4z"
        fill="none"
        stroke="#0B3C91"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 12l2.2 2.2L16 8.5" fill="none" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="pf-svgIcon" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6h13M8 12h13M8 18h13" stroke="#0B3C91" strokeWidth="2" strokeLinecap="round" />
      <path d="M3.5 6l1 1 2-2" stroke="#2F80ED" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M3.5 12l1 1 2-2" stroke="#2F80ED" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M3.5 18l1 1 2-2" stroke="#2F80ED" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="pf-svgIcon" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18h6m-5 3h4M8 10a4 4 0 118 0c0 2-1.2 2.9-2.1 3.9-.4.4-.7 1.1-.8 2.1H10.9c-.1-1-.4-1.7-.8-2.1C9.2 12.9 8 12 8 10z"
        fill="none"
        stroke="#0B3C91"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 2v2" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="pf-svgIcon" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2l3 7 7 .6-5.3 4.6 1.7 7.2L12 18.8 5.6 21.4l1.7-7.2L2 9.6 9 9l3-7z"
        fill="none"
        stroke="#0B3C91"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 6.2l1.6 3.6 3.9.3-3 2.6.9 3.9-3.4-2-3.4 2 .9-3.9-3-2.6 3.9-.3L12 6.2z" fill="#2F80ED" opacity="0.25" />
    </svg>
  );
}
