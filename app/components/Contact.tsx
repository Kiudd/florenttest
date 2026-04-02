"use client";

import emailjs from "@emailjs/browser";

interface ContactProps {
  className: string;
}

export default function Contact({ className }: ContactProps) {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const templateParams = {
      from_name: (form.elements.namedItem("from_name") as HTMLInputElement)
        .value,
      from_email: (form.elements.namedItem("from_email") as HTMLInputElement)
        .value,
      reply_to: (form.elements.namedItem("from_email") as HTMLInputElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      date: new Date().toLocaleDateString("fr-FR"),
    };

    emailjs
      .send(
        "service_h6xe6q8",
        "template_qbv764g",
        templateParams,
        "IpLUSkFf-_Epho_7C",
      )
      .then(
        (result) => {
          console.log("Email envoyé :", result.text);
          document.getElementById("ok")!.style.display = "block";
          form.reset();
        },
        (error) => {
          console.error("Erreur :", error.text);
          alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
        },
      );
  };

  return (
    <div className={className} id="pg-contact">
      <div className="pm">
        <div className="ph f">
          <span className="ph-tag">03 — Contact</span>
          <h2>
            Travaillons
            <br />
            <em>ensemble.</em>
          </h2>
        </div>
        <div className="cg">
          <div className="f">
            <p className="ci-intro">
              Disponible pour des stages, alternances ou discussions techniques.
            </p>
            <div className="cls">
              <a className="cl" href="tel:+33603692812">
                <div>
                  <span className="cl-lbl">Téléphone</span>
                  <span className="cl-val">+33 6 03 69 28 12</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
              <div className="cl">
                <div>
                  <span className="cl-lbl">Adresse</span>
                  <span className="cl-val">94 Bd Arago, Rivesaltes (66)</span>
                </div>
              </div>
              <a
                className="cl"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
              >
                <div>
                  <span className="cl-lbl">LinkedIn</span>
                  <span className="cl-val">Florent Penneçot</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
              <a
                className="cl"
                href="https://github.com"
                target="_blank"
                rel="noopener"
              >
                <div>
                  <span className="cl-lbl">GitHub</span>
                  <span className="cl-val">github.com/florent</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
            </div>
          </div>
          <form className="cf f" onSubmit={sendEmail}>
            <div className="fg">
              <label className="fl">Nom</label>
              <input
                className="fi"
                type="text"
                name="from_name"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="fg">
              <label className="fl">Email</label>
              <input
                className="fi"
                type="email"
                name="from_email"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div className="fg">
              <label className="fl">Message</label>
              <textarea
                className="ft"
                name="message"
                placeholder="Votre message..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-p">
              Envoyer le message
            </button>
            <p className="ok" id="ok">
              ✓ Message envoyé avec succès.
            </p>
          </form>
        </div>
      </div>
      <footer className="foot">
        <p>© 2026 — Florent Penneçot</p>
        <p>Rivesaltes · France</p>
      </footer>
    </div>
  );
}
