"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";

const SERVICES = [
  { icon: "/assets/icon-haveordning.svg",  title: "Haveordning",  body: "Fast aftale året rundt. Vi holder haven, så du ikke skal tænke på den.",           href: "/services/haveordning" },
  { icon: "/assets/icon-haekklipning.svg", title: "Hækklipning",  body: "Bøg, liguster, thuja. Vi klipper, samler op og kører væk.",                       href: "/services/haekklipning" },
  { icon: "/assets/icon-fliserens.svg",    title: "Fliserens",    body: "Højtryk og blødt kemi. Terrassen ser ud som ny igen.",                             href: "/services/fliserens" },
  { icon: "/assets/icon-vinduesrens.svg",  title: "Vinduesrens",  body: "Indvendigt og udvendigt. Karme tørres af. Ingen striber.",                         href: "/services/vinduesrens" },
  { icon: "/assets/icon-snerydning.svg",   title: "Snerydning",   body: "Sæsonaftale eller akut. Saltning og rydning før morgentrafikken.",                 href: "/services/snerydning" },
  { icon: "/assets/icon-mappin.svg",       title: "Andet?",       body: "Har du en opgave, der ikke passer i boksene? Skriv til os, så kigger vi på det.",  href: "/kontakt" },
];

const ICON_FILTER = "brightness(0) saturate(100%) invert(31%) sepia(15%) saturate(1234%) hue-rotate(85deg) brightness(95%) contrast(86%)";

export function ServiceTour() {
  return (
    <MotionConfig reducedMotion="user">
      <section style={{ padding: "120px 0", background: "var(--cream)" }} id="ydelser">
        <div className="sttour">
          {/* Venstre kolonne følger med mens kortene ruller forbi */}
          <div className="sttour-intro">
            <div className="sttour-sticky">
              <span className="stb-eyebrow">Det vi laver</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, letterSpacing: "-0.015em", color: "var(--forest)", margin: "0 0 16px", lineHeight: 1.05 }}>
                Fem ydelser.<br />Og alt det løse.
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--bark)", maxWidth: 380, margin: "0 0 24px" }}>
                Vælg en enkelt opgave, eller saml dem i en haveordning, så det hele kører af sig selv.
              </p>
              <Link href="/kontakt" className="stb stb-ghost">Få et tilbud</Link>
            </div>
          </div>

          <div className="sttour-cards">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={s.href} className="sttour-card">
                  <Image src={s.icon} alt="" width={34} height={34} style={{ filter: ICON_FILTER, flex: "none" }} />
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                  <span className="sttour-arrow" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          .sttour { max-width: var(--container-max); margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; }
          .sttour-intro { align-self: stretch; }
          .sttour-sticky { position: sticky; top: 130px; }
          .sttour-cards { display: flex; flex-direction: column; gap: 14px; }
          .sttour-card { display: flex; align-items: flex-start; gap: 20px; background: var(--bone); border-radius: var(--radius-lg); padding: 26px 28px; box-shadow: var(--shadow-card); text-decoration: none; color: var(--bark); position: relative; transition: transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1); }
          .sttour-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lifted); }
          .sttour-card h3 { font-family: var(--font-display); font-size: 23px; font-weight: 600; color: var(--forest); margin: 0 0 6px; letter-spacing: -0.01em; }
          .sttour-card p { font-size: 15px; line-height: 1.5; color: var(--bark); margin: 0; }
          .sttour-arrow { margin-left: auto; align-self: center; color: var(--hedge); opacity: 0; transform: translateX(-6px); transition: opacity 240ms cubic-bezier(0.22,1,0.36,1), transform 240ms cubic-bezier(0.22,1,0.36,1); }
          .sttour-card:hover .sttour-arrow { opacity: 1; transform: translateX(0); }
          @media (max-width: 880px) {
            .sttour { grid-template-columns: 1fr; gap: 32px; }
            .sttour-sticky { position: static; }
            .sttour-arrow { display: none; }
          }
        `}</style>
      </section>
    </MotionConfig>
  );
}
