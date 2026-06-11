import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import { Globe3D } from "@/components/ui/3d-globe";
import PageTransition from "./components/motion/PageTransition";
import ThemeToggle from "./components/theme/ThemeToggle";
import { allSdgGoals, apaReferences, sdgAgenda, teamMembers, tenActNowActions } from "./pages/siteData";
import "./react.css";

const motionEase = [0.23, 1, 0.32, 1];

function revealVariant(shouldReduceMotion, distance = 18, scale = 0.985) {
  return {
    hidden: {
      opacity: 0,
      transform: shouldReduceMotion
        ? "translate3d(0, 0, 0) scale(1)"
        : `translate3d(0, ${distance}px, 0) scale(${scale})`,
    },
    show: {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1)",
      transition: {
        duration: shouldReduceMotion ? 0.18 : 0.56,
        ease: motionEase,
      },
    },
  };
}

function staggerVariant(shouldReduceMotion, stagger = 0.07, delay = 0.04) {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : delay,
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      },
    },
  };
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "SDG 17 Goals", href: "./sdg-goals.html" },
  { label: "Asking", href: "#asking" },
  { label: "Dataset Hub", href: "#dataset-hub" },
  { label: "SDG Act Now", href: "./act-now.html" },
  { label: "About Us", href: "./about-us.html" },
  { label: "Join Us", href: "#join-us" },
  { label: "Reference List", href: "./reference-list.html" },
];

const platformFeatures = [
  {
    title: "Learn SDGs",
    copy: "Introduce the 17 Sustainable Development Goals and explain their global importance.",
    accent: "from-sky-300/24 to-blue-500/10",
  },
  {
    title: "Asking",
    copy: "Ask educational AI characters inspired by public SDG advocacy themes.",
    accent: "from-cyan-300/22 to-teal-400/10",
  },
  {
    title: "Dataset Hub",
    copy: "Access curated datasets for education, climate, health, inequality, and sustainability research.",
    accent: "from-indigo-300/22 to-sky-500/10",
  },
  {
    title: "SDG Act Now",
    copy: "Calculate carbon footprint and explore practical actions to reduce emissions.",
    accent: "from-emerald-300/22 to-cyan-500/10",
  },
];

const sdgWheelColors = [
  "#E5243B",
  "#DDA63A",
  "#4C9F38",
  "#C5192D",
  "#FF3A21",
  "#26BDE2",
  "#FCC30B",
  "#A21942",
  "#FD6925",
  "#DD1367",
  "#FD9D24",
  "#BF8B2E",
  "#3F7E44",
  "#0A97D9",
  "#56C02B",
  "#00689D",
  "#19486A",
];

const selectedGoals = [
  {
    number: "SDG 4",
    title: "Quality Education",
    copy: "Advance inclusive learning opportunities that help communities build long-term resilience.",
    href: "./sdg-4.html",
  },
  {
    number: "SDG 13",
    title: "Climate Action",
    copy: "Understand climate risks, mitigation choices, and adaptation pathways for a warming planet.",
    href: "./sdg-13.html",
  },
  {
    number: "SDG 2",
    title: "Zero Hunger",
    copy: "Study food security, sustainable agriculture, and how reducing waste protects shared resources.",
    href: "./sdg-2.html",
  },
  {
    number: "SDG 16",
    title: "Peace, Justice and Strong Institutions",
    copy: "Connect justice, accountable institutions, and peacebuilding to sustainable development.",
    href: "./sdg-16.html",
  },
];

const aiVoices = [
  {
    title: "Education Advocate AI",
    sdg: "Related SDG: 4",
    question: "How can schools reduce inequality while improving learning outcomes?",
  },
  {
    title: "Climate Action AI",
    sdg: "Related SDG: 13",
    question: "What climate actions are realistic for a university community?",
  },
  {
    title: "Food Security AI",
    sdg: "Related SDG: 2",
    question: "How can students reduce food waste while supporting food security?",
  },
  {
    title: "Peace and Justice AI",
    sdg: "Related SDG: 16",
    question: "Why do strong institutions matter for sustainable development?",
  },
];

const datasetCategories = [
  {
    title: "Education Data",
    copy: "Indicators for access, attainment, digital learning, literacy, and educational equity.",
  },
  {
    title: "Climate Data",
    copy: "Emissions, temperature, energy, disaster risk, and adaptation datasets for climate inquiry.",
  },
  {
    title: "Food Security Data",
    copy: "Hunger, nutrition, food waste, agriculture, and food-system resilience indicators.",
  },
  {
    title: "Inequality and Justice Data",
    copy: "Data sources on poverty, gender equity, governance, institutional trust, and social outcomes.",
  },
  {
    title: "General SDG Data Portals",
    copy: "Cross-goal portals for comparing indicators across regions, themes, and timelines.",
  },
];

function SectionShell({
  id,
  eyebrow,
  title,
  copy,
  children,
  className = "",
  shouldReduceMotion,
  sectionGroup,
  sectionReveal,
}) {
  return (
    <section
      id={id}
      className={`relative z-10 px-5 py-18 sm:px-8 sm:py-24 lg:px-10 lg:py-28 ${className}`}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-90px" }}
        variants={sectionGroup}
        className="mx-auto max-w-7xl"
      >
        <motion.div
          variants={sectionReveal}
          className="mb-10 max-w-3xl sm:mb-12"
        >
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/68">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-white [text-wrap:pretty] sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {copy && (
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/62 [text-wrap:pretty] sm:text-base">
              {copy}
            </p>
          )}
        </motion.div>
        {children}
      </motion.div>
    </section>
  );
}

function GlassCard({ children, className = "", variants, shouldReduceMotion }) {
  return (
    <motion.article
      variants={variants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              transform: "translate3d(0, -4px, 0)",
              transition: { duration: 0.2, ease: motionEase },
            }
      }
      className={`apple-card relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition duration-300 hover:border-sky-100/24 hover:bg-white/[0.065] ${className}`}
    >
      {children}
    </motion.article>
  );
}

function CardLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="apple-card-link mt-6 inline-flex w-fit rounded-lg border border-white/16 bg-white/[0.055] px-4 py-2 text-xs font-semibold uppercase text-sky-100/86 transition hover:border-sky-100/34 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
    >
      {children}
    </a>
  );
}

function SdgColourWheel() {
  const segment = 360 / sdgWheelColors.length;
  const gradient = sdgWheelColors
    .map((color, index) => `${color} ${index * segment}deg ${(index + 1) * segment}deg`)
    .join(", ");

  return (
    <div
      aria-label="United Nations SDG colour wheel"
      className="relative mx-auto aspect-square w-full max-w-[190px] rounded-full"
      style={{ background: `conic-gradient(${gradient})` }}
    >
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-black/12 bg-[#0a0a1a] text-center">
        <span className="px-3 text-[11px] font-bold uppercase leading-4 tracking-[0.14em] text-white/72">
          SDG
          <br />
          17 Goals
        </span>
      </div>
    </div>
  );
}

function HashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;

      window.setTimeout(() => {
        document.getElementById(decodeURIComponent(id))?.scrollIntoView({ block: "start" });
      }, 120);
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  const sectionGroup = staggerVariant(shouldReduceMotion, 0.055, 0.02);
  const cardReveal = revealVariant(shouldReduceMotion, 14, 0.985);
  const sectionReveal = revealVariant(shouldReduceMotion, 20, 0.99);

  return (
    <PageTransition transitionKey="landing" shouldReduceMotion={shouldReduceMotion}>
      <main className="aurora-landing relative min-h-dvh overflow-x-clip bg-[#06060f] text-white">
      <HashScroll />
      <div className="apple-page-backdrop pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <section
        id="home"
        className="relative z-10 min-h-[720px] overflow-hidden lg:min-h-[min(900px,100svh)]"
      >
        <div className="apple-hero-vignette pointer-events-none absolute inset-0 z-[1]" />

        <div
          className="relative z-10 flex min-h-[720px] flex-col px-5 pb-10 pt-4 text-center sm:px-8 sm:pb-12 sm:pt-5 lg:min-h-[min(900px,100svh)] lg:px-10 lg:pb-10 lg:pt-6 lg:text-left"
        >
          <motion.header
            initial="hidden"
            animate="show"
            variants={revealVariant(shouldReduceMotion, -8, 1)}
            className="apple-site-header mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 pb-3 text-[11px] font-semibold text-white/64 sm:pb-4 sm:text-xs"
          >
            <a href="./index.html" className="text-white/90 transition hover:text-white">
              Bruniverse
            </a>
            <nav className="hidden items-center gap-4 text-white/58 lg:flex xl:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className="whitespace-nowrap transition hover:text-sky-100"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden text-right text-sky-100/76 sm:inline">
                VBE 1014
              </span>
              <ThemeToggle />
            </div>
          </motion.header>

          <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 py-6 sm:py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] lg:gap-10 lg:py-8">
            <div
              className="grid max-w-[760px] gap-3 justify-self-center sm:gap-4 lg:gap-5 lg:justify-self-start"
            >
              <p
                className="apple-eyebrow mx-auto inline-flex w-fit items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase text-white/62 sm:py-2 sm:text-[11px] md:mx-0"
              >
                <span className="h-px w-8 bg-white/34" />
                Ethics and Sustainability
              </p>
              <h1
                className="apple-hero-title text-[clamp(2.25rem,8.5vw,3.55rem)] font-bold leading-[0.98] tracking-normal [text-wrap:balance] sm:text-[clamp(3.05rem,5.5vw,4.8rem)] lg:text-[clamp(3.55rem,4.2vw,4.9rem)]"
              >
                <span className="block">Sustainable Goals,</span>
                <span className="block">made clear.</span>
              </h1>
              <p
                className="apple-hero-copy mx-auto text-sm font-medium leading-relaxed text-white/68 [text-wrap:pretty] sm:text-base md:text-lg lg:mx-0"
              >
                A focused landing hub for learning the SDGs, shaping ethical
                sustainability arguments, and asking Unknown when the work gets
                complicated.
              </p>
              <div
                className="pointer-events-auto flex flex-wrap justify-center gap-3 pt-1 lg:justify-start"
              >
                <motion.a
                  href="./main.html"
                  className="apple-primary rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:translate-y-0"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { transform: "translate3d(0, -2px, 0)" }
                  }
                  whileTap={{ transform: "translate3d(0, 0, 0) scale(0.98)" }}
                  transition={{ duration: 0.16, ease: motionEase }}
                >
                  Log in
                </motion.a>
                <motion.a
                  href="./chat.html"
                  className="apple-secondary rounded-full border border-white/24 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-sky-100/42 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:translate-y-0"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { transform: "translate3d(0, -2px, 0)" }
                  }
                  whileTap={{ transform: "translate3d(0, 0, 0) scale(0.98)" }}
                  transition={{ duration: 0.16, ease: motionEase }}
                >
                  Ask for Unknown
                </motion.a>
              </div>
            </div>

            <motion.div
              aria-hidden="true"
              initial={{
                opacity: 0,
                transform: shouldReduceMotion
                  ? "scale(1)"
                  : "scale(0.985) translate3d(16px, 0, 0)",
              }}
              animate={{
                opacity: 1,
                transform: "scale(1) translate3d(0, 0, 0)",
              }}
              transition={{
                duration: shouldReduceMotion ? 0.18 : 0.84,
                ease: motionEase,
              }}
              className="apple-hero-visual pointer-events-none relative z-[3] mx-auto hidden aspect-square w-full max-w-[min(540px,40vw)] justify-self-center lg:block xl:max-w-[min(600px,38vw)]"
            >
              <div className="apple-globe-glow pointer-events-none absolute inset-x-[12%] top-[14%] h-[42%] rounded-[999px]" />
              <Globe3D
                className="relative z-[3] h-full w-full"
                markers={[]}
                config={{
                  radius: 1.95,
                  showAtmosphere: true,
                  atmosphereColor: "#f5f5f7",
                  atmosphereIntensity: 0.2,
                  atmosphereBlur: 4,
                  bumpScale: 2.1,
                  autoRotateSpeed: 0.14,
                  showWireframe: true,
                  wireframeColor: "#f5f5f7",
                  ambientIntensity: 1.08,
                  pointLightIntensity: 1.42,
                  enableZoom: false,
                  enablePan: false,
                  backgroundColor: null,
                }}
              />
            </motion.div>
          </div>

          <motion.footer
            initial="hidden"
            animate="show"
            variants={revealVariant(shouldReduceMotion, 10, 1)}
            transition={{ delay: shouldReduceMotion ? 0 : 0.22 }}
            className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-t border-white/12 pt-4 text-left sm:gap-6"
          >
            <p className="max-w-[720px] text-xs font-bold uppercase tracking-[0.14em] text-white/46">
              Clear goals. Practical choices. Better futures.
            </p>
            <p className="hidden max-w-sm text-right text-xs font-medium leading-5 text-sky-100/58 sm:block">
              Learn the goals, question the systems, then build a better answer.
            </p>
          </motion.footer>
        </div>
      </section>

      <SectionShell
        id="explore-sdgs"
        eyebrow="Learn"
        title="Explore the goals with academic clarity."
        copy="A structured entry point for understanding the United Nations Sustainable Development Goals, why guidance matters, and how each goal connects to education, research, and civic action."
        shouldReduceMotion={shouldReduceMotion}
        sectionGroup={sectionGroup}
        sectionReveal={sectionReveal}
        className="border-y border-white/10 bg-[#0a0a1a]/78 backdrop-blur-sm"
      >
        <motion.div
          variants={sectionGroup}
          className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
        >
          {platformFeatures.map((feature) => (
            <GlassCard
              key={feature.title}
              variants={cardReveal}
              shouldReduceMotion={shouldReduceMotion}
              className="min-h-[240px]"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${feature.accent}`}
              />
              <div className="relative grid h-full content-between gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
                    Core function
                  </p>
                  <h3 className="mt-8 text-2xl font-bold leading-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/62">
                    {feature.copy}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        <motion.div
          variants={sectionGroup}
          className="mt-14 grid gap-4 lg:grid-cols-[0.88fr_1.02fr_0.72fr]"
        >
          <GlassCard
            variants={cardReveal}
            shouldReduceMotion={shouldReduceMotion}
            className="min-h-[260px] bg-black/24"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
              {sdgAgenda.title}
            </p>
            <h3 className="mt-7 text-3xl font-bold leading-tight text-white">
              A shared 2030 plan for people, planet, prosperity, peace, and partnership.
            </h3>
            <p className="mt-5 text-sm font-medium leading-6 text-white/62">
              {sdgAgenda.summary}
            </p>
          </GlassCard>

          <GlassCard
            variants={cardReveal}
            shouldReduceMotion={shouldReduceMotion}
            className="min-h-[260px] bg-sky-100/[0.045]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
              Why the world needs SDG guidance
            </p>
            <p className="mt-7 text-base font-medium leading-7 text-white/68">
              {sdgAgenda.whyGuidanceMatters}
            </p>
            <CardLink href="./sdg-goals.html">Open SDG 17 Goals Page</CardLink>
          </GlassCard>

          <GlassCard
            variants={cardReveal}
            shouldReduceMotion={shouldReduceMotion}
            className="min-h-[260px] bg-black/24"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
              Official colour wheel
            </p>
            <div className="mt-6">
              <SdgColourWheel />
            </div>
            <p className="mt-6 text-xs font-medium leading-5 text-white/42">
              Source: United Nations Sustainable Development Goals communications materials.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div variants={sectionReveal} className="mt-16 mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/60">
            Complete list of the 17 goals
          </p>
        </motion.div>

        <motion.div
          variants={sectionGroup}
          className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {allSdgGoals.map((goal) => (
            <motion.a
              key={goal.number}
              variants={cardReveal}
              href="./sdg-goals.html#all-goals"
              className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-sky-100/24 hover:bg-white/[0.06]"
            >
              <p className="font-mono text-xs font-bold tabular-nums text-white/28">
                SDG {goal.number}
              </p>
              <h3 className="mt-3 text-base font-bold leading-tight text-white group-hover:text-sky-100">
                {goal.title}
              </h3>
              <p className="mt-2 text-xs font-medium leading-5 text-white/46">
                {goal.summary}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={sectionGroup}
          className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {selectedGoals.map((goal) => (
            <GlassCard
              key={goal.number}
              variants={cardReveal}
              shouldReduceMotion={shouldReduceMotion}
              className="bg-black/24"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/64">
                {goal.number}
              </p>
              <h3 className="mt-5 text-2xl font-bold leading-tight text-white">
                {goal.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-6 text-white/62">
                {goal.copy}
              </p>
              <CardLink href={goal.href}>Explore Goal</CardLink>
            </GlassCard>
          ))}
        </motion.div>
      </SectionShell>

      <SectionShell
        id="asking"
        eyebrow="Ask"
        title="Ask the Voices of Change"
        copy="Users can explore sustainability issues through AI-powered educational conversations inspired by global advocacy themes. These AI voices are simulations for learning purposes and are not real individuals."
        shouldReduceMotion={shouldReduceMotion}
        sectionGroup={sectionGroup}
        sectionReveal={sectionReveal}
      >
        <motion.div
          variants={sectionGroup}
          className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
        >
          {aiVoices.map((voice) => (
            <GlassCard
              key={voice.title}
              variants={cardReveal}
              shouldReduceMotion={shouldReduceMotion}
              className="grid min-h-[290px] content-between bg-white/[0.04]"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/62">
                  {voice.sdg}
                </p>
                <h3 className="mt-5 text-2xl font-bold leading-tight text-white">
                  {voice.title}
                </h3>
                <p className="mt-5 rounded-lg border border-white/10 bg-black/22 p-4 text-sm font-medium leading-6 text-white/62">
                  "{voice.question}"
                </p>
              </div>
              <CardLink href="./chat.html">Start Chat</CardLink>
            </GlassCard>
          ))}
        </motion.div>
        <motion.p
          variants={sectionReveal}
          className="mt-8 max-w-4xl rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-medium leading-6 text-white/54"
        >
          These AI voices are educational simulations inspired by public advocacy
          themes. They do not represent or impersonate real individuals.
        </motion.p>
      </SectionShell>

      <SectionShell
        id="dataset-hub"
        eyebrow="Research"
        title="Research with SDG Data"
        copy="A curated starting point for students and early-stage researchers who need credible sustainability datasets without losing the larger SDG context."
        shouldReduceMotion={shouldReduceMotion}
        sectionGroup={sectionGroup}
        sectionReveal={sectionReveal}
        className="bg-[#0a0a1a]/58"
      >
        <motion.div
          variants={sectionGroup}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {datasetCategories.map((category) => (
            <GlassCard
              key={category.title}
              variants={cardReveal}
              shouldReduceMotion={shouldReduceMotion}
              className="min-h-[220px]"
            >
              <h3 className="text-2xl font-bold leading-tight text-white">
                {category.title}
              </h3>
              <p className="mt-4 text-sm font-medium leading-6 text-white/62">
                {category.copy}
              </p>
              <CardLink href="./main.html#datasets-section">View datasets</CardLink>
            </GlassCard>
          ))}
        </motion.div>
      </SectionShell>

      <SectionShell
        id="sdg-act-now"
        eyebrow="Act"
        title="From Awareness to Action"
        copy="Translate sustainability learning into practical choices, beginning with personal emissions awareness and everyday actions that scale through communities."
        shouldReduceMotion={shouldReduceMotion}
        sectionGroup={sectionGroup}
        sectionReveal={sectionReveal}
      >
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div variants={sectionGroup} className="grid gap-3">
            <GlassCard variants={cardReveal} shouldReduceMotion={shouldReduceMotion}>
              <h3 className="text-2xl font-bold leading-tight text-white">
                What is a carbon footprint?
              </h3>
              <p className="mt-4 text-sm font-medium leading-6 text-white/62">
                A carbon footprint estimates the greenhouse gas emissions linked
                to everyday choices, from energy use and food to travel and
                purchasing habits.
              </p>
            </GlassCard>
            <GlassCard variants={cardReveal} shouldReduceMotion={shouldReduceMotion}>
              <h3 className="text-2xl font-bold leading-tight text-white">
                Why individual actions matter
              </h3>
              <p className="mt-4 text-sm font-medium leading-6 text-white/62">
                Individual action builds literacy, changes demand, and helps
                communities normalize low-carbon decisions while larger systems
                continue to change.
              </p>
            </GlassCard>
          </motion.div>

          <GlassCard
            variants={cardReveal}
            shouldReduceMotion={shouldReduceMotion}
            className="bg-sky-100/[0.055]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
              Ten practical actions
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {tenActNowActions.map((action) => (
                <div
                  key={action}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm font-bold text-white/72"
                >
                  {action}
                </div>
              ))}
            </div>
            <a
              href="./act-now.html"
              className="mt-8 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_48px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Calculate Your Footprint
            </a>
          </GlassCard>
        </div>
      </SectionShell>

      <SectionShell
        id="about-us"
        eyebrow="About us"
        title="A small team, four focused contributions."
        copy="The landing page keeps the team preview brief. Full backgrounds, career plans, and contribution details live on the About Us page."
        shouldReduceMotion={shouldReduceMotion}
        sectionGroup={sectionGroup}
        sectionReveal={sectionReveal}
        className="border-y border-white/10 bg-[#0a0a1a]/66"
      >
        <motion.div
          variants={sectionGroup}
          className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {teamMembers.map((member) => (
            <GlassCard
              key={member.name}
              variants={cardReveal}
              shouldReduceMotion={shouldReduceMotion}
              className="h-full min-h-[260px] bg-black/22 p-4 sm:p-5"
            >
              <div className="grid h-full min-w-0 grid-rows-[72px_1fr_auto] gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]">
                    <img
                      src={member.photoPath}
                      alt={`${member.name} head shot`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold leading-tight text-white">
                      {member.englishName}
                    </h3>
                    <p className="mt-1 truncate text-sm font-semibold text-white/46">
                      {member.name}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="team-preview-role text-sm font-medium leading-6 text-white/60">
                    {member.role}
                  </p>
                </div>

                <div className="grid min-h-[64px] content-end gap-2">
                  {[...(member.selectedSdgs || []), ...(member.selectedActions || [])].slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="team-preview-pill rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-white/54"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        <motion.div variants={sectionReveal} className="mt-6 flex justify-center">
          <a
            href="./about-us.html"
            className="inline-flex rounded-full border border-white/16 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white/76 transition hover:border-sky-100/34 hover:bg-white/10 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
          >
            Open About Us
          </a>
        </motion.div>
      </SectionShell>

      <section id="join-us" className="relative z-10 px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionGroup}
          className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-sky-100/18 bg-sky-100/[0.055] p-6 text-center backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-8 md:text-left"
        >
          <motion.div
            variants={sectionReveal}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
              Join us
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Turn one goal into one practical action.
            </h2>
            <p className="mt-4 text-sm font-medium leading-6 text-white/58">
              Choose a goal, test an Act Now habit, and use evidence to make sustainability visible in daily life.
            </p>
          </motion.div>
          <motion.div
            variants={sectionReveal}
            className="flex flex-wrap justify-center gap-3 md:justify-end"
          >
            <a
              href="./act-now.html"
              className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Start Act Now
            </a>
            <a
              href="./sdg-goals.html"
              className="rounded-lg border border-white/24 bg-black/20 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-sky-100/42 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Explore Goals
            </a>
            <a
              href="./about-us.html"
              className="rounded-lg border border-white/24 bg-black/20 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-sky-100/42 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Meet the Team
            </a>
          </motion.div>
        </motion.div>
      </section>

      <footer
        id="reference-list"
        className="relative z-10 border-t border-white/10 px-5 py-10 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-lg font-bold text-white">SDG Intelligence Hub</p>
            <p className="mt-2 text-sm font-medium leading-6 text-white/54">
              University sustainability project for educational use.
            </p>
          </div>
          <div className="grid gap-5">
            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold uppercase tracking-[0.14em] text-white/52">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-sky-100"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="./reference-list.html"
              className="w-fit text-sm font-bold text-sky-100/76 transition hover:text-sky-100"
            >
              Open full Reference List
            </a>
            <ol className="grid max-w-3xl gap-2 text-xs font-medium leading-5 text-white/36">
              {apaReferences.slice(0, 3).map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ol>
            <p className="max-w-3xl text-xs font-medium leading-5 text-white/42">
              This project is for educational use. Dataset links, AI chat
              experiences, and action tools are provided as learning interfaces
              and should be reviewed against authoritative sources for formal
              research or policy decisions.
            </p>
          </div>
        </div>
      </footer>
      </main>
    </PageTransition>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
