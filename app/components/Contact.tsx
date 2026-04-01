import { useRef } from 'react';
import { send } from '@emailjs/browser';

export default function Contact({ className }: { className: string }) {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      send(
        'YOUR_SERVICE_ID', // Remplacez par votre Service ID EmailJS
        'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID EmailJS
        {
          from_name: (form.current.elements.namedItem('from_name') as HTMLInputElement).value,
          reply_to: (form.current.elements.namedItem('from_email') as HTMLInputElement).value,
          message: (form.current.elements.namedItem('message') as HTMLTextAreaElement).value,
          date: new Date().toLocaleDateString('fr-FR'),
        },
        'YOUR_PUBLIC_KEY' // Remplacez par votre Public Key EmailJS
      )
        .then((result) => {
          console.log(result.text);
          document.getElementById('ok')!.style.display = 'block';
          form.current!.reset();
        })
        .catch((error) => {
          console.log(error.text);
          alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        });
    }
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
              Disponible pour des stages, alternances ou discussions
              techniques.
            </p>
            <div className="cls">
              <a className="cl" href="tel:+33603692812">
                <div>
                  <span className="cl-lbl">Téléphone</span>
                  <span className="cl-val">+33 6 03 69 28 12</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
              <a className="cl" href="mailto:florent.pennecot@gmail.com">
                <div>
                  <span className="cl-lbl">Email</span>
                  <span className="cl-val">florent.pennecot@gmail.com</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
              <div className="cl">
                <div>
                  <span className="cl-lbl">Adresse</span>
                  <span className="cl-val">94 Bd Arago, Rivesaltes (66)</span>
                </div>
              </div>
              <a className="cl" href="https://linkedin.com" target="_blank">
                <div>
                  <span className="cl-lbl">LinkedIn</span>
                  <span className="cl-val">Florent Penneçot</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
              <a className="cl" href="https://github.com" target="_blank">
                <div>
                  <span className="cl-lbl">GitHub</span>
                  <span className="cl-val">github.com/florent</span>
                </div>
                <span className="cl-arr">→</span>
              </a>
            </div>
          </div>
          <form
            ref={form}
            className="cf f"
            onSubmit={sendEmail}
          >
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
            <button
              type="submit"
              className="btn-p"
              style={{ border: "none", cursor: "pointer", width: "100%" }}
            >
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