import { motion, useReducedMotion } from "framer-motion";
import PageTransition from "../components/motion/PageTransition";
import { HashScroll } from "./AssessmentLayout";
import SoftAurora from "../components/react-bits/SoftAurora";
import ThemeToggle from "../components/theme/ThemeToggle";
import CarbonFootprintCalculator from "../components/calculator/CarbonFootprintCalculator";
import { siteNavItems } from "./siteData";
import "../react.css";

const motionEase = [0.23, 1, 0.32, 1];

function fadeUp(shouldReduceMotion, delay = 0) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: motionEase, delay } },
  };
}

export default function ActionPage({ data }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition transitionKey={data.id} shouldReduceMotion={shouldReduceMotion}>
      <main className="aurora-landing relative min-h-dvh overflow-x-clip bg-[#06060f] text-white">
        <HashScroll />
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
          {/* Hero */}
          <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-28 lg:px-12 lg:pt-32 lg:pb-36">
            <div className="mx-auto max-w-6xl">
              <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } } }} className="grid gap-8">
                <motion.p variants={fadeUp(shouldReduceMotion)} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                  {data.member} · {data.sdg}
                </motion.p>
                <motion.h1 variants={fadeUp(shouldReduceMotion)} className="text-[clamp(2.8rem,7vw,4.8rem)] font-extrabold leading-[0.92] tracking-[-0.04em] [text-wrap:balance]">
                  {data.action}
                </motion.h1>
                <motion.p variants={fadeUp(shouldReduceMotion)} className="max-w-[640px] text-xl font-medium leading-[1.45] text-white/68 sm:text-2xl">
                  {data.explanation.slice(0, 200)}...
                </motion.p>
              </motion.div>
            </div>
          </section>

          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <div className="grid gap-32 sm:gap-40">
              {/* Action details */}
              <motion.section id="action-detail" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                {/* Full explanation + image */}
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16">
                  <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30">Purpose of this action</p>
                      <p className="mt-4 text-base font-medium leading-[1.6] text-white/70">{data.explanation}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="overflow-hidden rounded-lg">
                        <img src={data.image} alt={data.action} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/20">{data.imageCaption}</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16 max-w-[720px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/35">How it works</p>
                  <p className="mt-3 text-sm font-medium leading-[1.7] text-white/62">{data.mechanism}</p>
                </motion.div>

                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16 max-w-[720px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/35">In practice</p>
                  <p className="mt-3 text-sm font-medium leading-[1.7] text-white/62">{data.example}</p>
                </motion.div>

                {/* Co-benefits */}
                <div className="mb-16">
                  <p className="mb-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/28">Co-benefits</p>
                  <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {data.coBenefits.map((benefit, i) => (
                      <motion.div key={i} variants={fadeUp(shouldReduceMotion)} className="flex gap-5">
                        <span className="shrink-0 mt-0.5 font-mono text-sm font-bold tabular-nums text-white/30">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <h4 className="text-sm font-bold text-white/74">{benefit.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-white/48">{benefit.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Carbon offset solutions */}
              {data.offsetSolutions && data.offsetSolutions.length > 0 && (
                <motion.section id="offset-solutions" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                  <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Carbon offset solutions</p>
                  <motion.p variants={fadeUp(shouldReduceMotion)} className="mb-12 max-w-[720px] text-base font-medium leading-[1.6] text-white/58">
                    These three responses compensate for unavoidable emissions connected to the selected action while also changing the daily behaviour that created the footprint.
                  </motion.p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {data.offsetSolutions.map((solution, i) => (
                      <motion.article key={solution.title} variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
                        <p className="font-mono text-xs font-bold tabular-nums text-white/24">{String(i + 1).padStart(2, "0")}</p>
                        <h3 className="mt-6 text-xl font-extrabold leading-tight text-white">{solution.title}</h3>
                        <p className="mt-4 text-sm font-medium leading-6 text-white/56">{solution.desc}</p>
                        <div className="mt-7 border-t border-white/10 pt-5">
                          <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-sky-100/20 bg-sky-100/[0.07] text-sm font-extrabold text-sky-100/78">
                              JH
                            </div>
                            <p className="text-xs font-medium leading-5 text-white/32">{solution.evidence}</p>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Calculator */}
              <motion.section id="calculator" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">Carbon Footprint Calculator</p>
                {data.calculator.description && (
                  <motion.p variants={fadeUp(shouldReduceMotion)} className="mb-14 max-w-[640px] text-base font-medium leading-[1.55] text-white/54">
                    {data.calculator.description}
                  </motion.p>
                )}
                {data.calculator.calculatorImage && (
                  <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16">
                    <div className="inline-block overflow-hidden rounded-lg">
                      <img src={data.calculator.calculatorImage} alt="Carbon Footprint Calculator" className="max-h-[420px] w-full object-contain" loading="lazy" />
                    </div>
                    <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-white/18">Source: United Nations online platform for voluntary cancellation of certified emission reductions (CERs)</span>
                  </motion.div>
                )}
                <CarbonFootprintCalculator staticData={data.calculator} />

                {/* Screenshot evidence */}
                {data.calculator.screenshots && data.calculator.screenshots.length > 0 && (
                  <div className="mt-16">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/28">Calculator process — step-by-step screenshots</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {data.calculator.screenshots.map((src, i) => (
                        <motion.div key={i} variants={fadeUp(shouldReduceMotion)} className="overflow-hidden rounded-lg bg-white/[0.02]">
                          <img src={src} alt={`Screenshot step ${i + 1}`} className="aspect-[16/10] w-full object-contain" loading="lazy" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.08em] text-white/18">
                      Source: United Nations online platform for voluntary cancellation of certified emission reductions (CERs)
                    </p>
                  </div>
                )}
              </motion.section>

              {/* References */}
              <motion.section id="references" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}>
                <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">References</p>
                <ol className="max-w-[800px] space-y-4 text-sm leading-relaxed text-white/44 [counter-reset:ref]">
                  {data.references.map((ref, i) => (
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
