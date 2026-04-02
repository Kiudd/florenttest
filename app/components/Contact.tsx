"use client";

import emailjs from "@emailjs/browser";

interface ContactProps {
  className: string;
}

export default function Contact({ className }: ContactProps) {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Récupère les champs directement depuis form.elements
    const from_name = (form.elements.namedItem("from_name") as HTMLInputElement)
      .value;
    const from_email = (
      form.elements.namedItem("from_email") as HTMLInputElement
    ).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    const templateParams = {
      from_name,
      from_email,
      reply_to: from_email,
      message,
      date: new Date().toLocaleDateString("fr-FR"),
    };

    console.log("PARAMS:", templateParams);

    emailjs
      .send(
        "service_h6xe6q8",
        "template_qbv764g",
        templateParams,
        "IpLUSkFf-_Epho_7C",
      )
      .then(() => {
        document.getElementById("ok")!.style.display = "block";
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'envoi.");
      });
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
            <div className="cls">{/* tes liens de contact */}</div>
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
