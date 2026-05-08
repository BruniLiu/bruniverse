import React from "react";
import ReactDOM from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import { Globe3D } from "@/components/ui/3d-globe";
import SoftAurora from "./components/react-bits/SoftAurora";
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
  { label: "Explore SDGs", href: "#explore-sdgs" },
  { label: "Asking", href: "#asking" },
  { label: "Dataset Hub", href: "#dataset-hub" },
  { label: "SDG Act Now", href: "#sdg-act-now" },
  { label: "About Us", href: "#about-us" },
  { label: "Reference List", href: "#reference-list" },
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

const selectedGoals = [
  {
    number: "SDG 4",
    title: "Quality Education",
    copy: "Advance inclusive learning opportunities that help communities build long-term resilience.",
  },
  {
    number: "SDG 13",
    title: "Climate Action",
    copy: "Understand climate risks, mitigation choices, and adaptation pathways for a warming planet.",
  },
  {
    number: "SDG 3",
    title: "Good Health and Well-being",
    copy: "Explore how public health systems, prevention, and equity shape sustainable societies.",
  },
  {
    number: "SDG 16",
    title: "Peace, Justice and Strong Institutions",
    copy: "Connect justice, accountable institutions, and peacebuilding to sustainable development.",
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
    title: "Public Health AI",
    sdg: "Related SDG: 3",
    question: "How do health systems prepare for climate-related risks?",
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
    title: "Health Data",
    copy: "Public health, well-being, disease burden, and health system indicators.",
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

const actNowActions = [
  "Save energy",
  "Use public transport",
  "Eat more vegetables",
  "Reduce waste",
  "Recycle",
  "Speak up",
  "Conserve water",
  "Choose sustainable products",
  "Repair and reuse",
  "Share SDG knowledge",
];

const orbitalNodes = [
  { label: "Learn", position: "left-[17%] top-[32%]", line: "w-14 rotate-[12deg]" },
  { label: "Ask", position: "right-[24%] top-[24%]", line: "w-12 -rotate-[16deg]" },
  { label: "Research", position: "right-[21%] top-[55%]", line: "w-14 rotate-[8deg]" },
  { label: "Act", position: "left-[25%] bottom-[22%]", line: "w-10 -rotate-[18deg]" },
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
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition duration-300 hover:border-sky-100/24 hover:bg-white/[0.065] ${className}`}
    >
      {children}
    </motion.article>
  );
}

function CardLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="mt-6 inline-flex w-fit rounded-lg border border-white/16 bg-white/[0.055] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-100/86 transition hover:border-sky-100/34 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
    >
      {children}
    </a>
  );
}

function HeroOrbitalVisual({ shouldReduceMotion }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[4] hidden opacity-65 md:block lg:opacity-85"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldReduceMotion ? 0.62 : 1 }}
      transition={{ duration: shouldReduceMotion ? 0.18 : 0.7, ease: motionEase }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                transform: [
                  "translate3d(0, 0, 0)",
                  "translate3d(0, -8px, 0)",
                  "translate3d(0, 0, 0)",
                ],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-1/2 top-1/2 z-[1] h-[62%] w-[116%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border border-cyan-100/8" />
        <div className="absolute left-1/2 top-1/2 z-[1] h-[55%] w-[108%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-[50%] border border-teal-100/7" />
        <div className="absolute left-1/2 top-1/2 z-[1] h-[74%] w-[82%] -translate-x-1/2 -translate-y-1/2 rotate-[34deg] rounded-[50%] border border-sky-100/7" />
        <motion.div
          className="absolute left-1/2 top-1/2 z-[1] h-[66%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-cyan-100/8"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute left-1/2 top-1/2 z-[5] h-[61%] w-[116%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border-t border-cyan-100/32 border-b-transparent border-l-transparent border-r-transparent shadow-[0_-10px_30px_rgba(125,211,252,0.08)]" />
        <div className="absolute left-1/2 top-1/2 z-[5] h-[54%] w-[108%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-[50%] border-t border-teal-100/22 border-b-transparent border-l-transparent border-r-transparent" />

        {orbitalNodes.map((node, index) => (
          <motion.div
            key={node.label}
            className={`absolute z-[6] ${node.position}`}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    transform: [
                      "translate3d(0, 0, 0)",
                      `translate3d(${index % 2 ? -5 : 5}px, ${index < 2 ? -6 : 6}px, 0)`,
                      "translate3d(0, 0, 0)",
                    ],
                  }
            }
            transition={{
              duration: 5.8 + index * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
          >
            <div className="relative flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-100 shadow-[0_0_16px_rgba(125,211,252,0.8)]" />
              <span className={`${node.line} h-px bg-gradient-to-r from-cyan-100/46 to-transparent`} />
              <span className="rounded-full border border-cyan-100/18 bg-[#020711]/58 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-sky-100/80 shadow-[0_12px_48px_rgba(8,47,73,0.28)] backdrop-blur-md">
                {node.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  const heroGroup = staggerVariant(shouldReduceMotion, 0.075, 0.08);
  const sectionGroup = staggerVariant(shouldReduceMotion, 0.055, 0.02);
  const heroReveal = revealVariant(shouldReduceMotion, 18, 0.99);
  const cardReveal = revealVariant(shouldReduceMotion, 14, 0.985);
  const sectionReveal = revealVariant(shouldReduceMotion, 20, 0.99);

  return (
    <main className="aurora-landing relative min-h-dvh overflow-x-clip bg-[#02050b] text-white">
      <div
        className="pointer-events-none absolute inset-[-5vh] z-0"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{ transform: "scale(1.1)" }}
        >
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1}
            color1="#dbeafe"
            color2="#2563eb"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
          />
        </div>

        <div className="hero-starfield hero-starfield-far pointer-events-none absolute inset-0" />
        <div className="hero-starfield hero-starfield-near pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(37,99,235,0.18)_0%,rgba(14,165,233,0.08)_22%,transparent_48%),radial-gradient(circle_at_50%_68%,rgba(56,189,248,0.08)_0%,transparent_42%),radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,5,11,0.32)_48%,rgba(2,5,11,0.9)_100%)]" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen" />
      </div>

      <section
        id="home"
        className="relative z-10 min-h-[100svh] overflow-x-clip"
      >
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_74%_42%,rgba(96,165,250,0.22)_0%,rgba(14,165,233,0.1)_22%,transparent_48%)]" />
        <div
          className="pointer-events-none absolute bottom-[-8svh] left-1/2 z-[3] h-[54svh] min-h-[330px] w-[min(760px,130vw)] -translate-x-1/2 opacity-90 sm:bottom-[-12vh] sm:h-[84vh] sm:min-h-[560px] sm:w-[min(980px,132vw)] sm:opacity-95 md:bottom-[-6vh] md:left-auto md:right-[-18vw] md:h-[96vh] md:w-[min(1180px,90vw)] md:translate-x-0 lg:right-[-12vw] xl:right-[-8vw]"
          style={{
            transformOrigin: "50% 100%",
          }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={{
              opacity: 0,
              transform: shouldReduceMotion
                ? "scale(1)"
                : "scale(0.982) translate3d(0, 10px, 0)",
            }}
            animate={{ opacity: 1, transform: "scale(1) translate3d(0, 0, 0)" }}
            transition={{ duration: shouldReduceMotion ? 0.18 : 0.8, ease: motionEase }}
          >
            <div className="pointer-events-none absolute inset-x-[5%] top-[14%] h-[36%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(224,242,254,0.48)_0%,rgba(56,189,248,0.28)_30%,rgba(37,99,235,0.16)_52%,transparent_74%)] blur-3xl" />
            <div className="pointer-events-none absolute inset-x-[14%] top-[23%] h-[18%] rounded-[999px] bg-cyan-100/20 blur-2xl mix-blend-screen" />
            <div className="relative h-full w-full">
              <HeroOrbitalVisual shouldReduceMotion={shouldReduceMotion} />
              <Globe3D
                className="relative z-[3] h-full w-full"
                markers={[]}
                config={{
                  radius: 2.25,
                  showAtmosphere: false,
                  atmosphereColor: "#60a5fa",
                  atmosphereIntensity: 0.35,
                  atmosphereBlur: 4.2,
                  bumpScale: 4,
                  autoRotateSpeed: 0.22,
                  showWireframe: true,
                  wireframeColor: "#38bdf8",
                  ambientIntensity: 0.75,
                  pointLightIntensity: 2,
                  enableZoom: false,
                  enablePan: false,
                  backgroundColor: null,
                }}
              />
            </div>
          </motion.div>
        </div>

        <div
          className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-16 pt-4 text-center sm:px-8 sm:pb-20 sm:pt-5 lg:px-10 lg:pb-20 lg:pt-6 lg:text-left"
        >
          <motion.header
            initial="hidden"
            animate="show"
            variants={revealVariant(shouldReduceMotion, -8, 1)}
            className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 pb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/64 sm:pb-4 sm:text-xs"
          >
            <a href="./index.html" className="text-white/90 transition hover:text-white">
              Bruniverse
            </a>
            <nav className="hidden items-center gap-5 text-white/58 md:flex lg:gap-7">
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
            <span className="text-right text-sky-100/76">
              VBE 1014
            </span>
          </motion.header>

          <div className="mx-auto grid w-full max-w-7xl items-start gap-4 py-4 sm:flex-1 sm:items-center sm:gap-6 sm:py-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(300px,0.62fr)] lg:py-4">
            <motion.div
              initial="hidden"
              animate="show"
              variants={heroGroup}
              className="grid max-w-[720px] gap-3 justify-self-center sm:gap-4 lg:translate-y-4 lg:gap-5 lg:justify-self-start"
            >
              <motion.p
                variants={heroReveal}
                className="mx-auto inline-flex w-fit items-center gap-3 rounded-lg border border-sky-100/18 bg-sky-100/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-100/86 backdrop-blur sm:py-2 sm:text-[11px] sm:tracking-[0.18em] md:mx-0"
              >
                <span className="h-px w-8 bg-sky-200/58" />
                Ethics and Sustainability
              </motion.p>
              <motion.h1
                variants={heroReveal}
                className="max-w-[760px] text-[clamp(2rem,9.8vw,3.5rem)] font-bold leading-[0.94] tracking-normal [text-wrap:balance] sm:text-[clamp(2.9rem,6vw,5.5rem)] lg:text-[clamp(3.9rem,4.85vw,5.15rem)]"
              >
                Sustainable Development Goals, made clear.
              </motion.h1>
              <motion.p
                variants={heroReveal}
                className="mx-auto max-w-[660px] text-sm font-medium leading-relaxed text-white/68 [text-wrap:pretty] sm:text-base md:text-lg lg:mx-0"
              >
                A focused landing hub for learning the SDGs, shaping ethical
                sustainability arguments, and asking Unknown when the work gets
                complicated.
              </motion.p>
              <motion.div
                variants={heroReveal}
                className="pointer-events-auto flex flex-wrap justify-center gap-3 pt-1 lg:justify-start"
              >
                <motion.a
                  href="./main.html"
                  className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_18px_48px_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:translate-y-0"
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
                  className="rounded-lg border border-white/24 bg-white/[0.07] px-5 py-3 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-sky-100/42 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:translate-y-0"
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
              </motion.div>
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
              The collapse of civilization begins with the first bird hunted
              down.
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
        className="border-y border-white/10 bg-[#030812]/78 backdrop-blur-sm"
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
              <CardLink href="#">Explore Goal</CardLink>
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
        className="bg-[#030812]/58"
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
              <CardLink href="#">View datasets</CardLink>
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
              {actNowActions.map((action) => (
                <div
                  key={action}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm font-bold text-white/72"
                >
                  {action}
                </div>
              ))}
            </div>
            <a
              href="#"
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
        title="An educational sustainability platform for university learning."
        copy="This project combines SDG learning, AI-assisted questioning, research datasets, and practical actions in one coherent academic environment for students, educators, and early-stage researchers."
        shouldReduceMotion={shouldReduceMotion}
        sectionGroup={sectionGroup}
        sectionReveal={sectionReveal}
        className="border-y border-white/10 bg-[#030812]/66"
      >
        <motion.div
          variants={sectionGroup}
          className="grid gap-3 md:grid-cols-3"
        >
          {["Students", "Educators", "Researchers"].map((audience) => (
            <GlassCard
              key={audience}
              variants={cardReveal}
              shouldReduceMotion={shouldReduceMotion}
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
                Designed for
              </p>
              <h3 className="mt-5 text-2xl font-bold leading-tight text-white">
                {audience}
              </h3>
              <p className="mt-4 text-sm font-medium leading-6 text-white/62">
                A focused space to connect global goals with guided inquiry,
                credible evidence, and everyday sustainability decisions.
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </SectionShell>

      <section className="relative z-10 px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionGroup}
          className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-sky-100/18 bg-sky-100/[0.055] p-6 text-center backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-8 md:text-left"
        >
          <motion.h2
            variants={sectionReveal}
            className="text-3xl font-bold leading-tight text-white md:text-4xl"
          >
            Start exploring sustainable futures today.
          </motion.h2>
          <motion.div
            variants={sectionReveal}
            className="flex flex-wrap justify-center gap-3 md:justify-end"
          >
            <a
              href="#explore-sdgs"
              className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Explore SDGs
            </a>
            <a
              href="#asking"
              className="rounded-lg border border-white/24 bg-black/20 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-sky-100/42 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Ask AI Voices
            </a>
            <a
              href="#dataset-hub"
              className="rounded-lg border border-white/24 bg-black/20 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-sky-100/42 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Research Datasets
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
              href="#reference-list"
              className="w-fit text-sm font-bold text-sky-100/76 transition hover:text-sky-100"
            >
              Reference List
            </a>
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
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
