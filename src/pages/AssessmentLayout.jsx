import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageTransition from "../components/motion/PageTransition";
import SoftAurora from "../components/react-bits/SoftAurora";
import ThemeToggle from "../components/theme/ThemeToggle";
import { siteNavItems } from "./siteData";
import "../react.css";

export const motionEase = [0.23, 1, 0.32, 1];

export function fadeUp(shouldReduceMotion, delay = 0) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.56, ease: motionEase, delay },
    },
  };
}

export function stagger(shouldReduceMotion, staggerChildren = 0.06, delayChildren = 0.04) {
  return {
    hidden: {},
    show: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
        staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
      },
    },
  };
}

export function HashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;

      window.setTimeout(() => {
        document.getElementById(decodeURIComponent(id))?.scrollIntoView({ block: "start" });
      }, 80);
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 opacity-70" style={{ transform: "scale(1.1)" }}>
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.05}
          color1="#e0e7ff"
          color2="#6366f1"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0.8}
          colorSpeed={1}
        />
      </div>
      <div className="hero-starfield hero-starfield-far pointer-events-none absolute inset-0" />
      <div className="hero-starfield hero-starfield-near pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(99,102,241,0.16)_0%,rgba(56,189,248,0.07)_22%,transparent_48%),radial-gradient(circle_at_50%_68%,rgba(129,140,248,0.07)_0%,transparent_42%),radial-gradient(circle_at_50%_50%,transparent_0%,rgba(6,6,15,0.32)_48%,rgba(6,6,15,0.92)_100%)]" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen" />
    </div>
  );
}

export function SiteHeader({ activeHref }) {
  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={fadeUp(false)}
      className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/64 sm:px-8 sm:py-4 sm:text-xs lg:px-10"
    >
      <div className="flex items-center gap-6">
        <a href="./index.html" className="text-white/90 transition hover:text-white">
          Bruniverse
        </a>
        <nav className="hidden items-center gap-5 text-white/58 lg:flex lg:gap-7">
          {siteNavItems.map((item) => (
            <a
              key={item.href}
              className={`whitespace-nowrap transition hover:text-sky-100 ${
                item.href === activeHref ? "text-sky-100/90" : ""
              }`}
              href={item.href}
            >
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
  );
}

export function StaticPageShell({ transitionKey, activeHref, children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageTransition transitionKey={transitionKey} shouldReduceMotion={shouldReduceMotion}>
      <main className="aurora-landing relative min-h-dvh overflow-x-clip bg-[#06060f] text-white">
        <HashScroll />
        <Background />
        <SiteHeader activeHref={activeHref} />
        <div className="relative z-10">{children(shouldReduceMotion)}</div>
        <SiteFooter />
      </main>
    </PageTransition>
  );
}

export function HeroSection({ eyebrow, title, copy, children, shouldReduceMotion }) {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-28 lg:px-12 lg:pt-32 lg:pb-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(shouldReduceMotion, 0.08, 0.08)}
          className="grid gap-7"
        >
          <motion.p
            variants={fadeUp(shouldReduceMotion)}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp(shouldReduceMotion)}
            className="max-w-4xl text-[clamp(2.8rem,7vw,5.4rem)] font-extrabold leading-[0.96] tracking-normal [text-wrap:balance]"
          >
            {title}
          </motion.h1>
          {copy && (
            <motion.p
              variants={fadeUp(shouldReduceMotion)}
              className="max-w-[720px] text-lg font-medium leading-[1.5] text-white/68 sm:text-2xl"
            >
              {copy}
            </motion.p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, copy, shouldReduceMotion }) {
  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-10 max-w-3xl sm:mb-12">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/62">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-white [text-wrap:pretty] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-4 text-sm font-medium leading-relaxed text-white/60 sm:text-base">{copy}</p>}
    </motion.div>
  );
}

export function PageSection({ id, children, className = "", shouldReduceMotion }) {
  return (
    <section id={id} className={`relative z-10 px-6 py-18 sm:px-10 sm:py-24 lg:px-12 lg:py-28 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-90px" }}
        variants={stagger(shouldReduceMotion)}
        className="mx-auto max-w-7xl"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function GlassPanel({ children, className = "", variants, shouldReduceMotion }) {
  return (
    <motion.article
      variants={variants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -4px, 0)", transition: { duration: 0.18, ease: motionEase } }
      }
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition duration-300 hover:border-sky-100/24 hover:bg-white/[0.065] ${className}`}
    >
      {children}
    </motion.article>
  );
}

export function PillLink({ href, children, variant = "light" }) {
  const isLight = variant === "light";

  return (
    <a
      href={href}
      className={`inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 ${
        isLight
          ? "bg-white text-black shadow-[0_18px_48px_rgba(255,255,255,0.14)] hover:bg-sky-100"
          : "border border-white/24 bg-black/20 text-white hover:border-sky-100/42 hover:bg-white/10"
      }`}
    >
      <span>{children}</span>
      <ArrowRight size={15} strokeWidth={2.1} aria-hidden="true" />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/24">
          SDG Intelligence Hub - VBE 1014
        </p>
        <p className="text-xs font-medium text-white/20">
          Educational content. Verify against authoritative sources for research use.
        </p>
      </div>
    </footer>
  );
}
