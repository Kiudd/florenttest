'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Portfolio() {
  const c3dRef = useRef<HTMLCanvasElement>(null);
  const cNetRef = useRef<HTMLCanvasElement>(null);
  const cBinRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load Three.js if not loaded
    initThreeJS();

    function initThreeJS() {
      if (!c3dRef.current) return;

      const W = () => window.innerWidth;
      const H = () => window.innerHeight;
      const renderer = new THREE.WebGLRenderer({ canvas: c3dRef.current, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W(), H());
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(55, W() / H(), .1, 100);
      cam.position.z = 9;
      scene.add(new THREE.AmbientLight(0xffffff, .3));
      const pl = new THREE.PointLight(0x3d5c2e, 2, 25); pl.position.set(5, 5, 5); scene.add(pl);
      const pl2 = new THREE.PointLight(0x2a4020, 1.5, 20); pl2.position.set(-5, -4, 3); scene.add(pl2);
      const wm = (op: number, col = 0x3d5c2e) => new THREE.MeshStandardMaterial({ color: col, wireframe: true, transparent: true, opacity: op });

      const cube = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.3, 1.3), wm(.18)); cube.position.set(4.2, 1.5, -1); scene.add(cube);
      const octa = new THREE.Mesh(new THREE.OctahedronGeometry(1.0), wm(.14, 0x527a3a)); octa.position.set(-4.2, -1.2, -2); scene.add(octa);
      const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 0), wm(.08, 0x2a4020)); ico.position.set(.5, 0, -6); scene.add(ico);
      const tor = new THREE.Mesh(new THREE.TorusGeometry(1.1, .28, 8, 24), wm(.14, 0x527a3a)); tor.position.set(-3, 2.8, -2); scene.add(tor);

      function makeRouter(x: number, y: number, z: number) {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, .22, .65), wm(.26, 0x3d5c2e)));
        [-1, 1].forEach(i => { const a = new THREE.Mesh(new THREE.CylinderGeometry(.02, .02, .48, 6), wm(.32, 0x527a3a)); a.position.set(i * .33, .35, 0); g.add(a); });
        for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(.09, .07, .07), wm(.38, 0x7aa855)); p.position.set(-.42 + i * .28, -.04, .34); g.add(p); }
        g.position.set(x, y, z); scene.add(g); return g;
      }
      const r1 = makeRouter(-2.8, -.5, -1.5);
      const r2 = makeRouter(3, -2, -.5);
      const r3 = makeRouter(-.5, 3, -2);

      function makeLine(a: number[], b: number[]) {
        const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
        scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x3d5c2e, transparent: true, opacity: .2 })));
      }
      makeLine([-2.8, -.5, -1.5], [3, -2, -.5]);
      makeLine([-2.8, -.5, -1.5], [-.5, 3, -2]);
      makeLine([3, -2, -.5], [-.5, 3, -2]);

      const n = 900, pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { pos[i * 3] = (Math.random() - .5) * 26; pos[i * 3 + 1] = (Math.random() - .5) * 26; pos[i * 3 + 2] = (Math.random() - .5) * 16; }
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x3d5c2e, size: .05, transparent: true, opacity: .3, sizeAttenuation: true })));

      let mx = 0, my = 0;
      window.addEventListener('mousemove', e => { mx = (e.clientX / W() - .5) * 2; my = (e.clientY / H() - .5) * 2 });
      window.addEventListener('resize', () => { cam.aspect = W() / H(); cam.updateProjectionMatrix(); renderer.setSize(W(), H()) });
      const clk = new THREE.Clock();
      (function loop() {
        requestAnimationFrame(loop);
        const t = clk.getElapsedTime();
        cube.rotation.x = t * .22; cube.rotation.y = t * .16; cube.position.y = 1.5 + Math.sin(t * .5) * .38;
        octa.rotation.x = t * .3; octa.rotation.z = t * .18; octa.position.y = -1.2 + Math.cos(t * .4) * .42;
        ico.rotation.y = t * .09; ico.rotation.x = t * .06;
        tor.rotation.x = t * .25; tor.rotation.y = t * .16; tor.position.y = 2.8 + Math.sin(t * .52) * .33;
        r1.rotation.y = Math.sin(t * .3) * .15; r1.position.y = -.5 + Math.sin(t * .38) * .22;
        r2.rotation.y = Math.sin(t * .25 + 1) * .15; r2.position.y = -2 + Math.cos(t * .33) * .22;
        r3.rotation.y = Math.sin(t * .28 + 2) * .15; r3.position.y = 3 + Math.sin(t * .36) * .22;
        scene.rotation.y += (mx * .04 - scene.rotation.y) * .02;
        scene.rotation.x += (-my * .028 - scene.rotation.x) * .02;
        renderer.render(scene, cam);
      })();
    }

    // Binary rain
    const bc = cBinRef.current;
    if (bc) {
      const bctx = bc.getContext('2d');
      if (bctx) {
        bc.width = window.innerWidth; bc.height = window.innerHeight;
        const cols = Math.floor(window.innerWidth / 18), drops = Array(cols).fill(0);
        function drawBin() {
          if (!bctx || !bc) return;
          bctx.clearRect(0, 0, bc.width, bc.height);
          bctx.fillStyle = 'rgba(42,64,32,0.45)'; bctx.font = '11px DM Mono,monospace';
          drops.forEach((y, i) => {
            bctx.fillText(Math.random() > .5 ? '1' : '0', i * 18, y);
            drops[i] = y > bc.height && Math.random() > .97 ? 0 : y + 14;
          });
        }
        setInterval(drawBin, 85);
        window.addEventListener('resize', () => { bc.width = window.innerWidth; bc.height = window.innerHeight });
      }
    }

    // Network nodes
    const nc = cNetRef.current;
    if (nc) {
      const nctx = nc.getContext('2d');
      if (nctx) {
        nc.width = window.innerWidth; nc.height = window.innerHeight;
        const nodes = Array.from({ length: 16 }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1.8 + Math.random() * 2 }));
        function drawNet() {
          if (!nctx || !nc) return;
          nctx.clearRect(0, 0, nc.width, nc.height);
          nodes.forEach(n => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > nc.width) n.vx *= -1; if (n.y < 0 || n.y > nc.height) n.vy *= -1; });
          nodes.forEach((a, i) => {
            nodes.forEach((b, j) => {
              if (j <= i) return;
              const d = Math.hypot(a.x - b.x, a.y - b.y);
              if (d < 150) { nctx.strokeStyle = `rgba(42,64,32,${.45 * (1 - d / 150)})`; nctx.lineWidth = .5; nctx.beginPath(); nctx.moveTo(a.x, a.y); nctx.lineTo(b.x, b.y); nctx.stroke(); }
            });
            nctx.fillStyle = 'rgba(42,64,32,0.6)'; nctx.beginPath(); nctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); nctx.fill();
          });
        }
        setInterval(drawNet, 30);
        window.addEventListener('resize', () => { nc.width = window.innerWidth; nc.height = window.innerHeight });
      }
    }

    // Navigation
    function go(id: string) {
      document.querySelectorAll('.pg').forEach(p => p.classList.remove('show'));
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('on'));
      document.getElementById('pg-' + id)?.classList.add('show');
      document.getElementById('nl-' + id)?.classList.add('on');
      setTimeout(() => { document.querySelectorAll('#pg-' + id + ' .f').forEach((el: any) => { el.classList.remove('in'); setTimeout(() => el.classList.add('in'), 75); }); }, 10);
    }
    (window as any).go = go;
    setTimeout(() => document.querySelectorAll('#pg-home .f').forEach((el: any, i) => setTimeout(() => el.classList.add('in'), i * 90)), 80);

    // Photo upload - removed
    // PDF upload - removed

    // Form submit
    const form = document.querySelector('.cf') as HTMLFormElement;
    if (form) {
      form.onsubmit = function (e) { e.preventDefault(); document.getElementById('ok')!.style.display = 'block'; (e.target as HTMLFormElement).reset(); };
    }

    // Terminal animation
    const hero = document.getElementById('term-hero');
    if (hero) {
      const seq = [
        { delay: 200, html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> whoami</span></div>' },
        { delay: 900, html: '<div class="tc-out-name">Florent Penneçot</div>' },
        { delay: 1400, html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> cat info.txt</span></div>' },
        { delay: 2100, html: '<div class="tc-out-role">→ Technicien Réseau &amp; Cybersécurité</div>' },
        { delay: 2500, html: '<div class="tc-out-info">→ Bac Pro CIEL 2023–2026</div>' },
        { delay: 2900, html: '<div class="tc-out-info">→ Rivesaltes, France (66)</div>' },
        { delay: 3400, html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> ping -c 3 recruteur.local</span></div>' },
        { delay: 4200, html: '<div class="tc-out-ok">64 bytes from recruteur.local: icmp_seq=1 time=0.1ms</div>' },
        { delay: 4600, html: '<div class="tc-out-ok">64 bytes from recruteur.local: icmp_seq=2 time=0.1ms</div>' },
        { delay: 5000, html: '<div class="tc-out-ok">3 packets transmitted, 3 received, 0% loss</div>' },
        { delay: 5600, html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> ls skills/</span></div>' },
        { delay: 6300, html: '<div class="tc-out-dim">réseaux/&nbsp;&nbsp;cybersécurité/&nbsp;&nbsp;hardware/&nbsp;&nbsp;linux/</div>' },
        { delay: 6800, html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span id="tc-cursor-line"></span></div>' },
      ];
      seq.forEach(s => {
        setTimeout(() => {
          hero.insertAdjacentHTML('beforeend', s.html);
          hero.scrollTop = hero.scrollHeight;
        }, s.delay);
      });
      setTimeout(() => {
        const cl = document.getElementById('tc-cursor-line');
        if (cl) cl.insertAdjacentHTML('afterend', '<span class="tc-cursor"></span>');
      }, 6900);
    }
  }, []);

  return (
    <>
      <canvas ref={c3dRef} id="c3d"></canvas>
      <canvas ref={cNetRef} id="c-net"></canvas>
      <canvas ref={cBinRef} id="c-bin"></canvas>

      <nav className="nav">
        <div className="logo" onClick={() => (window as any).go('home')}>fp<span>@portfolio</span>:~$</div>
        <ul className="nav-links">
          <li><a id="nl-home" className="on" onClick={() => (window as any).go('home')}>Accueil</a></li>
          <li><a id="nl-about" onClick={() => (window as any).go('about')}>À propos</a></li>
          <li><a id="nl-exp" onClick={() => (window as any).go('exp')}>Expérience</a></li>
          <li><a id="nl-contact" onClick={() => (window as any).go('contact')}>Contact</a></li>
        </ul>
      </nav>

      {/* HOME */}
      <div className="pg show" id="pg-home">
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
            <p className="h-desc f">Passionné d'informatique — hardware, réseaux, cybersécurité.<br />Bac Pro CIEL 2023–2026 · 7 stages professionnels réalisés.</p>
            <div className="cta f">
              <button className="btn-p" onClick={() => (window as any).go('exp')}>Mon parcours</button>
              <button className="btn-o" onClick={() => (window as any).go('contact')}>Me contacter</button>
            </div>
          </div>

          <div className="hero-r">
            <div className="photo-zone f">
              <div className="photo-ring">
                <div className="photo-inner">
                  <img id="photo-img" src="/images/Florent-Pennecot.jpeg" alt="" className="show" />
                  <div className="photo-ph" id="photo-ph" style={{ display: 'none' }}>
                    <div className="photo-ph-ic">👤</div>
                    <div className="photo-ph-tx">Ajouter photo</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-grid f">
              <div className="stat"><span className="stat-n">7+</span><span className="stat-l">Stages</span></div>
              <div className="stat"><span className="stat-n">76%</span><span className="stat-l">Anglais</span></div>
              <div className="stat"><span className="stat-n">3</span><span className="stat-l">Ans form.</span></div>
              <div className="stat"><span className="stat-n">2026</span><span className="stat-l">Diplôme</span></div>
            </div>

            <div className="pdf-zone f" onClick={() => window.open('/assets/cv/CV-Florent-Pennecot.pdf', '_blank')}>
              <div className="pdf-card">
                <div className="pdf-ico">PDF</div>
                <div className="pdf-info">
                  <span className="pdf-name">Mon CV</span>
                  <span className="pdf-sub" id="pdf-sub">CV-Florent-Pennecot.pdf</span>
                </div>
                <span className="pdf-arr">↗</span>
              </div>
            </div>

            <div className="socials f">
              <a className="soc" href="https://github.com" target="_blank"><svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</a>
              <a className="soc" href="https://linkedin.com" target="_blank"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>LinkedIn</a>
              <a className="soc" href="mailto:florent.pennecot@gmail.com"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>Email</a>
            </div>
          </div>
        </div>
        <footer className="foot"><p>© 2026 — Florent Penneçot</p><p>Rivesaltes · France</p></footer>
      </div>

      {/* ABOUT */}
      <div className="pg" id="pg-about">
        <div className="pm">
          <div className="ph f"><span className="ph-tag">01 — À propos</span><h2>Curieux,<br /><em>autodidacte.</em></h2></div>
          <div className="ag">
            <div className="at f">
              <p>Passionné d'informatique depuis mon plus jeune âge — jeux vidéo, hardware, cybersécurité. J'aime comprendre comment les systèmes fonctionnent en profondeur.</p>
              <p>Je travaille souvent en autodidacte et j'apprécie les échanges avec des professionnels du secteur pour continuer à progresser.</p>
              <p>Actuellement en Bac Pro CIEL — Cybersécurité, Informatique et réseaux, Électronique.</p>
              <span className="bt">Compétences</span>
              <div className="sk">
                <div><div className="sk-top"><span className="sk-name">Dépannage Hardware</span><span className="sk-pct">88%</span></div><div className="bar"><div className="bf" style={{ width: '88%' }}></div></div></div>
                <div><div className="sk-top"><span className="sk-name">Réseaux &amp; Infrastructure</span><span className="sk-pct">82%</span></div><div className="bar"><div className="bf" style={{ width: '82%' }}></div></div></div>
                <div><div className="sk-top"><span className="sk-name">Cybersécurité</span><span className="sk-pct">75%</span></div><div className="bar"><div className="bf" style={{ width: '75%' }}></div></div></div>
                <div><div className="sk-top"><span className="sk-name">Linux / Systèmes</span><span className="sk-pct">70%</span></div><div className="bar"><div className="bf" style={{ width: '70%' }}></div></div></div>
                <div><div className="sk-top"><span className="sk-name">Anglais Technique</span><span className="sk-pct">76%</span></div><div className="bar"><div className="bf" style={{ width: '76%' }}></div></div></div>
              </div>
            </div>
            <div className="f">
              <span className="bt" style={{ marginTop: 0 }}>Formation</span>
              <div className="dc"><div><div className="dc-n">Bac PRO CIEL — Cybersécurité</div><div className="dc-s">2023–2026 · En cours</div></div></div>
              <div className="dc"><div><div className="dc-n">B1V — Habilitation Électrique</div><div className="dc-s">Certification professionnelle</div></div></div>
              <div className="dc"><div><div className="dc-n">Brevet des Collèges</div><div className="dc-s">Diplôme national</div></div></div>
              <span className="bt">Intérêts</span>
              <div className="chips">
                <div className="chip">Montage vidéo</div><div className="chip">Musculation</div>
                <div className="chip">Jeux vidéo</div><div className="chip">Informatique</div>
                <div className="chip">Cybersécurité</div><div className="chip">Hardware</div>
              </div>
            </div>
          </div>
        </div>
        <footer className="foot"><p>© 2026 — Florent Penneçot</p><p>Rivesaltes · France</p></footer>
      </div>

      {/* EXPERIENCE */}
      <div className="pg" id="pg-exp">
        <div className="pm">
          <div className="ph f"><span className="ph-tag">02 — Expérience</span><h2>Terrain &amp;<br /><em>pratique.</em></h2></div>
          <div className="tl">
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">Tecsol <span className="eloc">— Perpignan</span></div><div className="erole">Technicien réseaux &amp; développement · Stagiaire</div></div><div className="edate">Mars → Avr 2026</div></div><p className="edesc">Intervention réseau et développement d'applications internes.</p></div></div>
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">LDLC <span className="eloc">— Claira</span></div><div className="erole">Installation &amp; Diagnostique · Stagiaire</div></div><div className="edate">Nov 2025</div></div><p className="edesc">Diagnostic matériel et logiciel, installation de postes clients, support technique niveaux 1 et 2.</p></div></div>
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">Log66 <span className="eloc">— Rivesaltes</span></div><div className="erole">Installation, Programmation &amp; Réseau · Stagiaire</div></div><div className="edate">Mai → Juin 2025</div></div><p className="edesc">Configuration réseau, programmation et interventions terrain chez des clients professionnels.</p></div></div>
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">PhenixPC <span className="eloc">— Perpignan</span></div><div className="erole">Installation, Diagnostique &amp; Réseau · Stagiaire</div></div><div className="edate">Jan → Fév 2025</div></div><p className="edesc">Montage et dépannage PC, résolution de problèmes réseau, gestion de parc informatique.</p></div></div>
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">LDLC <span className="eloc">— Claira</span></div><div className="erole">Installation &amp; Diagnostique · Stagiaire</div></div><div className="edate">Mai → Juin 2024</div></div><p className="edesc">Première immersion LDLC, installation et diagnostique de matériels clients.</p></div></div>
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">Docteur PC <span className="eloc">— Rivesaltes</span></div><div className="erole">Installation &amp; Diagnostique · Stagiaire</div></div><div className="edate">Nov 2023</div></div><p className="edesc">Dépannage et installation de systèmes informatiques pour particuliers.</p></div></div>
            <div className="ei f"><div className="edot"></div><div className="ec"><div className="ehead"><div><div className="eco">AS Protection <span className="eloc">— Rivesaltes</span></div><div className="erole">Installation &amp; Diagnostique · Stagiaire</div></div><div className="edate">Juin 2023</div></div><p className="edesc">Premier stage. Installation de systèmes de sécurité et infrastructure réseau.</p></div></div>
          </div>
        </div>
        <footer className="foot"><p>© 2026 — Florent Penneçot</p><p>Rivesaltes · France</p></footer>
      </div>

      {/* CONTACT */}
      <div className="pg" id="pg-contact">
        <div className="pm">
          <div className="ph f"><span className="ph-tag">03 — Contact</span><h2>Travaillons<br /><em>ensemble.</em></h2></div>
          <div className="cg">
            <div className="f">
              <p className="ci-intro">Disponible pour des stages, alternances ou discussions techniques.</p>
              <div className="cls">
                <a className="cl" href="tel:+33603692812"><div><span className="cl-lbl">Téléphone</span><span className="cl-val">+33 6 03 69 28 12</span></div><span className="cl-arr">→</span></a>
                <a className="cl" href="mailto:florent.pennecot@gmail.com"><div><span className="cl-lbl">Email</span><span className="cl-val">florent.pennecot@gmail.com</span></div><span className="cl-arr">→</span></a>
                <div className="cl"><div><span className="cl-lbl">Adresse</span><span className="cl-val">94 Bd Arago, Rivesaltes (66)</span></div></div>
                <a className="cl" href="https://linkedin.com" target="_blank"><div><span className="cl-lbl">LinkedIn</span><span className="cl-val">Florent Penneçot</span></div><span className="cl-arr">→</span></a>
                <a className="cl" href="https://github.com" target="_blank"><div><span className="cl-lbl">GitHub</span><span className="cl-val">github.com/florent</span></div><span className="cl-arr">→</span></a>
              </div>
            </div>
            <form className="cf f" onSubmit={(e) => { e.preventDefault(); document.getElementById('ok')!.style.display = 'block'; (e.target as HTMLFormElement).reset(); }}>
              <div className="fg"><label className="fl">Nom</label><input className="fi" type="text" placeholder="Votre nom" required /></div>
              <div className="fg"><label className="fl">Email</label><input className="fi" type="email" placeholder="votre@email.com" required /></div>
              <div className="fg"><label className="fl">Message</label><textarea className="ft" placeholder="Votre message..." required></textarea></div>
              <button type="submit" className="btn-p" style={{ border: 'none', cursor: 'pointer', width: '100%' }}>Envoyer le message</button>
              <p className="ok" id="ok">✓ Message envoyé avec succès.</p>
            </form>
          </div>
        </div>
        <footer className="foot"><p>© 2026 — Florent Penneçot</p><p>Rivesaltes · France</p></footer>
      </div>
    </>
  );
}