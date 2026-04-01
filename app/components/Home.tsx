export default function Home({
  go,
  className,
}: {
  go: (id: string) => void;
  className: string;
}) {
  return (
    <div className={className} id="pg-home">
      <div className="hero">
        <div className="hero-l">
          <div className="terminal f">
            <div className="term-titlebar">
              <div className="tdot tdot-r"></div>
              <div className="tdot tdot-y"></div>
              <div className="tdot tdot-g"></div>
              <span className="term-title">bash — fp@portfolio</span>
            </div>
            <div className="term-content" id="term-hero"></div>
          </div>

          <p className="etag f">Disponible · Rivesaltes, France</p>
          <p className="h-role f">Technicien Réseau &amp; Cybersécurité</p>
          <p className="h-desc f">
            Passionné d'informatique hardware, réseaux, cybersécurité.
            <br />
            Bac Pro CIEL 2023–2026 · 7 stages professionnels réalisés.
          </p>
          <div className="cta f">
            <button className="btn-p" onClick={() => go("exp")}>
              Mon parcours
            </button>
            <button className="btn-o" onClick={() => go("contact")}>
              Me contacter
            </button>
          </div>
        </div>

        <div className="hero-r">
          <div className="photo-zone f">
            <div className="photo-ring">
              <div className="photo-inner">
                <img
                  id="photo-img"
                  src="/images/Florent-Pennecot.jpeg"
                  alt=""
                  className="show"
                />
                <div
                  className="photo-ph"
                  id="photo-ph"
                  style={{ display: "none" }}
                >
                  <div className="photo-ph-ic">👤</div>
                  <div className="photo-ph-tx">Ajouter photo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-grid f">
            <div className="stat">
              <span className="stat-n">7+</span>
              <span className="stat-l">Stages</span>
            </div>
            <div className="stat">
              <span className="stat-n">76%</span>
              <span className="stat-l">Anglais</span>
            </div>
            <div className="stat">
              <span className="stat-n">3</span>
              <span className="stat-l">Ans form.</span>
            </div>
            <div className="stat">
              <span className="stat-n">2026</span>
              <span className="stat-l">Diplôme</span>
            </div>
          </div>

          <div
            className="pdf-zone f"
            onClick={() =>
              window.open("/assets/cv/CV-Florent-Pennecot.pdf", "_blank")
            }
          >
            <div className="pdf-card">
              <div className="pdf-ico">PDF</div>
              <div className="pdf-info">
                <span className="pdf-name">Mon CV</span>
                <span className="pdf-sub" id="pdf-sub">
                  CV-Florent-Pennecot.pdf
                </span>
              </div>
              <span className="pdf-arr">↗</span>
            </div>
          </div>

          <div className="socials f">
            <a className="soc" href="https://github.com" target="_blank">
              <svg viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a className="soc" href="https://linkedin.com" target="_blank">
              <svg viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              LinkedIn
            </a>
            <a className="soc" href="mailto:florent.pennecot@gmail.com">
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
      <footer className="foot">
        <p>© 2026 Florent Penneçot</p>
        <p>Rivesaltes · France</p>
      </footer>
    </div>
  );
}
