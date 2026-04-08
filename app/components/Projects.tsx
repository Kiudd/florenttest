const projects = [
  {
    date: "Avril 2026",
    title: "Portfolio personnel",
    description:
      "Presentation de mon parcours, de mes competences et de mes projets dans une interface claire et moderne.",
    image: "",
    featured: true,
  },
  {
    date: "Projet a venir",
    title: "Projet reseau",
    description:
      "Ajoutez ici une image, la date du projet et un resume simple de ce que vous avez realise.",
    image: "",
    featured: false,
  },
  {
    date: "Projet a venir",
    title: "Projet cybersécurité",
    description:
      "Cette carte est prete pour presenter un futur projet avec un titre, une image et une description.",
    image: "",
    featured: false,
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
                {project.featured ? (
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
                  <span className="project-pill">Projet</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
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
