const projects = [
  {
    date: "Avril 2026",
    title: "Portfolio personnel",
    description:
      "Presentation de mon parcours, de mes competences et de mes projets dans une interface claire et moderne.",
    image: "",
    featured: "portfolio",
    pill: "Web",
    link: "",
  },
  {
    date: "08 avril 2026",
    title: "InfraWatch",
    description:
      "Mini-projet de supervision reseau local avec serveur PowerShell, monitoring ICMP, suivi CPU, RAM et trafic, alertes et tableau de bord web.",
    image: "",
    featured: "infrawatch",
    pill: "Reseau",
    link: "https://www.linkedin.com/posts/florent-penne%C3%A7ot-8b000138a_supervision-raezseau-powershell-activity-7447627019066105856-FFUh?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF_Aq8QBBfQ_JLtAHbTVq09Ll2B8VvmvEDI",
  },
  {
    date: "Projet a venir",
    title: "Projet cybersécurité",
    description:
      "Cette carte est prete pour presenter un futur projet avec un titre, une image et une description.",
    image: "",
    featured: false,
    pill: "Cyber",
    link: "",
  },
];

export default function Projects({ className }: { className: string }) {
  return (
    <div className={className} id="pg-projects">
      <div className="pm">
        <div className="ph f">
          <span className="ph-tag">03 - Projets</span>
          <h2>
            Projets &
            <br />
            <em>realisations.</em>
          </h2>
        </div>

        <div className="projects-head f">
          <p className="projects-intro">
            Une selection de projets pour presenter mon travail, ma progression
            et les realisations que je souhaite mettre en avant.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card f" key={project.title}>
              <div className="project-media">
                {project.featured === "portfolio" ? (
                  <div className="project-preview">
                    <div className="project-preview-bar">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="project-preview-body">
                      <div className="project-preview-copy">
                        <div className="project-preview-tag">Portfolio</div>
                        <div className="project-preview-title">
                          Florent
                          <br />
                          Pennecot
                        </div>
                        <div className="project-preview-line short"></div>
                        <div className="project-preview-line"></div>
                      </div>
                      <div className="project-preview-side">
                        <div className="project-preview-panel top"></div>
                        <div className="project-preview-panel"></div>
                        <div className="project-preview-panel small"></div>
                      </div>
                    </div>
                  </div>
                ) : project.featured === "infrawatch" ? (
                  <div className="project-preview project-preview-monitor">
                    <div className="project-preview-bar">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="project-preview-monitor-body">
                      <div className="monitor-head">
                        <div className="monitor-title">InfraWatch</div>
                        <div className="monitor-status">ONLINE</div>
                      </div>
                      <div className="monitor-grid">
                        <div className="monitor-card">
                          <span>ICMP</span>
                          <strong>24 ms</strong>
                        </div>
                        <div className="monitor-card">
                          <span>CPU</span>
                          <strong>31%</strong>
                        </div>
                        <div className="monitor-card">
                          <span>RAM</span>
                          <strong>58%</strong>
                        </div>
                        <div className="monitor-card">
                          <span>TRAFIC</span>
                          <strong>1.2 Gb</strong>
                        </div>
                      </div>
                      <div className="monitor-chart">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                ) : project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-placeholder">
                    Image du projet a ajouter
                  </div>
                )}
              </div>

              <div className="project-body">
                <div className="project-meta">
                  <span className="project-date">{project.date}</span>
                  <span className="project-pill">{project.pill}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                {project.link && (
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le projet
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="foot">
        <p>© 2026 - Florent Pennecot</p>
        <p>Rivesaltes - France</p>
      </footer>
    </div>
  );
}
