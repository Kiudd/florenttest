"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

interface ContactProps {
  className: string;
}

export default function Contact({ className }: ContactProps) {
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      reply_to: fromEmail,
      message: message,
      date: new Date().toLocaleDateString("fr-FR"),
    };

    console.log("PARAMS:", templateParams);

    emailjs
      .send(
        "service_f4m5324", // ton service ID
        "template_0uoxsbr", // ton template ID
        templateParams,
        "JgRY19AzXkPami1z5", // ton public key
      )
      .then(() => {
        setSuccess(true);
        setFromName("");
        setFromEmail("");
        setMessage("");

        // Faire disparaître le message après 4 secondes
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'envoi du message !");
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
                href="https://www.linkedin.com/in/florent-penneçot-8b000138a/"
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
                href="https://github.com/Florent-Tech"
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
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
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
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                required
              />
            </div>

            <div className="fg">
              <label className="fl">Message</label>
              <textarea
                className="ft"
                name="message"
                placeholder="Votre message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-p">
              Envoyer le message
            </button>

            {success && (
              <p
                className="ok"
                id="ok"
                style={{ color: "green", marginTop: "10px" }}
              >
                ✓ Message envoyé avec succès.
              </p>
            )}
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
