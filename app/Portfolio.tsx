"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Portfolio() {
  const c3dRef = useRef<HTMLCanvasElement>(null);
  const cNetRef = useRef<HTMLCanvasElement>(null);
  const cBinRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState("home");

  const go = (id: string) => {
    setCurrentPage(id);
    // Update nav links
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('on'));
    document.getElementById('nl-' + id)?.classList.add('on');
    // Update page visibility
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('show'));
    document.getElementById('pg-' + id)?.classList.add('show');
    // Animate elements
    setTimeout(() => {
      document.querySelectorAll('#pg-' + id + ' .f').forEach((el, i) => {
        (el as HTMLElement).classList.remove('in');
        setTimeout(() => (el as HTMLElement).classList.add('in'), i * 75);
      });
    }, 10);
  };

  useEffect(() => {
    // Load Three.js if not loaded
    initThreeJS();

    function initThreeJS() {
      if (!c3dRef.current) return;

      const W = () => window.innerWidth;
      const H = () => window.innerHeight;
      const renderer = new THREE.WebGLRenderer({
        canvas: c3dRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W(), H());
      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(55, W() / H(), 0.1, 100);
      cam.position.z = 9;
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const pl = new THREE.PointLight(0x3d5c2e, 2, 25);
      pl.position.set(5, 5, 5);
      scene.add(pl);
      const pl2 = new THREE.PointLight(0x2a4020, 1.5, 20);
      pl2.position.set(-5, -4, 3);
      scene.add(pl2);
      const wm = (op: number, col = 0x3d5c2e) =>
        new THREE.MeshStandardMaterial({
          color: col,
          wireframe: true,
          transparent: true,
          opacity: op,
        });

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 1.3, 1.3),
        wm(0.18),
      );
      cube.position.set(4.2, 1.5, -1);
      scene.add(cube);
      const octa = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.0),
        wm(0.14, 0x527a3a),
      );
      octa.position.set(-4.2, -1.2, -2);
      scene.add(octa);
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2, 0),
        wm(0.08, 0x2a4020),
      );
      ico.position.set(0.5, 0, -6);
      scene.add(ico);
      const tor = new THREE.Mesh(
        new THREE.TorusGeometry(1.1, 0.28, 8, 24),
        wm(0.14, 0x527a3a),
      );
      tor.position.set(-3, 2.8, -2);
      scene.add(tor);

      function makeRouter(x: number, y: number, z: number) {
        const g = new THREE.Group();
        g.add(
          new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.22, 0.65),
            wm(0.26, 0x3d5c2e),
          ),
        );
        [-1, 1].forEach((i) => {
          const a = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.48, 6),
            wm(0.32, 0x527a3a),
          );
          a.position.set(i * 0.33, 0.35, 0);
          g.add(a);
        });
        for (let i = 0; i < 4; i++) {
          const p = new THREE.Mesh(
            new THREE.BoxGeometry(0.09, 0.07, 0.07),
            wm(0.38, 0x7aa855),
          );
          p.position.set(-0.42 + i * 0.28, -0.04, 0.34);
          g.add(p);
        }
        g.position.set(x, y, z);
        scene.add(g);
        return g;
      }
      const r1 = makeRouter(-2.8, -0.5, -1.5);
      const r2 = makeRouter(3, -2, -0.5);
      const r3 = makeRouter(-0.5, 3, -2);

      function makeLine(a: number[], b: number[]) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...a),
          new THREE.Vector3(...b),
        ]);
        scene.add(
          new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({
              color: 0x3d5c2e,
              transparent: true,
              opacity: 0.2,
            }),
          ),
        );
      }
      makeLine([-2.8, -0.5, -1.5], [3, -2, -0.5]);
      makeLine([-2.8, -0.5, -1.5], [-0.5, 3, -2]);
      makeLine([3, -2, -0.5], [-0.5, 3, -2]);

      const n = 900,
        pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(
        new THREE.Points(
          pg,
          new THREE.PointsMaterial({
            color: 0x3d5c2e,
            size: 0.05,
            transparent: true,
            opacity: 0.3,
            sizeAttenuation: true,
          }),
        ),
      );

      let mx = 0,
        my = 0;
      window.addEventListener("mousemove", (e) => {
        mx = (e.clientX / W() - 0.5) * 2;
        my = (e.clientY / H() - 0.5) * 2;
      });
      window.addEventListener("resize", () => {
        cam.aspect = W() / H();
        cam.updateProjectionMatrix();
        renderer.setSize(W(), H());
      });
      const clk = new THREE.Clock();
      (function loop() {
        requestAnimationFrame(loop);
        const t = clk.getElapsedTime();
        cube.rotation.x = t * 0.22;
        cube.rotation.y = t * 0.16;
        cube.position.y = 1.5 + Math.sin(t * 0.5) * 0.38;
        octa.rotation.x = t * 0.3;
        octa.rotation.z = t * 0.18;
        octa.position.y = -1.2 + Math.cos(t * 0.4) * 0.42;
        ico.rotation.y = t * 0.09;
        ico.rotation.x = t * 0.06;
        tor.rotation.x = t * 0.25;
        tor.rotation.y = t * 0.16;
        tor.position.y = 2.8 + Math.sin(t * 0.52) * 0.33;
        r1.rotation.y = Math.sin(t * 0.3) * 0.15;
        r1.position.y = -0.5 + Math.sin(t * 0.38) * 0.22;
        r2.rotation.y = Math.sin(t * 0.25 + 1) * 0.15;
        r2.position.y = -2 + Math.cos(t * 0.33) * 0.22;
        r3.rotation.y = Math.sin(t * 0.28 + 2) * 0.15;
        r3.position.y = 3 + Math.sin(t * 0.36) * 0.22;
        scene.rotation.y += (mx * 0.04 - scene.rotation.y) * 0.02;
        scene.rotation.x += (-my * 0.028 - scene.rotation.x) * 0.02;
        renderer.render(scene, cam);
      })();
    }

    // Binary rain
    const bc = cBinRef.current;
    if (bc) {
      const bctx = bc.getContext("2d");
      if (bctx) {
        bc.width = window.innerWidth;
        bc.height = window.innerHeight;
        const cols = Math.floor(window.innerWidth / 18),
          drops = Array(cols).fill(0);
        function drawBin() {
          if (!bctx || !bc) return;
          bctx.clearRect(0, 0, bc.width, bc.height);
          bctx.fillStyle = "rgba(42,64,32,0.45)";
          bctx.font = "11px DM Mono,monospace";
          drops.forEach((y, i) => {
            bctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 18, y);
            drops[i] = y > bc.height && Math.random() > 0.97 ? 0 : y + 14;
          });
        }
        setInterval(drawBin, 85);
        window.addEventListener("resize", () => {
          bc.width = window.innerWidth;
          bc.height = window.innerHeight;
        });
      }
    }

    // Network nodes
    const nc = cNetRef.current;
    if (nc) {
      const nctx = nc.getContext("2d");
      if (nctx) {
        nc.width = window.innerWidth;
        nc.height = window.innerHeight;
        const nodes = Array.from({ length: 16 }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1.8 + Math.random() * 2,
        }));
        function drawNet() {
          if (!nctx || !nc) return;
          nctx.clearRect(0, 0, nc.width, nc.height);
          nodes.forEach((n) => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > nc.width) n.vx *= -1;
            if (n.y < 0 || n.y > nc.height) n.vy *= -1;
          });
          nodes.forEach((a, i) => {
            nodes.forEach((b, j) => {
              if (j <= i) return;
              const d = Math.hypot(a.x - b.x, a.y - b.y);
              if (d < 150) {
                nctx.strokeStyle = `rgba(42,64,32,${0.45 * (1 - d / 150)})`;
                nctx.lineWidth = 0.5;
                nctx.beginPath();
                nctx.moveTo(a.x, a.y);
                nctx.lineTo(b.x, b.y);
                nctx.stroke();
              }
            });
            nctx.fillStyle = "rgba(42,64,32,0.6)";
            nctx.beginPath();
            nctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
            nctx.fill();
          });
        }
        setInterval(drawNet, 30);
        window.addEventListener("resize", () => {
          nc.width = window.innerWidth;
          nc.height = window.innerHeight;
        });
      }
    }

    // Navigation is now handled by state

    // Photo upload - removed
    // PDF upload - removed

    // Form submit
    const form = document.querySelector(".cf") as HTMLFormElement;
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        document.getElementById("ok")!.style.display = "block";
        (e.target as HTMLFormElement).reset();
      };
    }

    // Terminal animation
    const hero = document.getElementById("term-hero");
    if (hero) {
      const seq = [
        {
          delay: 200,
          html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> whoami</span></div>',
        },
        { delay: 900, html: '<div class="tc-out-name">Florent Penneçot</div>' },
        {
          delay: 1400,
          html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> cat info.txt</span></div>',
        },
        {
          delay: 2100,
          html: '<div class="tc-out-role">→ Technicien Réseau &amp; Cybersécurité</div>',
        },
        {
          delay: 2500,
          html: '<div class="tc-out-info">→ Bac Pro CIEL 2023–2026</div>',
        },
        {
          delay: 2900,
          html: '<div class="tc-out-info">→ Rivesaltes, France (66)</div>',
        },
        {
          delay: 3400,
          html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> ping -c 3 recruteur.local</span></div>',
        },
        {
          delay: 4200,
          html: '<div class="tc-out-ok">64 bytes from recruteur.local: icmp_seq=1 time=0.1ms</div>',
        },
        {
          delay: 4600,
          html: '<div class="tc-out-ok">64 bytes from recruteur.local: icmp_seq=2 time=0.1ms</div>',
        },
        {
          delay: 5000,
          html: '<div class="tc-out-ok">3 packets transmitted, 3 received, 0% loss</div>',
        },
        {
          delay: 5600,
          html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span class="tc-cmd"> ls skills/</span></div>',
        },
        {
          delay: 6300,
          html: '<div class="tc-out-dim">réseaux/&nbsp;&nbsp;cybersécurité/&nbsp;&nbsp;hardware/&nbsp;&nbsp;linux/</div>',
        },
        {
          delay: 6800,
          html: '<div class="tc-line"><span class="tc-prompt">fp@portfolio:~$</span><span id="tc-cursor-line"></span></div>',
        },
      ];
      seq.forEach((s) => {
        setTimeout(() => {
          hero.insertAdjacentHTML("beforeend", s.html);
          hero.scrollTop = hero.scrollHeight;
        }, s.delay);
      });
      setTimeout(() => {
        const cl = document.getElementById("tc-cursor-line");
        if (cl)
          cl.insertAdjacentHTML("afterend", '<span class="tc-cursor"></span>');
      }, 6900);
    }

    // Initial animation for home page
    setTimeout(() => {
      document.querySelectorAll('#pg-home .f').forEach((el, i) => {
        setTimeout(() => (el as HTMLElement).classList.add('in'), i * 90);
      });
    }, 80);
  }, []);

  return (
    <>
      <canvas ref={c3dRef} id="c3d"></canvas>
      <canvas ref={cNetRef} id="c-net"></canvas>
      <canvas ref={cBinRef} id="c-bin"></canvas>

      <nav className="nav">
        <div className="logo" onClick={() => go("home")}>
          fp<span>@portfolio</span>:~$
        </div>
        <ul className="nav-links">
          <li>
            <a
              id="nl-home"
              className={currentPage === "home" ? "on" : ""}
              onClick={() => go("home")}
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              id="nl-about"
              className={currentPage === "about" ? "on" : ""}
              onClick={() => go("about")}
            >
              À propos
            </a>
          </li>
          <li>
            <a
              id="nl-exp"
              className={currentPage === "exp" ? "on" : ""}
              onClick={() => go("exp")}
            >
              Expérience
            </a>
          </li>
          <li>
            <a
              id="nl-projects"
              className={currentPage === "projects" ? "on" : ""}
              onClick={() => go("projects")}
            >
              Projets
            </a>
          </li>
          <li>
            <a
              id="nl-contact"
              className={currentPage === "contact" ? "on" : ""}
              onClick={() => go("contact")}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <Home className={currentPage === "home" ? "pg show" : "pg"} go={go} />
      <About className={currentPage === "about" ? "pg show" : "pg"} />
      <Experience className={currentPage === "exp" ? "pg show" : "pg"} />
      <Projects
        className={currentPage === "projects" ? "pg show" : "pg"}
      />
      <Contact className={currentPage === "contact" ? "pg show" : "pg"} />
    </>
  );
}
