export default function About({ className }: { className: string }) {
  return (
    <div className={className} id="pg-about">
      <div className="pm">
        <div className="ph f">
          <span className="ph-tag">01 — À propos</span>
          <h2>
            Curieux,
            <br />
            <em>autodidacte.</em>
          </h2>
        </div>
        <div className="ag">
          <div className="at f">
            <p>
              Passionné d'informatique depuis mon plus jeune âge jeux vidéo,
              hardware, cybersécurité. J'aime comprendre comment les systèmes
              fonctionnent en profondeur.
            </p>
            <p>
              Je travaille souvent en autodidacte et j'apprécie les échanges
              avec des professionnels du secteur pour continuer à progresser.
            </p>
            <p>
              Actuellement en Bac Pro CIEL Cybersécurité, Informatique et
              réseaux, Électronique.
            </p>
            <span className="bt">Compétences</span>
            <div className="sk">
              <div>
                <div className="sk-top">
                  <span className="sk-name">Dépannage Hardware</span>
                  <span className="sk-pct">88%</span>
                </div>
                <div className="bar">
                  <div className="bf" style={{ width: "88%" }}></div>
                </div>
              </div>
              <div>
                <div className="sk-top">
                  <span className="sk-name">
                    Réseaux &amp; Infrastructure
                  </span>
                  <span className="sk-pct">82%</span>
                </div>
                <div className="bar">
                  <div className="bf" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div>
                <div className="sk-top">
                  <span className="sk-name">Cybersécurité</span>
                  <span className="sk-pct">75%</span>
                </div>
                <div className="bar">
                  <div className="bf" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="sk-top">
                  <span className="sk-name">Linux / Systèmes</span>
                  <span className="sk-pct">70%</span>
                </div>
                <div className="bar">
                  <div className="bf" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div>
                <div className="sk-top">
                  <span className="sk-name">Anglais Technique</span>
                  <span className="sk-pct">A2</span>
                </div>
                <div className="bar">
                  <div className="bf" style={{ width: "76%" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-side f">
            <span className="bt" style={{ marginTop: 0 }}>
              Formation
            </span>
            <div className="dc">
              <div>
                <div className="dc-n">Bac PRO CIEL — Cybersécurité</div>
                <div className="dc-s">2023–2026 · En cours</div>
              </div>
            </div>
            <div className="dc">
              <div>
                <div className="dc-n">B1V — Habilitation Électrique</div>
                <div className="dc-s">Certification professionnelle</div>
              </div>
            </div>
            <div className="dc">
              <div>
                <div className="dc-n">Brevet des Collèges</div>
                <div className="dc-s">Diplôme national</div>
              </div>
            </div>
            <span className="bt">Intérêts</span>
            <div className="chips">
              <div className="chip">Montage vidéo</div>
              <div className="chip">Musculation</div>
              <div className="chip">Jeux vidéo</div>
              <div className="chip">Informatique</div>
              <div className="chip">Cybersécurité</div>
              <div className="chip">Hardware</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="foot">
        <p>© 2026 — Florent Penneçot</p>
        <p>Rivesaltes · France</p>
      </footer>
    </div>
  );
}
