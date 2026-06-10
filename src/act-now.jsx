import React from "react";
import ReactDOM from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import PageTransition from "./components/motion/PageTransition";
import SoftAurora from "./components/react-bits/SoftAurora";
import ThemeToggle from "./components/theme/ThemeToggle";
import { actNowContent } from "./pages/actNowData";
import { siteNavItems, tenActNowActions } from "./pages/siteData";
import "./react.css";

const motionEase = [0.23, 1, 0.32, 1];

function fadeUp(shouldReduceMotion, delay = 0) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: motionEase, delay } },
  };
}

function ActNowHub() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition transitionKey="act-now-hub" shouldReduceMotion={shouldReduceMotion}>
      <main className="aurora-landing relative min-h-dvh overflow-x-clip bg-[#06060f] text-white">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 opacity-70" style={{ transform: "scale(1.1)" }}>
            <SoftAurora speed={0.6} scale={1.5} brightness={1.05} color1="#e0e7ff" color2="#6366f1" noiseFrequency={2.5} noiseAmplitude={1} bandHeight={0.5} bandSpread={1} octaveDecay={0.1} layerOffset={0.8} colorSpeed={1} />
          </div>
          <div className="hero-starfield hero-starfield-far pointer-events-none absolute inset-0" />
          <div className="hero-starfield hero-starfield-near pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(99,102,241,0.16)_0%,rgba(56,189,248,0.07)_22%,transparent_48%),radial-gradient(circle_at_50%_68%,rgba(129,140,248,0.07)_0%,transparent_42%),radial-gradient(circle_at_50%_50%,transparent_0%,rgba(6,6,15,0.32)_48%,rgba(6,6,15,0.92)_100%)]" />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen" />
        </div>

        <motion.header initial="hidden" animate="show" variants={fadeUp(shouldReduceMotion)} className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between border-b border-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/64 sm:px-10 sm:py-4 sm:text-xs lg:px-12">
          <div className="flex items-center gap-6">
            <a href="./index.html" className="text-white/90 transition hover:text-white">Bruniverse</a>
            <nav className="hidden items-center gap-5 text-white/58 lg:flex lg:gap-7">
              {siteNavItems.map((item) => <a key={item.href} className="whitespace-nowrap transition hover:text-sky-100" href={item.href}>{item.label}</a>)}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-right text-sky-100/76 sm:inline">VBE 1014</span>
            <ThemeToggle />
          </div>
        </motion.header>

        <div className="relative z-10">
          <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-28 lg:px-12 lg:pt-32 lg:pb-36">
            <div className="mx-auto max-w-6xl">
              <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } } }} className="grid gap-8">
                <motion.p variants={fadeUp(shouldReduceMotion)} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Instruction 4</motion.p>
                <motion.h1 variants={fadeUp(shouldReduceMotion)} className="text-[clamp(3.6rem,8vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.04em] [text-wrap:balance]">
                  {actNowContent.title}
                </motion.h1>
                <motion.p variants={fadeUp(shouldReduceMotion)} className="max-w-[680px] text-xl font-medium leading-[1.45] text-white/68 sm:text-2xl">
                  {actNowContent.subtitle}
                </motion.p>
              </motion.div>
            </div>
          </section>

          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <div className="grid gap-32 sm:gap-40">
              {/* Carbon Footprint Definition */}
              <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Understanding Carbon Footprint</p>
                <motion.p variants={fadeUp(shouldReduceMotion)} className="max-w-[720px] text-lg font-medium leading-[1.5] text-white/72 sm:text-xl">
                  {actNowContent.carbonFootprint}
                </motion.p>
              </motion.section>

              {/* Ten actions */}
              <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}>
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">The UN Ten Actions</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  {tenActNowActions.map((action, i) => (
                    <motion.div key={action} variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <p className="font-mono text-xs font-bold tabular-nums text-white/24">{String(i + 1).padStart(2, "0")}</p>
                      <p className="mt-5 text-sm font-bold leading-5 text-white/70">{action}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Action cards */}
              <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Selected action reports</p>
                <div className="grid gap-8 md:grid-cols-2">
                  {actNowContent.actions.map((a, i) => (
                    <motion.a
                      key={i}
                      variants={fadeUp(shouldReduceMotion)}
                      href={i === 0 ? "./act-now-transport.html" : "./act-now-4r.html"}
                      className="group rounded-2xl bg-white/[0.02] p-8 transition hover:bg-white/[0.04] sm:p-10"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">{a.member} · {a.sdg}</p>
                      <h3 className="mt-4 text-2xl font-extrabold leading-[1.1] text-white transition group-hover:text-white/90 sm:text-3xl">
                        {a.action}
                      </h3>
                      <p className="mt-4 text-sm leading-[1.6] text-white/48 line-clamp-3">
                        {a.explanation.slice(0, 200)}...
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/35 transition group-hover:text-white/60">
                        View full action <span>&rarr;</span>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.section>

              {/* References */}
              <motion.section id="references" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}>
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">References</p>
                <ol className="max-w-[800px] space-y-4 text-sm leading-relaxed text-white/44 [counter-reset:ref]">
                  {actNowContent.references.map((ref, i) => (
                    <motion.li key={i} variants={fadeUp(shouldReduceMotion)} className="flex gap-4 [counter-increment:ref] before:content-[counter(ref,decimal-leading-zero)] before:shrink-0 before:font-mono before:text-xs before:font-bold before:text-white/18">
                      <span>{ref}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.section>
            </div>
          </div>

          <footer className="mx-auto mt-36 max-w-6xl border-t border-white/[0.05] px-6 py-10 sm:mt-44 sm:px-10 sm:py-12 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/24">SDG Intelligence Hub &mdash; VBE 1014</p>
              <p className="text-xs font-medium text-white/20">Educational content. Verify against UN official sources for research use.</p>
            </div>
          </footer>
        </div>
      </main>
    </PageTransition>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><ActNowHub /></React.StrictMode>);
