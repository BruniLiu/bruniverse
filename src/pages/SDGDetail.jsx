import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../components/motion/PageTransition";
import { HashScroll } from "./AssessmentLayout";
import SoftAurora from "../components/react-bits/SoftAurora";
import ThemeToggle from "../components/theme/ThemeToggle";
import { sdgDetails } from "./sdgData";
import { siteNavItems } from "./siteData";
import CarbonFootprintCalculator from "../components/calculator/CarbonFootprintCalculator";
import "../react.css";

const motionEase = [0.23, 1, 0.32, 1];

function fadeUp(shouldReduceMotion, delay = 0) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: motionEase, delay },
    },
  };
}

function SDGDetailPage({ sdgId }) {
  const shouldReduceMotion = useReducedMotion();
  const sdg = sdgDetails[sdgId];
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: contentRef, offset: ["start start", "end end"] });
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!sdg) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#06060f] text-white">
        <p>SDG not found.</p>
      </div>
    );
  }

  return (
    <PageTransition transitionKey={`sdg-${sdgId}`} shouldReduceMotion={shouldReduceMotion}>
      <main className="aurora-landing relative min-h-dvh overflow-x-clip bg-[#06060f] text-white">
        <HashScroll />
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 opacity-70" style={{ transform: "scale(1.1)" }}>
            <SoftAurora
              speed={0.6} scale={1.5} brightness={1.05}
              color1="#e0e7ff" color2="#6366f1"
              noiseFrequency={2.5} noiseAmplitude={1}
              bandHeight={0.5} bandSpread={1}
              octaveDecay={0.1} layerOffset={0.8} colorSpeed={1}
            />
          </div>
          <div className="hero-starfield hero-starfield-far pointer-events-none absolute inset-0" />
          <div className="hero-starfield hero-starfield-near pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(99,102,241,0.16)_0%,rgba(56,189,248,0.07)_22%,transparent_48%),radial-gradient(circle_at_50%_68%,rgba(129,140,248,0.07)_0%,transparent_42%),radial-gradient(circle_at_50%_50%,transparent_0%,rgba(6,6,15,0.32)_48%,rgba(6,6,15,0.92)_100%)]" />
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen" />
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400"
          style={{ scaleX: progressBar }}
        />

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="show"
          variants={fadeUp(shouldReduceMotion)}
          className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/64 sm:px-8 sm:py-4 sm:text-xs lg:px-10"
        >
          <div className="flex items-center gap-6">
            <a href="./index.html" className="text-white/90 transition hover:text-white">
              Bruniverse
            </a>
            <nav className="hidden items-center gap-5 text-white/58 lg:flex lg:gap-7">
              {siteNavItems.map((item) => (
                <a key={item.href} className="whitespace-nowrap transition hover:text-sky-100" href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-right text-sky-100/76 sm:inline">VBE 1014</span>
            <ThemeToggle />
          </div>
        </motion.header>

        <div ref={contentRef} className="relative z-10">

          {/* ── HERO ── */}
          <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:px-10 sm:pt-24 sm:pb-32 lg:px-12 lg:pt-32 lg:pb-40">
            {/* SDG-themed gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(52,211,153,0.08)_0%,rgba(16,185,129,0.03)_30%,transparent_60%)]" />
            {/* Giant decorative SDG number */}
            <div className="pointer-events-none absolute right-[-4%] top-1/2 -translate-y-1/2 select-none text-[28vw] font-bold leading-none text-white/[0.015] sm:text-[22vw] lg:text-[18vw]">
              {sdgId}
            </div>

            <div className="mx-auto max-w-6xl">
              <div className="grid gap-14 lg:grid-cols-[1fr_0.5fr] lg:gap-20">
                {/* Left: title + description */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } } }}
                  className="grid gap-8"
                >
                  <motion.p
                    variants={fadeUp(shouldReduceMotion)}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
                  >
                    {sdg.number}
                  </motion.p>
                  <motion.h1
                    variants={fadeUp(shouldReduceMotion)}
                    className="text-[clamp(3.6rem,8vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.04em] [text-wrap:balance]"
                  >
                    {sdg.title}
                  </motion.h1>
                  <motion.p
                    variants={fadeUp(shouldReduceMotion)}
                    className="max-w-[560px] text-xl font-medium leading-[1.45] text-white/68 sm:text-2xl"
                  >
                    {sdg.subtitle}
                  </motion.p>
                </motion.div>

                {/* Right: quick stats */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { delayChildren: 0.28, staggerChildren: 0.08 } } }}
                  className="flex flex-col justify-end gap-5"
                >
                  {[
                    { label: "Targets", value: sdg.targets.length.toString() },
                    { label: "Global Goals", value: "17" },
                    { label: "Deadline", value: "2030" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeUp(shouldReduceMotion)}
                      className="flex items-baseline gap-5"
                    >
                      <span className="text-5xl font-extrabold tabular-nums leading-none text-white sm:text-6xl">
                        {stat.value}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── MAIN CONTENT: Two-column with sidebar ── */}
          <div id="content" className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
            <div className="grid gap-0 lg:grid-cols-[220px_1fr] lg:gap-16 xl:grid-cols-[260px_1fr]">

              {/* Sticky sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-32 grid gap-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/28">
                    On this page
                  </p>
                  <nav className="grid gap-2.5 text-sm font-medium text-white/40">
                    {[
                      { label: "Overview", id: "overview" },
                      { label: "Targets", id: "targets" },
                      { label: "Key facts", id: "key-facts" },
                      { label: "Connections", id: "connections" },
                      ...(sdg.richSections || []).map((s) => ({ label: s.label, id: s.id })),
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="transition hover:text-white/75"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-6 border-t border-white/[0.05] pt-6">
                    <a
                      href="./chat.html"
                      className="block rounded-full bg-white px-5 py-2.5 text-center text-xs font-semibold text-black transition hover:bg-white/90"
                    >
                      Ask Unknown
                    </a>
                  </div>
                </div>
              </aside>

              {/* Content area */}
              <div className="grid gap-32 sm:gap-40">

                {/* Overview */}
                <motion.section
                  id="overview"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-120px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                >
                  <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    Overview
                  </p>
                  <motion.p
                    variants={fadeUp(shouldReduceMotion)}
                    className="max-w-[680px] text-xl font-medium leading-[1.5] text-white/82 sm:text-2xl"
                  >
                    {sdg.overview}
                  </motion.p>
                </motion.section>

                {/* Targets — vertical timeline */}
                <motion.section
                  id="targets"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-120px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                >
                  <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    Targets
                  </p>

                  <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/[0.06]" />
                    <div className="grid gap-6">
                      {sdg.targets.map((target, i) => (
                        <motion.div
                          key={i}
                          variants={fadeUp(shouldReduceMotion)}
                          className="group relative grid grid-cols-[28px_1fr] gap-5 sm:grid-cols-[32px_1fr] sm:gap-8"
                        >
                          <div className="relative flex justify-center">
                            <div className="relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full bg-white/20 transition group-hover:scale-125 group-hover:bg-white/40" />
                          </div>
                          <div className="pb-1">
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-2 text-sm font-medium leading-[1.6] text-white/76 sm:text-base">
                              {target}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Facts — asymmetric grid */}
                <motion.section
                  id="key-facts"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-120px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                >
                  <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    Key facts
                  </p>

                  <div className="grid gap-x-10 gap-y-10 sm:grid-cols-6">
                    {sdg.facts.map((fact, i) => {
                      const spans = [
                        "sm:col-span-3",
                        "sm:col-span-3",
                        "sm:col-span-2",
                        "sm:col-span-4",
                        "sm:col-span-6",
                      ];
                      return (
                        <motion.div
                          key={i}
                          variants={fadeUp(shouldReduceMotion)}
                          className={`${spans[i]}`}
                        >
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/25">
                            0{i + 1}
                          </span>
                          <p className="mt-4 text-sm font-medium leading-[1.6] text-white/72 sm:text-base">
                            {fact}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>

                {/* Connections */}
                <motion.section
                  id="connections"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-120px" }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                >
                  <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                    Connections
                  </p>

                  <motion.div variants={fadeUp(shouldReduceMotion)}>
                    <p className="max-w-[680px] text-base font-medium leading-[1.6] text-white/64 sm:text-lg">
                      {sdg.connections}
                    </p>
                  </motion.div>
                </motion.section>
              </div>
            </div>
          </div>

          {/* ── RICH SECTIONS ── */}
          {sdg.richSections && sdg.richSections.map((section) => {
            // ── Challenges ──
            if (section.type === "challenges") {
              return (
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-36 sm:mt-44"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>
                    {section.intro && (
                      <motion.p
                        variants={fadeUp(shouldReduceMotion)}
                        className="mb-20 max-w-[720px] text-base font-medium leading-[1.6] text-white/58"
                      >
                        {section.intro}
                      </motion.p>
                    )}

                    <div className="space-y-28">
                      {section.challenges.map((challenge, i) => (
                        <motion.div key={i} variants={fadeUp(shouldReduceMotion)}>
                          <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
                            <div>
                              <div className="mb-6 flex items-baseline gap-5">
                                <span className="shrink-0 font-mono text-5xl font-extrabold tabular-nums leading-none text-white/[0.08] sm:text-6xl">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-2xl font-extrabold leading-[1.08] text-white sm:text-3xl">
                                  {challenge.title}
                                </h3>
                              </div>
                              <p className="text-sm font-medium leading-[1.7] text-white/68 sm:text-base">
                                {challenge.content}
                              </p>
                            </div>
                            <div className="flex flex-col gap-3">
                              <div className="overflow-hidden rounded-lg">
                                <img
                                  src={challenge.image}
                                  alt={challenge.title}
                                  className="aspect-[4/3] w-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/20">
                                {challenge.imageCaption}
                              </span>
                              {challenge.secondaryImage && (
                                <>
                                  <div className="mt-2 overflow-hidden rounded-lg">
                                    <img
                                      src={challenge.secondaryImage}
                                      alt=""
                                      className="aspect-[4/3] w-full object-cover"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/20">
                                    {challenge.secondaryCaption}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {i < section.challenges.length - 1 && (
                            <div className="mt-28 h-px bg-white/[0.04]" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </section>
              );
            }

            // ── Content ──
            if (section.type === "content") {
              return (
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-36 sm:mt-44"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>
                    <motion.div variants={fadeUp(shouldReduceMotion)} className="max-w-[720px]">
                      <p className="text-lg font-medium leading-[1.5] text-white/72 sm:text-xl">
                        {section.content}
                      </p>
                    </motion.div>
                  </motion.div>
                </section>
              );
            }

            // ── Action ──
            if (section.type === "action") {
              return (
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-36 sm:mt-44"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>

                    <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16">
                      <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                            Recommended action
                          </p>
                          <h3 className="mt-4 text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl">
                            {section.action}
                          </h3>
                          <p className="mt-6 max-w-[620px] text-base font-medium leading-[1.6] text-white/70">
                            {section.explanation}
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-lg">
                            <img
                              src={section.image}
                              alt={section.action}
                              className="aspect-[4/3] w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/20">
                            {section.imageCaption}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16 max-w-[720px]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
                        How it works
                      </p>
                      <p className="mt-3 text-sm font-medium leading-[1.7] text-white/58">
                        {section.mechanism}
                      </p>
                    </motion.div>

                    {section.example && (
                      <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16 max-w-[720px]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
                          In practice
                        </p>
                        <p className="mt-3 text-sm font-medium leading-[1.7] text-white/58">
                          {section.example}
                        </p>
                      </motion.div>
                    )}

                    {section.coBenefits && (
                      <>
                        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/28">
                          Co-benefits
                        </p>
                        <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                          {section.coBenefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              variants={fadeUp(shouldReduceMotion)}
                              className="flex gap-5"
                            >
                              <span className="shrink-0 mt-0.5 font-mono text-sm font-bold tabular-nums text-white/30">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-white/74">
                                  {benefit.title}
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-white/48">
                                  {benefit.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="mt-28 h-px bg-white/[0.04]" />
                  </motion.div>
                </section>
              );
            }

            // ── Calculator ──
            if (section.type === "calculator") {
              return (
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-36 sm:mt-44"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>

                    {section.description && (
                      <motion.p
                        variants={fadeUp(shouldReduceMotion)}
                        className="mb-14 max-w-[640px] text-base font-medium leading-[1.55] text-white/54"
                      >
                        {section.description}
                      </motion.p>
                    )}

                    {section.calculatorImage && (
                      <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16">
                        <div className="inline-block overflow-hidden rounded-lg">
                          <img
                            src={section.calculatorImage}
                            alt="Carbon Footprint Calculator"
                            className="max-h-[420px] w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-white/18">
                          Source: United Nations online platform for voluntary cancellation of certified emission reductions (CERs)
                        </span>
                      </motion.div>
                    )}

                    <CarbonFootprintCalculator staticData={section} />
                  </motion.div>
                </section>
              );
            }

            // ── References ──
            if (section.type === "references") {
              return (
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
                    className="mt-36 sm:mt-44"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>

                    <ol className="max-w-[800px] space-y-4 text-sm leading-relaxed text-white/44 [counter-reset:ref]">
                      {section.references.map((ref, i) => (
                        <motion.li
                          key={i}
                          variants={fadeUp(shouldReduceMotion)}
                          className="flex gap-4 [counter-increment:ref] before:content-[counter(ref,decimal-leading-zero)] before:shrink-0 before:font-mono before:text-xs before:font-bold before:text-white/18"
                        >
                          <span>{ref}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                </section>
              );
            }

            return null;
          })}

          {/* ── CTA ── */}
          <section className="mx-auto mt-36 max-w-6xl px-6 sm:mt-44 sm:px-10 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="rounded-3xl bg-white/[0.03] px-8 py-14 sm:px-12 sm:py-16"
            >
              <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
                <motion.div variants={fadeUp(shouldReduceMotion)} className="grid gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                    Continue exploring
                  </p>
                  <h2 className="text-3xl font-extrabold leading-[1.06] tracking-[-0.02em] text-white sm:text-4xl">
                    Explore {sdg.title.toLowerCase()}.
                  </h2>
                  <p className="text-base font-medium leading-relaxed text-white/46 sm:text-lg">
                    Ask Unknown, browse datasets, or explore all 17 goals.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp(shouldReduceMotion)} className="flex flex-wrap gap-3">
                  <a
                    href="./chat.html"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Ask Unknown
                  </a>
                  <a
                    href="./index.html#explore-sdgs"
                    className="rounded-full bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                  >
                    All SDGs
                  </a>
                  <a
                    href="./index.html#dataset-hub"
                    className="rounded-full bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
                  >
                    Datasets
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ── Footer ── */}
          <footer className="mx-auto mt-36 max-w-6xl border-t border-white/[0.05] px-6 py-10 sm:mt-44 sm:px-10 sm:py-12 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/24">
                SDG Intelligence Hub &mdash; VBE 1014
              </p>
              <p className="text-xs font-medium text-white/20">
                Educational content. Verify against UN official sources for research use.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </PageTransition>
  );
}

export default SDGDetailPage;
