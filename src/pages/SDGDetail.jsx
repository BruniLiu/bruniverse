import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../components/motion/PageTransition";
import { HashScroll } from "./AssessmentLayout";
import SoftAurora from "../components/react-bits/SoftAurora";
import ThemeToggle from "../components/theme/ThemeToggle";
import { sdgDetails } from "./sdgData";
import { rubricGoalSections } from "./rubricGoalData";
import { siteNavItems } from "./siteData";
import CarbonFootprintCalculator from "../components/calculator/CarbonFootprintCalculator";
import "../react.css";

const motionEase = [0.23, 1, 0.32, 1];

function fadeUp(shouldReduceMotion, delay = 0) {
  return {
    hidden: { opacity: 1, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: motionEase, delay },
    },
  };
}

function ResearchFocusSection({ rubric, shouldReduceMotion }) {
  const impactItems = [
    { label: "Root causes", copy: rubric.adverse.why },
    { label: "What it looks like", copy: rubric.adverse.how },
    { label: "People and power", copy: rubric.adverse.who },
  ];

  return (
    <section id="research-focus" className="mx-auto mt-20 max-w-6xl min-w-0 px-5 sm:mt-32 sm:px-10 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="grid min-w-0 gap-10 sm:gap-14"
      >
        <motion.div variants={fadeUp(shouldReduceMotion)} className="max-w-[760px] min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Country case
          </p>
          <h2 className="mt-5 break-words text-3xl font-extrabold leading-[1.08] text-white sm:text-5xl sm:leading-[1.04]">
            Purpose, pressure, and response.
          </h2>
          <p className="mt-5 break-words text-base font-medium leading-relaxed text-white/58 sm:text-lg">
            A concise study of what this goal is trying to achieve, how the
            issue appears in China, and how practical action can move the
            situation toward better outcomes.
          </p>
        </motion.div>

        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <motion.article
            variants={fadeUp(shouldReduceMotion)}
            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              The goal
            </p>
            <h3 className="mt-5 break-words text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {rubric.title}
            </h3>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/36">
              {rubric.theme}
            </p>
          </motion.article>

          <motion.article
            variants={fadeUp(shouldReduceMotion)}
            className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              2030 purpose
            </p>
            <p className="mt-5 break-words text-sm font-medium leading-[1.75] text-white/72 sm:text-base">
              {rubric.purpose}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(rubric.targets || []).map((target) => (
                <span
                  key={target}
                  className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/44"
                >
                  {target}
                </span>
              ))}
            </div>
          </motion.article>
        </div>

        <motion.div variants={fadeUp(shouldReduceMotion)} className="grid min-w-0 gap-5">
          <div className="max-w-[760px] min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Pressure in China
            </p>
            <h3 className="mt-3 break-words text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {rubric.adverseTitle}
            </h3>
          </div>
          <div className="grid min-w-0 gap-4 lg:grid-cols-3">
            {impactItems.map((item) => (
              <article
                key={item.label}
                className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/34">
                  {item.label}
                </p>
                <p className="mt-4 break-words text-sm font-medium leading-[1.7] text-white/64">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp(shouldReduceMotion)} className="grid min-w-0 gap-5">
          <div className="max-w-[760px] min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Action pathway
            </p>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              From adversity to prosperity
            </h3>
          </div>
          <div className="grid min-w-0 gap-4 lg:grid-cols-3">
            {(rubric.response || []).map((item) => (
              <article
                key={item.title}
                className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <h4 className="break-words text-base font-bold text-white/82">{item.title}</h4>
                <p className="mt-3 break-words text-sm font-medium leading-[1.65] text-white/58">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
          <p className="max-w-[860px] break-words border-l border-white/14 pl-5 text-sm font-medium leading-[1.75] text-white/62">
            {rubric.expectedImpact}
          </p>
        </motion.div>

        <motion.div variants={fadeUp(shouldReduceMotion)} className="grid min-w-0 gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Evidence base
          </p>
          <ol className="grid gap-3 text-sm leading-relaxed text-white/52">
            {(rubric.references || []).map((reference, index) => (
              <li key={reference} className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
                <span className="font-mono text-xs font-bold text-white/22">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 break-words">{reference}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className="h-px bg-white/[0.05]" />
      </motion.div>
    </section>
  );
}

const chartPalette = ["#f8fafc", "#7dd3fc", "#a5b4fc", "#c4b5fd"];

function formatChartNumber(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2))).replace(/\.0$/, "");
}

function chartValueLabel(item, unit) {
  if (item.displayValue) return item.displayValue;
  const value = formatChartNumber(item.value);
  if (unit === "%") return `${value}%`;
  if (unit === "°C" || unit === "C") return `${value} C`;
  return value;
}

function AnimatedLineChart({ chart, shouldReduceMotion }) {
  const width = 640;
  const height = 320;
  const plot = { left: 54, right: 24, top: 26, bottom: 52 };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const values = chart.series.flatMap((series) => series.points.map((point) => point.value));
  const yMin = chart.yMin ?? Math.min(...values);
  const yMax = chart.yMax ?? Math.max(...values);
  const ySpan = Math.max(yMax - yMin, 1);
  const labels = chart.series[0]?.points.map((point) => point.label) || [];
  const yTicks = Array.from({ length: 4 }, (_, index) => yMin + (ySpan * index) / 3);

  const xFor = (index, total) =>
    plot.left + (total <= 1 ? plotWidth / 2 : (index / (total - 1)) * plotWidth);
  const yFor = (value) => plot.top + ((yMax - value) / ySpan) * plotHeight;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={chart.title}>
        {yTicks.map((tick) => {
          const y = yFor(tick);
          return (
            <g key={tick}>
              <line x1={plot.left} x2={width - plot.right} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
              <text x={plot.left - 12} y={y + 4} textAnchor="end" fontSize="11" fill="rgba(255,255,255,0.36)">
                {formatChartNumber(tick)}
              </text>
            </g>
          );
        })}

        {labels.map((label, index) => (
          <text
            key={label}
            x={xFor(index, labels.length)}
            y={height - 18}
            textAnchor="middle"
            fontSize="11"
            fill="rgba(255,255,255,0.42)"
          >
            {label}
          </text>
        ))}

        {chart.series.map((series, seriesIndex) => {
          const points = series.points.map((point, index) => ({
            x: xFor(index, series.points.length),
            y: yFor(point.value),
            value: point.value,
            label: point.label,
          }));
          const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
          const color = series.color || chartPalette[seriesIndex % chartPalette.length];

          return (
            <g key={series.name}>
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.9 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 1.05, ease: motionEase, delay: seriesIndex * 0.12 }}
              />
              {points.map((point, pointIndex) => (
                <motion.g
                  key={`${series.name}-${point.label}`}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, delay: 0.28 + pointIndex * 0.05 + seriesIndex * 0.08 }}
                  style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                >
                  <circle cx={point.x} cy={point.y} r="4.5" fill="#06060f" stroke={color} strokeWidth="2.5" />
                </motion.g>
              ))}
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap gap-3">
        {chart.series.map((series, index) => (
          <span key={series.name} className="inline-flex items-center gap-2 text-xs font-semibold text-white/50">
            <span className="h-2 w-2 rounded-full" style={{ background: series.color || chartPalette[index % chartPalette.length] }} />
            {series.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnimatedBarChart({ chart, shouldReduceMotion }) {
  const max = chart.yMax ?? Math.max(...chart.bars.map((bar) => bar.scaledValue ?? bar.value));

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4">
      <div className="grid h-[220px] grid-cols-[repeat(auto-fit,minmax(92px,1fr))] items-end gap-3 border-b border-white/10 pb-4 sm:h-[260px] sm:grid-cols-[repeat(auto-fit,minmax(74px,1fr))] sm:gap-4">
        {chart.bars.map((bar, index) => {
          const plottedValue = bar.scaledValue ?? bar.value;
          const height = `${Math.max(6, Math.min(100, (plottedValue / max) * 100))}%`;
          return (
            <div key={bar.label} className="flex h-full min-w-0 flex-col justify-end gap-3">
              <div className="text-center text-xs font-bold text-white/78">
                {chartValueLabel(bar, chart.unit)}
              </div>
              <div className="flex h-full items-end">
                <motion.div
                  className="w-full rounded-t-md border border-white/10 bg-white/82 shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                  initial={{ height: shouldReduceMotion ? height : "0%" }}
                  whileInView={{ height }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.85, ease: motionEase, delay: index * 0.08 }}
                />
              </div>
              <p className="min-h-[34px] text-center text-[11px] font-semibold uppercase leading-4 text-white/42">
                {bar.label}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] font-medium text-white/34">{chart.unit}</p>
    </div>
  );
}

function ChartCard({ chart, shouldReduceMotion }) {
  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:p-6"
    >
      <div className="mb-5">
        <h3 className="break-words text-lg font-extrabold leading-tight text-white sm:text-xl">{chart.title}</h3>
        <p className="mt-2 break-words text-xs font-medium leading-5 text-white/38">Source: {chart.source}</p>
      </div>
      {chart.type === "line" ? (
        <AnimatedLineChart chart={chart} shouldReduceMotion={shouldReduceMotion} />
      ) : (
        <AnimatedBarChart chart={chart} shouldReduceMotion={shouldReduceMotion} />
      )}
    </motion.article>
  );
}

function DataVizSection({ dataViz, shouldReduceMotion }) {
  if (!dataViz) return null;

  return (
    <section id="data-signal" className="mx-auto mt-20 max-w-6xl min-w-0 px-5 sm:mt-32 sm:px-10 lg:px-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="grid min-w-0 gap-8"
      >
        <motion.div variants={fadeUp(shouldReduceMotion)} className="max-w-[780px] min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            Data signal
          </p>
          <h2 className="mt-5 max-w-full break-words text-xl font-extrabold leading-[1.12] text-white sm:text-5xl sm:leading-[1.04]">
            {dataViz.title}
          </h2>
          <p className="mt-5 break-words text-base font-medium leading-relaxed text-white/58 sm:text-lg">
            {dataViz.copy}
          </p>
        </motion.div>

        <div className="grid min-w-0 gap-3 md:grid-cols-3">
          {dataViz.stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              variants={fadeUp(shouldReduceMotion, index * 0.03)}
              className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] p-5"
            >
              <p className="break-words text-3xl font-extrabold leading-none text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-4 text-xs font-semibold uppercase leading-5 text-white/42">{stat.label}</p>
            </motion.article>
          ))}
        </div>

        <div className="grid min-w-0 gap-5 xl:grid-cols-2">
          {dataViz.charts.map((chart) => (
            <ChartCard key={chart.title} chart={chart} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </div>

        <motion.p variants={fadeUp(shouldReduceMotion)} className="max-w-[860px] text-xs font-medium leading-5 text-white/36">
          Chart data source: {dataViz.source}
        </motion.p>
      </motion.div>
    </section>
  );
}

function SDGDetailPage({ sdgId }) {
  const shouldReduceMotion = useReducedMotion();
  const sdg = sdgDetails[sdgId];
  const rubric = rubricGoalSections.find(
    (section) => Number(section.number) === Number(sdgId),
  );
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

        <div ref={contentRef} className="relative z-10 min-w-0">

          {/* ── HERO ── */}
          <section className="relative min-w-0 overflow-hidden px-5 pt-14 pb-18 sm:px-10 sm:pt-24 sm:pb-32 lg:px-12 lg:pt-32 lg:pb-40">
            {/* SDG-themed gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(52,211,153,0.08)_0%,rgba(16,185,129,0.03)_30%,transparent_60%)]" />
            {/* Giant decorative SDG number */}
            <div className="pointer-events-none absolute right-[-4%] top-1/2 hidden -translate-y-1/2 select-none text-[22vw] font-bold leading-none text-white/[0.015] sm:block lg:text-[18vw]">
              {sdgId}
            </div>

            <div className="mx-auto max-w-6xl min-w-0">
              <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.5fr)] lg:gap-20">
                {/* Left: title + description */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } } }}
                  className="grid min-w-0 gap-6 sm:gap-8"
                >
                  <motion.p
                    variants={fadeUp(shouldReduceMotion)}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40"
                  >
                    {sdg.number}
                  </motion.p>
                  <motion.h1
                    variants={fadeUp(shouldReduceMotion)}
                    className="max-w-full break-words text-[clamp(3rem,15vw,4.2rem)] font-extrabold leading-[0.95] tracking-normal text-white [text-wrap:balance] sm:text-[clamp(3.8rem,8vw,5.6rem)] sm:leading-[0.9]"
                  >
                    {sdg.title}
                  </motion.h1>
                  <motion.p
                    variants={fadeUp(shouldReduceMotion)}
                    className="max-w-[560px] break-words text-base font-medium leading-[1.55] text-white/68 sm:text-2xl sm:leading-[1.45]"
                  >
                    {sdg.subtitle}
                  </motion.p>
                </motion.div>

                {/* Right: quick stats */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { delayChildren: 0.28, staggerChildren: 0.08 } } }}
                  className="grid min-w-0 gap-4 sm:flex sm:flex-col sm:justify-end sm:gap-5"
                >
                  {[
                    { label: "Targets", value: sdg.targets.length.toString() },
                    { label: "Global Goals", value: "17" },
                    { label: "Deadline", value: "2030" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeUp(shouldReduceMotion)}
                      className="flex min-w-0 items-baseline gap-4 sm:gap-5"
                    >
                      <span className="shrink-0 text-4xl font-extrabold tabular-nums leading-none text-white sm:text-6xl">
                        {stat.value}
                      </span>
                      <span className="min-w-0 break-words text-xs font-semibold uppercase tracking-[0.12em] text-white/30 sm:tracking-[0.14em]">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── MAIN CONTENT: Two-column with sidebar ── */}
          <DataVizSection dataViz={sdg.dataViz} shouldReduceMotion={shouldReduceMotion} />

          {rubric && (
            <ResearchFocusSection
              rubric={rubric}
              shouldReduceMotion={shouldReduceMotion}
            />
          )}

          <div id="content" className="mx-auto mt-20 max-w-6xl min-w-0 px-5 sm:mt-32 sm:px-10 lg:px-12">
            <div className="grid min-w-0 gap-0 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[260px_minmax(0,1fr)]">

              {/* Sticky sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-32 grid gap-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/28">
                    On this page
                  </p>
                  <nav className="grid gap-2.5 text-sm font-medium text-white/40">
                    {[
                      ...(sdg.dataViz ? [{ label: "Data signal", id: "data-signal" }] : []),
                      ...(rubric ? [{ label: "Country case", id: "research-focus" }] : []),
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
              <div className="grid min-w-0 gap-24 sm:gap-36">

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
                    className="max-w-[680px] break-words text-lg font-medium leading-[1.55] text-white/82 sm:text-2xl sm:leading-[1.5]"
                  >
                    {sdg.overview}
                  </motion.p>
                </motion.section>

                {/* Targets - vertical timeline */}
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
                          className="group relative grid min-w-0 grid-cols-[28px_minmax(0,1fr)] gap-5 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-8"
                        >
                          <div className="relative flex justify-center">
                            <div className="relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full bg-white/20 transition group-hover:scale-125 group-hover:bg-white/40" />
                          </div>
                          <div className="pb-1">
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-2 break-words text-sm font-medium leading-[1.6] text-white/76 sm:text-base">
                              {target}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Facts - asymmetric grid */}
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

                  <div className="grid min-w-0 gap-x-10 gap-y-10 sm:grid-cols-6">
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
                          className={`${spans[i]} min-w-0`}
                        >
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/25">
                            0{i + 1}
                          </span>
                          <p className="mt-4 break-words text-sm font-medium leading-[1.6] text-white/72 sm:text-base">
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
                    <p className="max-w-[680px] break-words text-base font-medium leading-[1.6] text-white/64 sm:text-lg">
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
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl min-w-0 px-5 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-28 min-w-0 sm:mt-40"
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

                    <div className="space-y-20 sm:space-y-28">
                      {section.challenges.map((challenge, i) => (
                        <motion.div key={i} variants={fadeUp(shouldReduceMotion)}>
                          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:gap-16">
                            <div className="min-w-0">
                              <div className="mb-6 flex min-w-0 items-baseline gap-4 sm:gap-5">
                                <span className="shrink-0 font-mono text-5xl font-extrabold tabular-nums leading-none text-white/[0.08] sm:text-6xl">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="min-w-0 break-words text-2xl font-extrabold leading-[1.08] text-white sm:text-3xl">
                                  {challenge.title}
                                </h3>
                              </div>
                              <p className="break-words text-sm font-medium leading-[1.7] text-white/68 sm:text-base">
                                {challenge.content}
                              </p>
                            </div>
                            <div className="min-w-0 flex flex-col gap-3">
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
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl min-w-0 px-5 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-28 min-w-0 sm:mt-40"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>
                    <motion.div variants={fadeUp(shouldReduceMotion)} className="max-w-[720px] min-w-0">
                      <p className="break-words text-base font-medium leading-[1.6] text-white/72 sm:text-xl sm:leading-[1.5]">
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
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl min-w-0 px-5 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-28 min-w-0 sm:mt-40"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>

                    <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-16">
                      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:gap-16">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                            Recommended action
                          </p>
                          <h3 className="mt-4 break-words text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl">
                            {section.action}
                          </h3>
                          <p className="mt-6 max-w-[620px] break-words text-base font-medium leading-[1.6] text-white/70">
                            {section.explanation}
                          </p>
                        </div>
                        <div className="min-w-0 flex flex-col gap-3">
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

                    <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-14 max-w-[720px] min-w-0 sm:mb-16">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
                        How it works
                      </p>
                      <p className="mt-3 break-words text-sm font-medium leading-[1.7] text-white/58">
                        {section.mechanism}
                      </p>
                    </motion.div>

                    {section.example && (
                      <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-14 max-w-[720px] min-w-0 sm:mb-16">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
                          In practice
                        </p>
                        <p className="mt-3 break-words text-sm font-medium leading-[1.7] text-white/58">
                          {section.example}
                        </p>
                      </motion.div>
                    )}

                    {section.coBenefits && (
                      <>
                        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.18em] text-white/28">
                          Co-benefits
                        </p>
                        <div className="grid min-w-0 gap-x-10 gap-y-6 sm:grid-cols-2">
                          {section.coBenefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              variants={fadeUp(shouldReduceMotion)}
                              className="flex min-w-0 gap-4 sm:gap-5"
                            >
                              <span className="shrink-0 mt-0.5 font-mono text-sm font-bold tabular-nums text-white/30">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <div className="min-w-0">
                                <h4 className="break-words text-sm font-bold text-white/74">
                                  {benefit.title}
                                </h4>
                                <p className="mt-2 break-words text-sm leading-relaxed text-white/48">
                                  {benefit.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="mt-20 h-px bg-white/[0.04] sm:mt-28" />
                  </motion.div>
                </section>
              );
            }

            // ── Calculator ──
            if (section.type === "calculator") {
              return (
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl min-w-0 px-5 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                    className="mt-28 min-w-0 sm:mt-40"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>

                    {section.description && (
                      <motion.p
                        variants={fadeUp(shouldReduceMotion)}
                        className="mb-12 max-w-[640px] break-words text-base font-medium leading-[1.55] text-white/54 sm:mb-14"
                      >
                        {section.description}
                      </motion.p>
                    )}

                    {section.calculatorImage && (
                      <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-14 min-w-0 sm:mb-16">
                        <div className="block overflow-hidden rounded-lg sm:inline-block">
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
                <section key={section.id} id={section.id} className="mx-auto max-w-6xl min-w-0 px-5 sm:px-10 lg:px-12">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-120px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
                    className="mt-28 min-w-0 sm:mt-40"
                  >
                    <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                      {section.label}
                    </p>

                    <ol className="max-w-[800px] space-y-4 text-sm leading-relaxed text-white/44 [counter-reset:ref]">
                      {section.references.map((ref, i) => (
                        <motion.li
                          key={i}
                          variants={fadeUp(shouldReduceMotion)}
                          className="flex min-w-0 gap-4 [counter-increment:ref] before:content-[counter(ref,decimal-leading-zero)] before:shrink-0 before:font-mono before:text-xs before:font-bold before:text-white/18"
                        >
                          <span className="min-w-0 break-words">{ref}</span>
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
          <section className="mx-auto mt-28 max-w-6xl min-w-0 px-5 sm:mt-40 sm:px-10 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="min-w-0 rounded-2xl bg-white/[0.03] px-5 py-10 sm:rounded-3xl sm:px-12 sm:py-16"
            >
              <div className="grid min-w-0 gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
                <motion.div variants={fadeUp(shouldReduceMotion)} className="grid min-w-0 gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                    Continue exploring
                  </p>
                  <h2 className="break-words text-3xl font-extrabold leading-[1.06] tracking-normal text-white sm:text-4xl">
                    Explore {sdg.title.toLowerCase()}.
                  </h2>
                  <p className="break-words text-base font-medium leading-relaxed text-white/46 sm:text-lg">
                    Ask Unknown, browse datasets, or explore all 17 goals.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp(shouldReduceMotion)} className="flex min-w-0 flex-wrap gap-3">
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
          <footer className="mx-auto mt-28 max-w-6xl min-w-0 border-t border-white/[0.05] px-5 py-10 sm:mt-40 sm:px-10 sm:py-12 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/24">
                SDG Intelligence Hub - VBE 1014
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
